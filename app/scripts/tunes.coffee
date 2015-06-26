class window.Tunes

  constructor: ->
    # console.log @

  @server_webroot: 'http://oto-no-sono.com'
  musics: {}

  @appendTrackAll: (tracks) ->
    tracks.forEach (rec, idx) ->
      # for playlist
      mp3_url = Tunes.server_webroot + rec.filepath
      if idx == 0
        $('.sm2-playlist-target ul.sm2-playlist-bd').append '<li>' + rec.title + '</li>'
      $('.sm2-playlist-drawer ul.sm2-playlist-bd').append '<li id="' + (idx + 1) + '"><a href="' + mp3_url + '">' + rec.title + '</a></li>'
      return

  @convertDuration: (ms) ->
    h = String(Math.floor(ms / 3600000) + 100).substring(1)
    m = String(Math.floor((ms - h * 3600000) / 60000) + 100).substring(1)
    s = String(Math.round((ms - h * 3600000 - m * 60000) / 1000) + 100).substring(1)
    hm = Number(h) * 60 + Number(m)
    hm + ':' + s

  @download: (track) ->
    xhr = new XMLHttpRequest
    path = Tunes.server_webroot + track.filepath
    xhr.open 'GET', path, true
    xhr.filename = track.filepath.match /[a-zA-Z]+.mp3/
    xhr.responseType = 'blob'
    xhr.send()
    xhr.onload = ->
      if @status == 200
        saveAs @response, @filename
      return
    return
