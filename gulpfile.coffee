# gulpfile.coffee: build script for front assets
#
# gulp        - build assets
# gulp watch  - build assets continuously
# gulp server - start a server with assets and mocked APIs

sources =
  bower:  'bower.json'
  jade:   'source/**/*.jade'
  coffee: 'source/**/*.coffee'
  less:   'source/**/*.less'
  static: 'public/**/*'

bower       = require 'bower'
mbfiles     = require 'main-bower-files'
del         = require 'del'
gulp        = require 'gulp'
gulpif      = require 'gulp-if'
coffee      = require 'gulp-coffee'
concat      = require 'gulp-concat'
jade        = require 'gulp-jade'
less        = require 'gulp-less'
ngAnnotate  = require 'gulp-ng-annotate'
nodemon     = require 'gulp-nodemon'
uglify      = require 'gulp-uglify'

bowerfiles  = mbfiles()
dest_dir    = 'build/webapp/'

gulp.task 'default', ['clean'], ->
  gulp.start 'compile:bower', 'compile:jade', 'compile:coffee', 'compile:less', 'compile:static'

gulp.task 'clean', (cb) ->
  del dest_dir, cb

gulp.task 'watch', ->
  gulp.watch sources.bower,  ['compile:bower']
  gulp.watch sources.jade,   ['compile:jade']
  gulp.watch sources.coffee, ['compile:coffee']
  gulp.watch sources.less,   ['compile:less']
  gulp.watch sources.static, ['compile:static']

gulp.task 'compile:bower', ->
  bower.commands.install().on 'end', ->
    isCss = (file) -> return file.path.substr(-4) == '.css'
    gulp.src bowerfiles
      .pipe gulpif(isCss, concat('components.css'), concat('components.js'))
      .pipe gulp.dest dest_dir

gulp.task 'compile:jade', ->
  gulp.src sources.jade
    .pipe jade {locals: {}}
    .pipe gulp.dest dest_dir

gulp.task 'compile:coffee', ->
  gulp.src sources.coffee
    .pipe coffee()
    .pipe ngAnnotate()
    #.pipe uglify()
    .pipe concat 'app.js'
    .pipe gulp.dest dest_dir

gulp.task 'compile:less', ->
  gulp.src sources.less
    .pipe less()
    .pipe concat 'app.css'
    .pipe gulp.dest dest_dir

gulp.task 'compile:static', ->
  gulp.src sources.static
    .pipe gulp.dest dest_dir

gulp.task 'server', ['compile:apimock'], ->
  gulp.start 'watch', 'watch:apimock'
  nodemon
    script: 'build/apimock.js'
    watch: ['build/apimock.js', dest_dir]
    env:
      port: 8888
      webapp: "#{__dirname}/build/webapp/"

gulp.task 'watch:apimock', ->
  gulp.watch 'apimock.coffee', ['compile:apimock']

gulp.task 'compile:apimock', ->
  gulp.src 'apimock.coffee'
    .pipe coffee()
    .pipe gulp.dest 'build/'
