var gulp = require('gulp');
var browserSync = require('browser-sync');
var del = require('del');
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var runSequence = require('run-sequence');

gulp.task('serve', function () {
  browserSync({
    server: ['example', 'src', 'dist'],
    port: 3000
  });

  gulp.watch('example/**/*', browserSync.reload);
  gulp.watch('src/**/*.js', ['lint', browserSync.reload]);
  gulp.watch('src/**/*.css', browserSync.reload);
});

gulp.task('clean', function () {
  del.sync(['dist']);
});

gulp.task('lint', function () {
  return gulp
    .src('src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('script', function () {
  return gulp
    .src('src/**/*.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('css', function () {
  return gulp
    .src('src/**/*.css')
    .pipe(postcss([
      autoprefixer({
        browsers: [
          'ie >= 10',
          'ie_mob >= 10',
          'ff >= 30',
          'chrome >= 34',
          'safari >= 7',
          'opera >= 23',
          'ios >= 7',
          'android >= 4.4',
          'bb >= 10'
        ]
      }),
      cssnano({
        safe: true,
        discardComments: {removeAll: true}
      })
    ]))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', function (callback) {
  runSequence('clean', 'lint', 'script', 'css', callback);
});