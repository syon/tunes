require 'taglib'
require 'audioinfo'
require 'csv'
require 'json'
require 'ap'

base_dir = "/Users/syon/Dropbox/sion_andy/音の園/materials（リリース版）/"
json_dir = "public/tracklists/"

def find_tagmatch_music_list(musics, tag)
  list = []
  musics.each do |m|
    list.push(m) if m[:tags].include? tag
  end
  list
end

#
# Write info on mp3 file with CSV
#
csv = CSV.table(json_dir + "_def.tsv", col_sep:"\t")
musics = []
csv.map do |df|
  music = {}
  cate_id = df[:filename]
  path = base_dir + cate_id
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

  music[:filename] = df[:filename]
  music[:title]    = df[:title]
  music[:artist]   = df[:artist]
  music[:album]    = df[:album]
  music[:tags]     = df[:tags].split "/" if df[:tags]
  music[:desc]     = df[:desc]

  musics.push music
end

#
# Update structure json
#
summary = []
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
          :filepath => "/materials/#{music[:filename]}",
          :title => music[:title],
          :time => music[:time],
          :desc => music[:desc],
          :tags => music[:tags]
        }
        musicset[:tracks].push(track)
      end

      jpath = json_dir + "#{album.id}.json"
      json_data = JSON.pretty_generate(musicset)
      open(jpath, 'w') do |io|
        io.write json_data
      end

      album['count'] = musicset[:tracks].length
      group_count += album['count']
      listset << album
    end
    group['group_count'] = group_count
    group['listset'] = listset
    summary << group
  end
end

summary_data = JSON.pretty_generate(summary)
open(json_dir + "_structure.json", 'w') do |io|
  io.write summary_data
end
