#= require "underscore-min"
#= require "FileSaver.min"
#= require "tunes"

$ ->
  tunes = new Tunes
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
