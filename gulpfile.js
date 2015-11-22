var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var jade = require('gulp-jade');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var lint = require('gulp-eslint');
var less = require('gulp-less');

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
  gulp.watch(configFile, function () {process.exit();});

  //If we change this file we exit to force the user to reload
  //This is not perfect but continuously spawning child processes is messy
  gulp.watch(gulpFile, function () {process.exit();});

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
        pretty: true
      }))
      .pipe(gulp.dest(config.bundle.dir))

});


gulp.task('bundle:jsx', function () {

  return browserify({
    entries: config.bundle.main.indexJsx,
    extensions: ['.js','.jsx', '.es6'], debug: true
  })
      .transform('babelify', {presets: ["es2015", "react"]})
      .bundle()
      .pipe(source(config.bundle.main.js.out))
    //.on("error", function (err) { console.error(err); })
      .pipe(gulp.dest(config.bundle.dir));

});


gulp.task('bundle:styles', function () {

  return gulp.src(config.bundle.main.styles.in)
      .pipe(less())
      .pipe(concat(config.bundle.main.styles.out))
      .pipe(gulp.dest(config.bundle.dir));

});


gulp.task('vendor:scripts', function () {

  return gulp.src(config.bundle.vendor.scripts.in)
      .pipe(concat(config.bundle.vendor.scripts.out))
      .pipe(gulp.dest(config.bundle.dir));

});


gulp.task('vendor:styles', function () {

  return gulp.src(config.bundle.vendor.styles.in)
      .pipe(concat(config.bundle.vendor.styles.out))
      .pipe(gulp.dest(config.bundle.dir));

});

gulp.task('lint:jsx', function () {
  return gulp.src(config.bundle.main.js.in)
      .pipe(lint({config: config.eslint.configFile}))
      .pipe(lint.format());
});