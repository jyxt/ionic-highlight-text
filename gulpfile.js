var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var css2js = require('gulp-css2js');
var uglify = require('gulp-uglify');


gulp.task('default', ['make-bundle']);

gulp.task('css2js', function () {
  return gulp.src("./src/*.css")
    .pipe(css2js())
    .pipe(uglify())
    .pipe(gulp.dest("./dist/"));
});

gulp.task('del', function () {
  del(['dist/*']);
});


gulp.task('make-bundle', ['del', 'css2js'], function () {
  return gulp.src(['dist/*', './src/*.js'])
    .pipe(concat('ionic-searchable-text.bundle.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));
});
