#= require "underscore-min"
#= require "FileSaver.min"
#= require "tunes"
#= require "angular"
#= require "angular-route.min"
#= require "angular-cookies.min"
#= require "angular-animate.min"
#= require "angular-aria.min"
#= require "angular-material.min"


app = angular.module('App', [ 'ngMaterial', 'ngRoute' ])

# Global Variables
app.value '_pick', {}

app.controller 'AppCtrl', ['_pick', '$scope', '$mdSidenav', '$mdDialog', '$http', (_pick, $scope, $mdSidenav, $mdDialog, $http) ->

  $scope.toggleSidenav = (menuId) ->
    $mdSidenav(menuId).toggle()
    return

  $scope.logoClick = (ev) ->
    ev.preventDefault()
    $scope.transPage(null, "home")
    return

  $scope.listset = {
    genrelist: [
      {id: "game_rpg", name: "RPG"}
      {id: "game_srpg", name: "シミュレーションRPG"}
      {id: "game_novel", name: "サウンドノベル"}
      {id: "game_puzzle", name: "パズル"}
      {id: "game_shooting", name: "シューティング"}
      {id: "game_action", name: "アクション"}
    ]
    tastelist: [
      {id: "taste_fantasy", name: "ファンタジー"}
      {id: "taste_gothic", name: "ゴシック・教会"}
      {id: "taste_japanese", name: "和風"}
      {id: "taste_horror", name: "ホラー・サスペンス"}
      {id: "taste_famicon", name: "ファミコン"}
      {id: "taste_christmas", name: "クリスマス"}
      {id: "taste_cyber", name: "サイバー・エレクトリック"}
      {id: "taste_hardboiled", name: "ハードボイルド"}
    ]
    scenelist: [
      {id: "scene_opening", name: "オープニング"}
      {id: "scene_battle", name: "バトル"}
      {id: "scene_cheerful", name: "明るい"}
      {id: "scene_dark", name: "暗い"}
      {id: "scene_sad", name: "悲しい"}
      {id: "scene_bless", name: "祝福"}
      {id: "scene_recollection", name: "回想"}
      {id: "scene_honobono", name: "安らぎ・穏やか"}
      {id: "scene_night", name: "夜"}
      {id: "scene_grandeur", name: "壮大"}
      {id: "scene_mysterious", name: "神秘的"}
      {id: "scene_heavy", name: "重厚・重低音"}
      {id: "scene_speedy", name: "疾走感"}
      {id: "scene_comical", name: "ギャグ・コミカル"}
      {id: "scene_stratagem", name: "陰謀・策略"}
      {id: "scene_tense", name: "緊張感"}
      {id: "scene_climax", name: "クライマックス"}
      {id: "scene_ending", name: "エンディング"}
    ]
  }

  $scope.summary
  do ->
    $http.post('tracklists/__summary.json')
      .success((data) ->
        $scope.summary = data
        for a in $scope.listset.genrelist
          a.count = getTrackCount(a.id)
        for a in $scope.listset.tastelist
          a.count = getTrackCount(a.id)
        for a in $scope.listset.scenelist
          a.count = getTrackCount(a.id)
      )
      .error((data, status, headers, config) ->
        console.error "Error! -- data:" + data + "  status:" + status
      )

  getTrackCount = (listId) ->
    return $scope.summary[listId].count if $scope.summary[listId]

  $scope.convertTime = (sec) ->
    return Tunes.convertDuration(sec*1000)

  $scope.useHeader
  $scope.useAbout
  $scope.useTracks
  $scope.tracklist
  $scope.transPage = (ev, pageId) ->
    ev.preventDefault() if ev
    if pageId == 'home'
      $scope.useHeader = true
      $scope.useAbout  = false
      $scope.useTracks = true
      pr = getTrackList 'home'
    else if pageId == 'about'
      $scope.useHeader = false
      $scope.useAbout  = true
      $scope.useTracks = false
    else
      $scope.useHeader = false
      $scope.useAbout  = false
      $scope.useTracks = true
      pr = getTrackList pageId

  getTrackList = (tracklistId) ->
    $http.post('tracklists/' + tracklistId + '.json')
      .success((data) ->
        # console.log(data);
        $scope.tracklist = data
        $('ul.sm2-playlist-bd').empty()
        Tunes.appendTrackAll(data.tracks)
        $scope.listname = data.listname
      )
      .error((data, status, headers, config) ->
        console.error "Error! -- data:" + data + "  status:" + status
      )

  transAbout = () ->
    $scope.transPage(null, 'about')

  $scope.openDownloadDialog = (ev, track) ->
    _pick.track = track
    $mdDialog
      .show(
        controller: DialogController
        templateUrl: 'download.tmpl/index.html'
        parent: angular.element(document.body)
        targetEvent: ev
      )
      .then ((answer) ->
        $scope.alert = 'You said the information was "' + answer + '".'
        console.log answer
        return
    ), ->
      $scope.alert = 'You cancelled the dialog.'
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

    $scope.showAbout = () ->
      $mdDialog.hide()
      transAbout()
      return

    $scope.download = (pick) ->
      Tunes.download pick
      return

  # Initialize
  $scope.transPage(null, 'home')

  return
]

app.controller 'TracklistCtrl', ['$scope', '$http', ($scope, $http) ->

  $scope.play = (trackId) ->
    target = "#" + trackId + " a"
    $('.sm2-playlist-drawer ul.sm2-playlist-bd').find(target)[0].click()

  return
]
