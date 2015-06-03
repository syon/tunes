#= require "underscore-min"
#= require "FileSaver.min"
#= require "tunes"
#= require "angular.min"
#= require "angular-animate.min"
#= require "angular-aria.min"
#= require "angular-material.min"


app = angular.module('App', [ 'ngMaterial' ])
app.controller 'AppCtrl', ['$scope', '$mdSidenav', '$http', ($scope, $mdSidenav, $http) ->

  $scope.toggleSidenav = (menuId) ->
    $mdSidenav(menuId).toggle()
    return

  $scope.gamegenrelist = [
    {id: "game_rpg", name: "RPG", count: ""}
    {id: "game_srpg", name: "シミュレーションRPG", count: ""}
    {id: "game_novel", name: "サウンドノベル", count: ""}
    {id: "game_puzzle", name: "パズル", count: ""}
    {id: "game_shooting", name: "シューティング", count: ""}
    {id: "game_action", name: "アクション", count: ""}
  ]

  $scope.summary
  do ->
    $http.post('tracklists/__summary.json')
      .success((data) ->
        $scope.summary = data
        for a in $scope.gamegenrelist
          a.count = getTrackCount(a.id)
      )
      .error((data, status, headers, config) ->
        console.error "Error! -- data:" + data + "  status:" + status
      )

  getTrackCount = (listId) ->
    return $scope.summary[listId].count if $scope.summary[listId]


  $scope.tracklist
  $scope.getTracks = (listId) ->
    $http.post('tracklists/'+listId+'.json')
      .success((data) ->
        # console.log(data);
        $scope.tracklist = data
      )
      .error((data, status, headers, config) ->
        console.error "Error! -- data:" + data + "  status:" + status
      )

  # Initialize
  $scope.getTracks("game_novel")

  return
]


app.config(($mdThemingProvider) ->
  $mdThemingProvider.theme('altTheme').primaryPalette 'purple'
  return
)
app.config(($mdIconProvider) ->
  $mdIconProvider
    .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
    .defaultIconSet('img/icons/sets/core-icons.svg', 24)
)

app.controller 'TracklistCtrl', ['$scope', '$http', ($scope, $http) ->

  $scope.play = (trackId) ->
    target = "#" + trackId + " a"
    $('.sm2-playlist-drawer ul.sm2-playlist-bd').find(target)[0].click()

  imagePath = 'img/list/60.jpeg'
  $scope.listname = "List Name is here"
  return
]


$ ->
  tunes = new Tunes
  tunes.getTracks 'game_novel'

  # Musiclist Title Click
  $(document).on 'click', '#musiclist td.title', ->
    $('#musiclist tr').removeClass 'active'
    $(@).closest('tr').addClass 'active'
    target = '#' + $(@).closest('tr').data('track_no') + ' a'
    $('.sm2-playlist-drawer ul.sm2-playlist-bd').find(target)[0].click()
    return

  # Download
  $(document).on 'click', '#musiclist button.download', ->
    track_no = $(@).closest('tr').data('track_no')
    tunes.download track_no
    return
