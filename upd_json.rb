require 'dotenv'
require 'taglib'
require 'audioinfo'
require 'csv'
require 'json'
require 'ap'

Dotenv.load

site_url = "http://oto-no-sono.com"
base_dir = ENV['MATERIALS_DIR']
json_dir = "public/tracklists/"
def find_tagmatch_music_list(musics, tag)
  list = []
  musics.each do |m|
    list.push(m) if m[:tags].include? tag
  end
  list
end

def duration(sec)
  h = (sec / 3600).floor.to_s[0]
  m = ((sec - (h.to_i * 3600)) / 60).floor.to_s[0]
  s = (sec - (h.to_i * 3600) - (m.to_i * 60))
  hm = h.to_i * 60 + m.to_i
  "#{hm}:" + "00#{s}"[-2,2]
end

#
# Write info on mp3 file with CSV
#
csv = CSV.table(json_dir + "_def.tsv", col_sep:"\t")
musics = []
csv.map do |df|
  music = {}
  cate_id = df[:filename]
  path = "#{base_dir}#{cate_id}"
  begin
    AudioInfo.open(path) do |info|
      music[:time] = info.length
    end
  rescue
  end

  TagLib::MPEG::File.open(path) do |file|
    ## Cannot embed Japanese...
    ## cf. http://www.rubydoc.info/gems/taglib-ruby/TagLib/ID3v2/Tag
    # tag = file.id3v2_tag
    # tag.title  = df[:title]
    # z = tag.frame_list('TIT2').first
    # z.text = df[:title]
    # z.text_encoding = TagLib::String::UTF8
    tag = file.tag
    tag.title  = df[:title]
    tag.artist = df[:artist]
    tag.album  = df[:album]
    tag.genre  = df[:genre]
    file.save
  end

  music[:id] = df[:filename].clone
  music[:id].slice!('.mp3')
  music[:filename] = df[:filename]
  music[:title]    = df[:title]
  music[:artist]   = df[:artist]
  music[:album]    = df[:album]
  music[:tags]     = df[:tags].split "/" if df[:tags]
  music[:desc]     = df[:desc]

  musics.push music
end

# Clean last generated download page jade files.
Dir.glob("app/download/*.jade").each do |f|
  File.unlink f
end

# Generate jade files for download page
musics.each do |m|
  m_id = m[:id]
  puts m_id
  buf = File.open("generate/download/_template.jade.tmpl")
  txt = buf.read
  buf.close

  txt.gsub!('@id@', m_id)
  txt.gsub!('@title@', m[:title])
  txt.gsub!('@time@', duration(m[:time]))
  txt.gsub!('@tags@', m[:tags].to_s)
  txt.gsub!('@desc@', (m[:desc] || ''))
  File.open("app/download/#{m_id}.jade", "w"){|w| w.write(txt)}
end

#
# Update Sitemap
#
url_list = []
url_list << site_url
musics.each do |m|
  download_url = "#{site_url}/download/#{m[:id]}.html"
  url_list << download_url
end

open("public/sitemap.txt", 'w') do |io|
  io.write url_list.join "\n"
end

#
# Update structure json
#
summary = []
all_albums = {}
open(json_dir + "_structure.json") do |io|
  structure = JSON.load(io)
  structure.each do |group|
    listset = []
    albums = group['listset']
    group_count = 0

    albums.each do |album|
      musicset = {listname: album.listname, tracks: []}

      match_list = []
      album.tags.each do |tag|
        match_list = find_tagmatch_music_list musics, tag
      end
      match_list.each do |music|
        track = {
          :id => music[:id],
          :filepath => "/materials/#{music[:filename]}",
          :title => music[:title],
          :time => music[:time],
          :desc => music[:desc],
          :tags => music[:tags]
        }
        musicset[:tracks].push(track)
      end

      album['count'] = musicset[:tracks].length
      group_count += album['count']
      listset << album
      all_albums[album.id] = musicset
    end
    group['group_count'] = group_count
    group['listset'] = listset
    summary << group
  end
end

jpath = json_dir + "albums.json"
json_data = JSON.pretty_generate(all_albums)
open(jpath, 'w') do |io|
  io.write json_data
end

summary_data = JSON.pretty_generate(summary)
open(json_dir + "_structure.json", 'w') do |io|
  io.write summary_data
end
