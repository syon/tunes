var app;

app = angular.module('App', ['ngMaterial', 'ngRoute']);

app.value('_pick', {});

app.value('_playing', null);

if (screen.width <= 320) {
  $('body').addClass('smartphone');
}

setInterval(function() {
  var playingTitle;
  if ($('.sm2-bar-ui').hasClass('playing')) {
    playingTitle = $('.sm2-playlist-bd li')[0].textContent;
    app.value['_playing'] = playingTitle;
  } else {
    app.value['_playing'] = null;
  }
  if ($('.interval-btn').size > 0) {
    return $('.interval-btn')[0].click();
  }
}, 1000);

app.controller('RightCtrl', [
  '$scope', '$timeout', '$mdSidenav', '$log', function($scope, $timeout, $mdSidenav, $log) {
    return $scope.close = function() {
      return $mdSidenav('right').close().then(function() {
        return $log.debug("close RIGHT is done");
      });
    };
  }
]);

app.controller('TuneCtrl', [
  '_pick', '$scope', '$mdSidenav', '$mdDialog', '$http', function(_pick, $scope, $mdSidenav, $mdDialog, $http) {
    var DialogController, getTrackList, transAbout;
    $scope.updateState = function() {};
    $scope.toggleRight = function() {
      $mdSidenav('right').open();
    };
    $scope.toggleSidenav = function(menuId) {
      $mdSidenav(menuId).toggle();
    };
    $scope.logoClick = function(ev) {
      ev.preventDefault();
      $scope.transPage(null, "home");
    };
    $scope.current = null;
    $scope.listset = {};
    (function() {
      return $http.get('/tracklists/_structure.json').success(function(data) {
        $scope.listset.albums = data[0];
        return $scope.listset.scenes = data[1];
      }).error(function(data, status, headers, config) {
        return console.error("Error! -- data:" + data + "  status:" + status);
      });
    })();
    $scope.convertTime = function(sec) {
      return Tunes.convertDuration(sec * 1000);
    };
    $scope.useAbout;
    $scope.useTracks;
    $scope.tracklist;
    $scope.transPage = function(ev, pageId) {
      var pr;
      $scope.current = pageId;
      if (ev) {
        ev.preventDefault();
      }
      if (pageId === 'home') {
        $scope.useAbout = false;
        $scope.useTracks = true;
        return pr = getTrackList('home');
      } else if (pageId === 'about') {
        $scope.useAbout = true;
        return $scope.useTracks = false;
      } else {
        $scope.useAbout = false;
        $scope.useTracks = true;
        return pr = getTrackList(pageId);
      }
    };
    getTrackList = function(tracklistId) {
      return $http.get('/tracklists/' + tracklistId + '.json').success(function(data) {
        $scope.tracklist = data;
        Tunes.appendTrackAll(data.tracks);
        return $scope.listname = data.listname;
      }).error(function(data, status, headers, config) {
        return console.error("Error! -- data:" + data + "  status:" + status);
      });
    };
    transAbout = function() {
      return $scope.transPage(null, 'about');
    };
    $scope.transPage(null, 'home');
    this.play = function(trackNo, track) {
      if (!this.isPlaying(track)) {
        app.value['_playing'] = track.title;
        return Tunes.play(trackNo);
      } else {
        app.value['_playing'] = null;
        return Tunes.stop();
      }
    };
    this.isPlaying = function(track) {
      return app.value['_playing'] === track.title;
    };
    this.openDownloadDialog = function(ev, track) {
      _pick.track = track;
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'download.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true
      }).then((function(answer) {}), function() {});
    };
    DialogController = function(_pick, $scope, $mdDialog) {
      $scope.pick = _pick.track;
      $scope.hide = function() {
        $mdDialog.hide();
      };
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };
      $scope.getTime = function(sec) {
        return Tunes.convertDuration(sec * 1000);
      };
      $scope.showAbout = function() {
        $mdDialog.hide();
        transAbout();
      };
      return $scope.download = function(pick) {
        Tunes.download(pick);
      };
    };
  }
]);
