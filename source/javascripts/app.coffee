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

  $scope.tracklist

  $scope.getTracks = (trackId) ->
    $http.post('tracklists/'+trackId+'.json')
      .success((data) ->
        console.log(data);
        $scope.tracklist = data
      )
      .error((data, status, headers, config) ->
        $scope.ing = false;
        $scope.err = "Error! -- data:" + data + "  status:" + status
      )

  $scope.play = (trackId) ->
    target = "#" + trackId + " a"
    $('.sm2-playlist-drawer ul.sm2-playlist-bd').find(target)[0].click()

  $scope.getTracks("game_novel")

  imagePath = 'img/list/60.jpeg'
  $scope.listname = "List Name is here"
  return
]


$ ->
  tunes = new Tunes
  tunes.getTracks 'game_novel'

  # Sidebar Click
  $(document).on 'click', '.tracklistlink', (ev) ->
    ev.preventDefault()
    $('.tracklistlink').removeClass 'active'
    $(@).addClass 'active'
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
  $(document).on 'click', '#musiclist button.download', ->
    track_no = $(@).closest('tr').data('track_no')
    tunes.download track_no
    return

  $.ajax
    url: 'tracklists/__summary.json'
    dataType: 'json'
    success: ((data) ->
      Object.keys(data).map((key) ->
        p = $('[href="#'+key+'"]') #.parent()
        p.append('<span class="count">'+data[key].count+'</span>')
      )
      return
    ).bind(this)
    error: ((xhr, status, err) ->
      console.error status, err.toString()
      return
    ).bind(this)
