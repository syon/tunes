/* ES5 */
var gulp = require('gulp'),
    fs = require('fs'),
    source = require('vinyl-source-stream'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    minifyify = require('minifyify'),
    watchify = require('watchify'),
    less = require('gulp-less'),
    jade = require('gulp-jade'),
    coffee = require('gulp-coffee'),
    path = require('path');

var bundler = browserify({
  entries: ['babel/app.js'],
  transform: [[babelify, {presets: ["es2015", "react"]}]],
  debug: true // sourcemapping
});

gulp.task('browserify', function () {
  process.env.NODE_ENV = 'production';
  bundler.plugin('minifyify', {map: 'map.json', output: './public/js/map.json'});
  bundler.bundle().pipe(fs.createWriteStream("public/js/bundle.js"));
});

gulp.task('watch', function () {
  var watcher = watchify(bundler);
  return watcher
    .on('update', function () {
      var updateStart = Date.now();
      watcher.bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./public/js/'));
      console.log('Updated in ', (Date.now() - updateStart) + 'ms');
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('less', function () {
  return gulp.src('./less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('jade', function () {
  console.log(__dirname);
  return gulp.src('./app/download/*.jade')
    .pipe(jade({
      basedir: __dirname,
      locals: {}
    }))
    .pipe(gulp.dest('./public/download'));
});

gulp.task('coffee', function() {
  gulp.src('./app/scripts/*.coffee')
    .pipe(coffee({bare: true}))
    .pipe(gulp.dest('./public/assets/js/'));
});

gulp.task('default', ['watch', 'less', 'jade', 'coffee']);
gulp.task('bundle', ['browserify', 'less', 'jade', 'coffee']);
