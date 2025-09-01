const path = require('path');
const gulp = require('gulp');
const eslint = require('gulp-eslint-new');
const prettier = require('gulp-prettier');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const concat = require('gulp-concat');
const del = require('del');

const paths = {
  js: 'src/**/*.js',
  html: 'src/**/*.html',
  css: 'src/**/*.scss',
  dist: 'dist/',
};

gulp.task('lint', () => {
  return gulp
    .src([paths.js])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('format', () => {
  return gulp
    .src(paths.js, { base: './' })
    .pipe(prettier())
    .pipe(gulp.dest('./'));
});

gulp.task('js', () => {
  return gulp
    .src(paths.js)
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.join(paths.dist, 'js')));
});

gulp.task('html', () => {
  return gulp
    .src(paths.html)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('css', () => {
  return gulp
    .src(paths.css)
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest(path.join(paths.dist, 'css')));
});

gulp.task('clean', () => {
  return del.deleteAsync([
    path.join(paths.dist, '**'),
    `!${paths.dist.replace(/\/$/, '')}`,
  ]);
});

gulp.task('build', gulp.series('clean', 'html', 'css', 'js'));

gulp.task('watch', () => {
  gulp.watch(paths.html, gulp.series('html'));
  gulp.watch(paths.css, gulp.series('css'));
  gulp.watch(paths.js, gulp.series('js'));
});
