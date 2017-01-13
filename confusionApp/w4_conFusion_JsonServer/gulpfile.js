var gulp = require('gulp'),
  minifycss = require('gulp-minify-css'),
  jshint = require('gulp-jshint'),
  stylish = require('jshint-stylish'),
  uglify = require('gulp-uglify'),
  usemin = require('gulp-usemin'),
  imagemin = require('gulp-imagemin'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify'),
  cache = require('gulp-cache'),
  changed = require('gulp-changed'),
  rev = require('gulp-rev'),
  browserSync = require('browser-sync'),
  del = require('del'),
  merge = require('merge-stream');

gulp.task('jshint', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

// Clean
gulp.task('clean', function () {
  return del(['dist']);
});

// Default task
gulp.task('default', ['clean'], function () {
  gulp.start('usemin', 'imagemin', 'copyfonts', 'copytemplates');
});

// before usemin task, run jshint task
gulp.task('usemin', ['jshint'], function () {
  return gulp.src('./app/index.html')
    .pipe(usemin({
      css: [minifycss(), rev()], // & file revesioning - appending content hash to filenames
      js: [uglify(), rev()]
    }))
    .pipe(gulp.dest('dist/'));
});

// Images
gulp.task('imagemin', function () {
  return del(['dist/images']), gulp.src('app/images/**/*')
    .pipe(cache(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('copyfonts', function () {
  gulp.src('./bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
    .pipe(gulp.dest('./dist/fonts'));
  gulp.src('./bower_components/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg}*')
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('copytemplates', function () {
  gulp.src('./app/views/*.html')
    .pipe(gulp.dest('./dist/views'));
});

// Watch
gulp.task('watch', ['browser-sync'], function () {
  // Watch .js & css files & run usemin task
  gulp.watch('{app/scripts/**/*.js,app/styles/**/*.css}', ['usemin']);
  // Watch template files & run copytemplates task
  gulp.watch('app/views/*.html', ['copytemplates']);
  // Watch image files & run imagemin task
  gulp.watch('app/images/**/*', ['imagemin']);

});

gulp.task('browser-sync', ['default'], function () {
  // watch these files
  var files = [
    'app/**/*.html',
    'app/styles/**/*.css',
    'app/images/**/*.png',
    'app/scripts/**/*.js',
    'app/views/*.html',
    'dist/**/*'
  ];

  // info about base folder
  browserSync.init(files, {
    server: {
      baseDir: "dist"
    }
  });
  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', browserSync.reload);
});
