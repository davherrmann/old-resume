'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload'),
    sass = require('gulp-sass'),
    paths = {
        indexFile: 'index.html',
        scriptFiles: 'scripts/*.js',
        htmlFiles: ['index.html', '*/*.html'],
        sassFiles: 'styles/sass/*.scss',
        cssFolder: 'styles/css/'
    },
    LOCAL_SERVER_PORT = 4000;

gulp.task('server', function() {
    connect.server({
        port: LOCAL_SERVER_PORT,
        livereload: true
    });
});

gulp.task('jshint', function() {
    return gulp.src(paths.scriptFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
    livereload.listen({
        start: true,
        reloadPage: paths.indexFile
    });
    gulp.watch(paths.scriptFiles, ['scriptsChanged']);
    gulp.watch(paths.sassFiles, ['sassChanged']);
    gulp.watch(paths.htmlFiles, ['htmlChanged'])
});

gulp.task('sassChanged', function() {
  gulp.src(paths.sassFiles)
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(paths.cssFolder))
      .pipe(livereload());
});

gulp.task('scriptsChanged', ['jshint'], function(event) {
    gulp.src(paths.scriptFiles)
        .pipe(livereload());
});

gulp.task('htmlChanged', function() {
  gulp.src(paths.htmlFiles)
      .pipe(livereload());
});

gulp.task('dev', ['server', 'watch']);

gulp.task('default', ['dev']);
