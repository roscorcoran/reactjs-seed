var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var jade = require('gulp-jade');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');


var configFile = './config.js';

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


gulp.task('build', ['bundle:jade', 'bundle:jsx', 'bundle:styles', 'vendor:scripts', 'vendor:styles']);

gulp.task('watch', function () {
  gulp.watch(config.bundle.main.jade, ['watch:bundle:jade']);
  gulp.watch(config.bundle.main.jsx, ['watch:bundle:jsx']);
  gulp.watch(config.bundle.main.styles, ['watch:bundle:styles']);
  gulp.watch(config.bundle.vendor.scripts, ['watch:vendor:scripts']);
  gulp.watch(config.bundle.vendor.styles, ['watch:vendor:styles']);
  //gulp.watch(configFile, ['build']).on('change', reload);
});

//Reload the browser after completing related task
gulp.task('watch:bundle:jade', ['bundle:jade'], function () {reload();});
gulp.task('watch:bundle:jsx', ['bundle:jsx'], function () {reload();});
gulp.task('watch:bundle:styles', ['bundle:styles'], function () {reload();});
gulp.task('watch:vendor:scripts', ['vendor:scripts'], function () {reload();});
gulp.task('watch:vendor:styles', ['vendor:styles'], function () {reload();});


gulp.task('bundle:jade', function () {

  gulp.src(config.bundle.main.jade)
      .pipe(jade({
        locals: config,
        pretty: true
      }))
      .pipe(gulp.dest(config.bundle.dir))

});


gulp.task('bundle:jsx', function () {

  return browserify({
    entries: config.bundle.main.indexJsx,
    extensions: ['.jsx', '.es6'], debug: true
  })
      .transform('babelify', {presets: ["es2015", "react"]})
      .bundle()
      .pipe(source('bundle.js'))
    //.on("error", function (err) { console.error(err); })
      .pipe(gulp.dest(config.bundle.dir));

});


gulp.task('bundle:styles', function () {

  return gulp.src(config.bundle.main.styles)
      .pipe(concat('bundle.css'))
      .pipe(gulp.dest(config.bundle.dir));

});


gulp.task('vendor:scripts', function () {

  return gulp.src(config.bundle.vendor.scripts)
      .pipe(concat('vendor.js'))
      .pipe(gulp.dest(config.bundle.dir));

});


gulp.task('vendor:styles', function () {

  return gulp.src(config.bundle.vendor.styles)
      .pipe(concat('vendor.css'))
      .pipe(gulp.dest(config.bundle.dir));

});