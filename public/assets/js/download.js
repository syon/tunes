$(function() {
  return $(document).on('click', '#download_btn', function() {
    var track_id;
    track_id = $('#track_id').data('track');
    return Tunes.download(track_id);
  });
});
