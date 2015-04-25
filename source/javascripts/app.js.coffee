#= require "underscore-min"
#= require "FileSaver.min"

$ ->
  tunes = new Tunes @
  tunes.getTracks 'game_novel'

  # Sidebar Click
  $(document).on 'click', '.sidebar li', (ev) =>
    ev.preventDefault()
    $('.sidebar li').removeClass 'active'
    $(this).addClass 'active'
    tracklist = $('a', this)[0].hash.replace('#', '')
    tunes.getTracks tracklist
    return

  # Musiclist Title Click
  $(document).on 'click', '#musiclist td.title', ->
    $('#musiclist tr').removeClass 'active'
    $(@).closest('tr').addClass 'active'
    target = '#' + $(@).closest('tr').data('track_no') + ' a'
    $('.sm2-playlist-drawer ul.sm2-playlist-bd').find(target)[0].click()
    return

  # Download
  $(document).on 'click', '#musiclist button.download', =>
    track_no = $(this).closest('tr').data('track_no')
    tunes.download track_no
    return
  return


class Tunes
  constructor: (arg) ->
    console.log "arg is:", arg

  music: {wei:"weeei"}

  getTracks: (tracklist_name) ->
    $.ajax
      url: 'tracklists/' + tracklist_name + '.json'
      dataType: 'json'
      success: ((data) ->
        @music = data
        @applyView data
        return
      ).bind(this)
      error: ((xhr, status, err) ->
        console.error status, err.toString()
        return
      ).bind(this)
    return

  applyView: (data) ->
    listname = data.listname
    server_url = 'http://oto-no-sono.com' + data.path
    $('.listinfo>.listname').text listname
    $('ul.sm2-playlist-bd').empty()
    myPromise = $.when($('.tracks tr').fadeOut())
    myPromise.done =>
      $('.tracks tr').remove()
      data.tracks.forEach (rec, idx) =>
        # for playlist
        mp3_url = server_url + rec.filename
        if idx == 0
          $('.sm2-playlist-target ul.sm2-playlist-bd').append '<li>' + rec.title + '</li>'
        $('.sm2-playlist-drawer ul.sm2-playlist-bd').append '<li id="' + (idx + 1) + '"><a href="' + mp3_url + '">' + rec.title + '</a></li>'
        # for table
        Tunes.appendTrack idx + 1, rec.title, rec.time, rec.tags
        return
      return
    return

  @appendTrack: (tno, title, time, tags) ->
    track_html = ''
    track_html += '<tr class=\'track\' data-track_no=\'' + tno + '\'>'
    track_html += '<td class=\'text-right\'>' + tno + '</td>'
    track_html += '<td class=\'title\'>' + title + '</td>'
    track_html += '<td><button class="download btn btn-default btn-xs">ダウンロード</button></td>'
    track_html += '<td>' + @convertDuration(time * 1000) + '</td>'
    track_html += '<td class=\'tags\'>' + @makeTagsElem(tags) + '</td>'
    track_html += '</tr>'
    $('#musiclist tbody').append track_html
    return

  @convertDuration: (ms) ->
    h = String(Math.floor(ms / 3600000) + 100).substring(1)
    m = String(Math.floor((ms - h * 3600000) / 60000) + 100).substring(1)
    s = String(Math.round((ms - h * 3600000 - m * 60000) / 1000) + 100).substring(1)
    hm = Number(h) * 60 + Number(m)
    hm + ':' + s

  @makeTagsElem: (tags) ->
    tags.map((tag) ->
      '<span class="tag">' + tag + '</span>'
    ).join ''

  download: (track_no) ->
    xhr = new XMLHttpRequest
    track = @music.tracks[track_no - 1]
    path = @music.path + track.filename
    xhr.open 'GET', path, true
    xhr.filename = track.filename
    xhr.responseType = 'blob'
    xhr.send()
    xhr.onload = ->
      if @status == 200
        saveAs @response, @filename
      return
    return
