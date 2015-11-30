var gulp = require('gulp')
    , gutil = require('gulp-util')
    , browserSync = require('browser-sync').create()
    , reload = browserSync.reload
    , jade = require('gulp-jade')
    , uglify = require('gulp-uglify')
    , concat = require('gulp-concat')
    , babelify = require('babelify')
    , browserify = require('browserify')
    , source = require('vinyl-source-stream')
    , buffer = require('vinyl-buffer')
    , lint = require('gulp-eslint')
    , less = require('gulp-less')
    , minifyCss = require('gulp-minify-css');

var configFile = './config.js';
//This file module level var __filename
var gulpFile = __filename;

//Load the config module
var config = require(configFile);


//Default is run the dev server
gulp.task('default', ['browser-sync']);


// Static server
gulp.task('browser-sync', ['build', 'watch'], function () {
  browserSync.init({
    server: {
      baseDir: config.bundle.dir
    }
  });
});


gulp.task('build', ['bundle:jade', 'bundle:jsx', 'bundle:styles', 'vendor:scripts', 'vendor:styles', 'lint'], function () {
  reload();
});

//Lint project files jsx/js/css/less...
gulp.task('lint', ['lint:jsx']);

gulp.task('watch', function () {
  gulp.watch(config.bundle.main.jade.in, ['watch:bundle:jade']);
  gulp.watch(config.bundle.main.js.in, ['watch:bundle:jsx', 'lint:jsx']);
  gulp.watch(config.bundle.main.styles.in, ['watch:bundle:styles']);
  gulp.watch(config.bundle.vendor.scripts.in, ['watch:vendor:scripts']);
  gulp.watch(config.bundle.vendor.styles.in, ['watch:vendor:styles']);
  gulp.watch(config.eslint.configFile, ['lint:jsx']);

  //If we change our config exit to force a reload
  //Required modules are cached by so a full reload is necessary
  gulp.watch(configFile)
      .on('change', function (file) {
        if(file.type == 'changed'){
          console.warn(file.path, file.type);
          process.exit();
        }
      });

  //If we change this file we exit to force the user to reload
  //This is not perfect but continuously spawning child processes is messy
  gulp.watch(gulpFile)
      .on('change', function (file) {
        if(file.type == 'changed'){
          console.warn(file.path, file.type);
          process.exit();
        }
      });

});

//Reload the browser after completing related task
gulp.task('watch:bundle:jade', ['bundle:jade'], function () {reload();});
gulp.task('watch:bundle:jsx', ['bundle:jsx'], function () {reload();});
gulp.task('watch:bundle:styles', ['bundle:styles'], function () {reload();});
gulp.task('watch:vendor:scripts', ['vendor:scripts'], function () {reload();});
gulp.task('watch:vendor:styles', ['vendor:styles'], function () {reload();});


gulp.task('bundle:jade', function () {

  gulp.src(config.bundle.main.jade.in)
      .pipe(jade({
        locals: config,
        pretty: !config.env.production
      }))
      .pipe(gulp.dest(config.bundle.dir))

});


gulp.task('bundle:jsx', function () {

  return browserify({
    entries: config.bundle.main.indexJsx,
    extensions: ['.js', '.jsx', '.es6'], debug: !config.env.production,
    //Speed up build at cost of a few extra bytes
    insertGlobals: !config.env.production
  })
      .transform('babelify', {presets: ["es2015", "react"]})
      .bundle()
      .pipe(source(config.bundle.main.js.out))
      .pipe((config.env.production ? buffer() : gutil.noop()))
      .pipe((config.env.production ? uglify() : gutil.noop()))
      .pipe(gulp.dest(config.bundle.dir));

});


gulp.task('bundle:styles', function () {

  return gulp.src(config.bundle.main.styles.in)
      .pipe(less())
      .pipe(concat(config.bundle.main.styles.out))
      .pipe((config.env.production ? minifyCss({compatibility: 'ie8'}) : gutil.noop()))
      .pipe(gulp.dest(config.bundle.dir));

});


gulp.task('vendor:scripts', function () {

  return gulp.src(config.bundle.vendor.scripts.in)
      .pipe(concat(config.bundle.vendor.scripts.out))
      .pipe((config.env.production ? uglify() : gutil.noop()))
      .pipe(gulp.dest(config.bundle.dir));

});


gulp.task('vendor:styles', function () {

  return gulp.src(config.bundle.vendor.styles.in)
      .pipe(concat(config.bundle.vendor.styles.out))
      .pipe((config.env.production ? minifyCss({compatibility: 'ie8'}) : gutil.noop()))
      .pipe(gulp.dest(config.bundle.dir));

});

gulp.task('lint:jsx', function () {
  return gulp.src(config.bundle.main.js.in)
      .pipe(lint({config: config.eslint.configFile}))
      .pipe(lint.format());
});