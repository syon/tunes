app = angular.module('App', [ 'ngMaterial', 'ngRoute' ])

# Global Variables
app.value '_pick', {}
app.value '_playing', null

setInterval ->
  if $('.sm2-bar-ui').hasClass('playing')
    playingTitle = $('.sm2-playlist-bd li')[0].textContent
    app.value['_playing'] = playingTitle
  else
    app.value['_playing'] = null
  $('.interval-btn')[0].click()
, 1000

app.controller 'RightCtrl', ['$scope', '$timeout', '$mdSidenav', '$log', ($scope, $timeout, $mdSidenav, $log) ->
  $scope.close = ->
    $mdSidenav('right').close()
      .then ->
        $log.debug("close RIGHT is done")
]

app.controller 'TuneCtrl', ['_pick', '$scope', '$mdSidenav', '$mdDialog', '$http', (_pick, $scope, $mdSidenav, $mdDialog, $http) ->

  $scope.updateState = ->
    # dummy process for @isPlaying
    return

  $scope.toggleRight = ->
    $mdSidenav('right').open()
    return

  $scope.toggleSidenav = (menuId) ->
    $mdSidenav(menuId).toggle()
    return

  $scope.logoClick = (ev) ->
    ev.preventDefault()
    $scope.transPage(null, "home")
    return

  $scope.current = null

  $scope.listset
  do ->
    $http.get('tracklists/_structure.json')
      .success((data) ->
        $scope.listset = data
      )
      .error((data, status, headers, config) ->
        console.error "Error! -- data:" + data + "  status:" + status
      )

  $scope.summary
  do ->
    $http.get('tracklists/__summary.json')
      .success((data) ->
        $scope.summary = data
        for a in $scope.listset.albums
          a.count = getTrackCount('albums', a.id)
        for a in $scope.listset.scenes
          a.count = getTrackCount('scenes', a.id)
      )
      .error((data, status, headers, config) ->
        console.error "Error! -- data:" + data + "  status:" + status
      )

  getTrackCount = (block, listId) ->
    return $scope.summary[block][listId].count if $scope.summary[block][listId]

  $scope.convertTime = (sec) ->
    return Tunes.convertDuration(sec*1000)

  $scope.useAbout
  $scope.useTracks
  $scope.tracklist
  $scope.transPage = (ev, pageId) ->
    $scope.current = pageId
    ev.preventDefault() if ev
    if pageId == 'home'
      $scope.useAbout  = false
      $scope.useTracks = true
      pr = getTrackList 'home'
    else if pageId == 'about'
      $scope.useAbout  = true
      $scope.useTracks = false
    else
      $scope.useAbout  = false
      $scope.useTracks = true
      pr = getTrackList pageId

  getTrackList = (tracklistId) ->
    $http.get('tracklists/' + tracklistId + '.json')
      .success((data) ->
        # console.log(data);
        $scope.tracklist = data
        Tunes.appendTrackAll(data.tracks)
        $scope.listname = data.listname
      )
      .error((data, status, headers, config) ->
        console.error "Error! -- data:" + data + "  status:" + status
      )

  transAbout = () ->
    $scope.transPage(null, 'about')

  # Initialize
  $scope.transPage(null, 'home')


  @play = (trackNo, track) ->
    unless @isPlaying(track)
      app.value['_playing'] = track.title
      Tunes.play(trackNo)
    else
      app.value['_playing'] = null
      Tunes.stop()

  @isPlaying = (track) ->
    return app.value['_playing'] == track.title

  @openDownloadDialog = (ev, track) ->
    _pick.track = track
    $mdDialog
      .show(
        controller: DialogController
        templateUrl: 'download.tmpl.html'
        parent: angular.element(document.body)
        targetEvent: ev
        clickOutsideToClose: true
      )
      .then ((answer) ->
        # @alert = 'You said the information was "' + answer + '".'
        # console.log answer
        return
    ), ->
      # @alert = 'You cancelled the dialog.'
      return
    return

  DialogController = (_pick, $scope, $mdDialog) ->

    $scope.pick = _pick.track

    $scope.hide = ->
      $mdDialog.hide()
      return

    $scope.cancel = ->
      $mdDialog.cancel()
      return

    $scope.answer = (answer) ->
      $mdDialog.hide answer
      return

    $scope.getTime = (sec) ->
      return Tunes.convertDuration(sec*1000)

    $scope.showAbout = () ->
      $mdDialog.hide()
      transAbout()
      return

    $scope.download = (pick) ->
      Tunes.download pick
      return

  return
]
