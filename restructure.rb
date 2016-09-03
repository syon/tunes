require 'taglib'
require 'audioinfo'
require 'csv'
require 'json'
require 'yaml'
require 'ap'

site_url = "http://improvis.oto-no-sono.com"
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
# Write info on mp3 file from yaml
#
yaml = YAML.load_file('resources/musics.yml')
musics = []
yaml[:tracks].map do |df|
  music = {}
  mp3 = "resources/materials/#{df[:id]}.mp3"
  begin
    AudioInfo.open(mp3) do |info|
      music[:time] = info.length
    end
  rescue
  end

  TagLib::MPEG::File.open(mp3) do |file|
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

  music[:id]       = df[:id]
  music[:filename] = "#{df[:id]}.mp3"
  music[:title]    = df[:title]
  music[:artist]   = yaml[:artist]
  music[:album]    = yaml[:album]
  music[:tags]     = df[:tags]
  music[:desc]     = df[:desc].gsub("\n", "") if df[:desc]

  musics.push music
end

# Clean last generated download page jade files.
Dir.glob("app/download/*.jade").each do |f|
  File.unlink f
end

# Generate jade files for download page
musics.each do |m|
  begin
    m_id = m[:id]
    puts m_id
    buf = File.open("generate/download/_template.jade.tmpl", encoding: 'UTF-8')
    txt = buf.read
    buf.close

    txt.gsub!('@id@', m_id)
    txt.gsub!('@title@', m[:title])
    txt.gsub!('@time@', duration(m[:time]))
    txt.gsub!('@tags@', "[\"#{m[:tags].join('","')}\"]")
    txt.gsub!('@desc@', (m[:desc] || ''))
    File.open("app/download/#{m_id}.jade", "w"){|w| w.write(txt)}
  rescue => e
    puts "Error!! Perhaps #{m[:id]} is not exist."
    raise
  end
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
open("resources/settings.yml") do |io|
  structure = YAML.load_file(io)
  structure.each do |group|
    listset = []
    albums = group['listset']
    group_count = 0

    albums.each do |album|
      musicset = {nm: album.nm, tracks: []}

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
open(json_dir + "structure.json", 'w') do |io|
  io.write summary_data
end
