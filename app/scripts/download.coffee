$ ->
  $(document).on 'click', '#download_btn', () ->
    track_id = $('#track_id').data 'track'
    Tunes.download(track_id)
