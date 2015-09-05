class window.Tunes

  constructor: ->
    # console.log @

  @server_webroot: 'http://oto-no-sono.com'
  @mp3_directory: '/materials/'
  musics: {}
  is_playing: false

  @appendTrackAll: (tracks) ->
    playingTitle = $('.sm2-playlist-bd li')[0].textContent
    $('ul.sm2-playlist-bd').empty()
    tracks.forEach (rec, idx) ->
      # for playlist
      mp3_url = Tunes.server_webroot + rec.filepath
      if idx == 0
        if $('.sm2-bar-ui').hasClass('playing')
          $('.sm2-playlist-target ul.sm2-playlist-bd').append '<li>' + playingTitle + '</li>'
        else
          $('.sm2-playlist-target ul.sm2-playlist-bd').append '<li>' + rec.title + '</li>'
      $('.sm2-playlist-drawer ul.sm2-playlist-bd').append '<li id="' + (idx + 1) + '"><a href="' + mp3_url + '">' + rec.title + '</a></li>'
      return

  @appendSingleTrack: (track_id, track_title) ->
    $('ul.sm2-playlist-bd').empty()
    filename = track_id + '.mp3'
    mp3_url = Tunes.server_webroot + @mp3_directory + filename
    $('.sm2-playlist-target ul.sm2-playlist-bd').append "<li>#{track_title}</li>"
    $('.sm2-playlist-drawer ul.sm2-playlist-bd').append "<li id='1'><a href='#{mp3_url}'>#{track_title}</a></li>"

  @play: (trackNo) ->
    target = "#" + trackNo + " a"
    $('.sm2-playlist-drawer ul.sm2-playlist-bd').find(target)[0].click()

  @stop: () ->
    soundManager.stopAll()

  @convertDuration: (ms) ->
    h = String(Math.floor(ms / 3600000) + 100).substring(1)
    m = String(Math.floor((ms - h * 3600000) / 60000) + 100).substring(1)
    s = String(Math.round((ms - h * 3600000 - m * 60000) / 1000) + 100).substring(1)
    hm = Number(h) * 60 + Number(m)
    hm + ':' + s

  @download: (track_id) ->
    xhr = new XMLHttpRequest
    filename = track_id + '.mp3'
    path = Tunes.server_webroot + @mp3_directory + filename
    xhr.open 'GET', path, true
    xhr.filename = filename
    xhr.responseType = 'blob'
    xhr.send()
    xhr.onload = ->
      if @status == 200
        saveAs @response, @filename
      return
    return
