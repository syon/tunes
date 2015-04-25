//= require "underscore-min"
//= require "FileSaver.min"

$(function() {

  // Sidebar Click
  $(document).on('click', '.sidebar li', function(ev){
    ev.preventDefault();
    $('.sidebar li').removeClass('active');
    $(this).addClass('active');
    var tracklist = $('a',this)[0].hash.replace("#",'');
    getTracks(tracklist);
  });

  // Musiclist Title Click
  $(document).on('click', '#musiclist td.title', function(){
    $('#musiclist tr').removeClass('active');
    $(this).closest('tr').addClass('active');
    var target = "#" + $(this).closest('tr').data('track_no') + " a";
    $('.sm2-playlist-drawer ul.sm2-playlist-bd').find(target)[0].click();
  });

  // Download
  $(document).on('click', '#musiclist button.download', function(){
    var track_no = $(this).closest('tr').data('track_no');
    download(track_no);
  });

});

!function() {
  getTracks('game_novel');
}();

var __music;

function getTracks(tracklist_name) {
  $.ajax({
    url: "tracklists/" + tracklist_name + ".json",
    dataType: 'json',
    success: function(data) {
      __music = data;
      applyView(data);
    }.bind(this),
    error: function(xhr, status, err) {
      console.error(status, err.toString());
    }.bind(this)
  });
}

function applyView(data) {
  var listname = data.listname;
  var server_url = "http://oto-no-sono.com" + data.path;
  $('.listinfo>.listname').text(listname);
  $('ul.sm2-playlist-bd').empty();
  var myPromise = $.when(
    $('.tracks tr').fadeOut()
  );
  myPromise.done(function() {
    $('.tracks tr').remove();
    data.tracks.forEach(function(rec,idx) {
      // for playlist
      var mp3_url = server_url + rec.filename;
      if (idx == 0) {
        $('.sm2-playlist-target ul.sm2-playlist-bd').append('<li>'+rec.title+'</li>');
      }
      $('.sm2-playlist-drawer ul.sm2-playlist-bd').append('<li id="'+(idx+1)+'"><a href="'+mp3_url+'">'+rec.title+'</a></li>');
      // for table
      addMusic(idx+1, rec.title, rec.time, rec.tags);
    });
  });
}

function addMusic(no, title, time, tags) {
	var track_html = "";
	track_html += "<tr class='track' data-track_no='" + no + "'>";
	track_html += "<td class='text-right'>" + no + "</td>";
	track_html += "<td class='title'>" + title + "</td>";
  track_html += '<td><button class="download btn btn-default btn-xs">ダウンロード</button></td>';
	track_html += "<td>" + convertDuration(time*1000) + "</td>";
  track_html += "<td class='tags'>" + makeTagsElem(tags) + "</td>";
	track_html += "</tr>";
	$('#musiclist tbody').append(track_html);
}

function convertDuration(ms) {
	var h = String(Math.floor(ms / 3600000) + 100).substring(1);
	var m = String(Math.floor((ms - h * 3600000)/60000)+ 100).substring(1);
	var s = String(Math.round((ms - h * 3600000 - m * 60000)/1000)+ 100).substring(1);
	var hm = Number(h)*60 + Number(m);
	return hm+':'+s;
}

function makeTagsElem(tags) {
  return tags.map(function(tag){
    return '<span class="tag">' + tag + '</span>';
  }).join("");
}

function download(track_no) {
  var xhr = new XMLHttpRequest();
  var track = __music.tracks[track_no - 1];
  var path = __music.path + track.filename;
  xhr.open('GET', path, true);
  xhr.filename = track.filename;
  xhr.responseType = 'blob';
  xhr.send();
  xhr.onload = function(){
    if (this.status == 200) {
      saveAs(this.response, this.filename);
    }
  }
}
