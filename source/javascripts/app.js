$(function() {
    $(window).on('load', function() {
        console.log("Hello from all.js");
    });
});

(function() {
  $.ajax({
    url: 'tracks.json',
    dataType: 'json',
    success: function(data) {
      init(data);
    }.bind(this),
    error: function(xhr, status, err) {
      console.error(status, err.toString());
    }.bind(this)
  });
}());

function init(data) {
  console.log("init:",data);
  $('ul.sm2-playlist-bd').empty();
  $('.tracks').empty();
  data.forEach(function(data,idx) {
    // for playlist
    var url = "http://oto-no-sono.com/musics/midnight-celebration/" + data.filename;
    $('.sm2-playlist-drawer ul.sm2-playlist-bd').append('<li><a href="'+url+'">'+data.title+'</a></li>');
    // for table
    addMusic(idx+1, data.title, data.time, 'Midnight Celebration');
  });
}

function addMusic(no, title, time, album) {
	var track_html = "";
	track_html += "<tr class='track' data-track_idx='" + no + "'>";
	track_html += "<td class='text-right'>" + no + "</td>";
	track_html += "<td>" + title + "</td>";
	track_html += "<td>" + convertDuration(time*1000) + "</td>";
  track_html += "<td>" + album + "</td>";
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
