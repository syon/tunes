# gulpfile.coffee: build script for front assets
#
# gulp        - build assets
# gulp watch  - build assets continuously
# gulp server - start a server with assets and mocked APIs

sources =
  bower:  'bower.json'
  jade:   'source/index.jade'
  coffee: 'source/**/*.coffee'
  less:   'source/**/*.less'
  static: 'public/**/*'

libs =
  js: [
    'angular/angular.min.js'
    'angular-animate/angular-animate.min.js'
    'angular-aria/angular-aria.min.js'
    'angular-cookies/angular-cookies.min.js'
    'angular-material/angular-material.min.js'
    'angular-route/angular-route.min.js'
    'FileSaver/FileSaver.min.js'
    'jquery/dist/jquery.min.js'
    'underscore/underscore-min.js'
    'soundmanager2/script/soundmanager2-jsmin.js'
  ]
  css:    [
    'angular-material/angular-material.min.css'
  ]
  static: []


bower       = require 'bower'
del         = require 'del'
gulp        = require 'gulp'
coffee      = require 'gulp-coffee'
concat      = require 'gulp-concat'
jade        = require 'gulp-jade'
less        = require 'gulp-less'
ngAnnotate  = require 'gulp-ng-annotate'
nodemon     = require 'gulp-nodemon'
uglify      = require 'gulp-uglify'

dest_dir = 'target/webapp/'

gulp.task 'default', ['clean'], ->
  gulp.start 'compile:lib', 'compile:jade', 'compile:coffee', 'compile:less', 'compile:static'

gulp.task 'clean', (cb) ->
  del dest_dir, cb

gulp.task 'watch', ->
  gulp.watch sources.bower,  ['compile:lib']
  gulp.watch sources.coffee, ['compile:coffee']
  gulp.watch sources.less,   ['compile:less']
  gulp.watch sources.static, ['compile:static']


gulp.task 'compile:lib', ->
  bower.commands.install().on 'end', ->
    gulp.src libs.js.map (e) -> "bower_components/#{e}"
      .pipe concat 'lib.js'
      .pipe gulp.dest dest_dir + 'js/'
    gulp.src libs.css.map (e) -> "bower_components/#{e}"
      .pipe concat 'lib.css'
      .pipe gulp.dest dest_dir + 'css/'
    gulp.src libs.static.map (e) -> "bower_components/#{e}"
      .pipe gulp.dest dest_dir

gulp.task 'compile:jade', ->
  gulp.src sources.jade
    .pipe jade {locals: {}}
    .pipe gulp.dest dest_dir

gulp.task 'compile:coffee', ->
  gulp.src sources.coffee
    .pipe coffee()
    .pipe ngAnnotate()
    .pipe uglify()
    .pipe concat 'app.js'
    .pipe gulp.dest dest_dir + 'js/'

gulp.task 'compile:less', ->
  gulp.src sources.less
    .pipe less()
    .pipe concat 'app.css'
    .pipe gulp.dest dest_dir + 'css/'

gulp.task 'compile:static', ->
  gulp.src sources.static
    .pipe gulp.dest dest_dir


gulp.task 'server', ['compile:apimock'], ->
  gulp.start 'watch', 'watch:apimock'
  nodemon
    script: 'target/apimock.js'
    watch: ['target/apimock.js', dest_dir]
    env:
      port: 8888
      webapp: "#{__dirname}/target/webapp/"

gulp.task 'watch:apimock', ->
  gulp.watch 'apimock.coffee', ['compile:apimock']

gulp.task 'compile:apimock', ->
  gulp.src 'apimock.coffee'
    .pipe coffee()
    .pipe gulp.dest 'target/'
