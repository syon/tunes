window.Tunes = (function() {
  function Tunes() {}

  Tunes.server_webroot = 'http://oto-no-sono.com';

  Tunes.mp3_directory = '/materials/';

  Tunes.prototype.musics = {};

  Tunes.prototype.is_playing = false;

  Tunes.appendTrackAll = function(tracks) {
    var playingTitle;
    playingTitle = $('.sm2-playlist-bd li')[0].textContent;
    $('ul.sm2-playlist-bd').empty();
    return tracks.forEach(function(rec, idx) {
      var mp3_url;
      mp3_url = Tunes.server_webroot + rec.filepath;
      if (idx === 0) {
        if ($('.sm2-bar-ui').hasClass('playing')) {
          $('.sm2-playlist-target ul.sm2-playlist-bd').append('<li>' + playingTitle + '</li>');
        } else {
          $('.sm2-playlist-target ul.sm2-playlist-bd').append('<li>' + rec.title + '</li>');
        }
      }
      $('.sm2-playlist-drawer ul.sm2-playlist-bd').append('<li id="' + (idx + 1) + '"><a href="' + mp3_url + '">' + rec.title + '</a></li>');
    });
  };

  Tunes.appendSingleTrack = function(track_id, track_title) {
    var filename, mp3_url;
    $('ul.sm2-playlist-bd').empty();
    filename = track_id + '.mp3';
    mp3_url = Tunes.server_webroot + this.mp3_directory + filename;
    $('.sm2-playlist-target ul.sm2-playlist-bd').append("<li>" + track_title + "</li>");
    return $('.sm2-playlist-drawer ul.sm2-playlist-bd').append("<li id='1'><a href='" + mp3_url + "'>" + track_title + "</a></li>");
  };

  Tunes.play = function(trackNo) {
    var target, target_elem, ua;
    ua = navigator.userAgent;
    target = "#" + trackNo + " a";
    target_elem = $('.sm2-playlist-drawer ul.sm2-playlist-bd').find(target)[0];
    if (ua.match(/iPhone/i) || ua.match(/iPad/i)) {
      return this.trigger(target_elem, 'touchstart');
    } else {
      return this.trigger(target_elem, 'click');
    }
  };

  Tunes.stop = function() {
    return soundManager.stopAll();
  };

  Tunes.trigger = function(element, event) {
    var evt;
    if (document.createEvent) {
      evt = document.createEvent("HTMLEvents");
      evt.initEvent(event, true, true);
      return element.dispatchEvent(evt);
    } else {
      evt = document.createEventObject();
      return element.fireEvent("on" + event, evt);
    }
  };

  Tunes.convertDuration = function(ms) {
    var h, hm, m, s;
    h = String(Math.floor(ms / 3600000) + 100).substring(1);
    m = String(Math.floor((ms - h * 3600000) / 60000) + 100).substring(1);
    s = String(Math.round((ms - h * 3600000 - m * 60000) / 1000) + 100).substring(1);
    hm = Number(h) * 60 + Number(m);
    return hm + ':' + s;
  };

  Tunes.download = function(track_id) {
    var filename, path, xhr;
    xhr = new XMLHttpRequest;
    filename = track_id + '.mp3';
    path = Tunes.server_webroot + this.mp3_directory + filename;
    xhr.open('GET', path, true);
    xhr.filename = filename;
    xhr.responseType = 'blob';
    xhr.send();
    xhr.onload = function() {
      if (this.status === 200) {
        saveAs(this.response, this.filename);
      }
    };
  };

  return Tunes;

})();
