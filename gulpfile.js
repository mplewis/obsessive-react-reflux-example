var gulp = require('gulp')
var webpack = require('gulp-webpack')
var addsrc = require('gulp-add-src')
var browserSync = require('browser-sync')
var del = require('del')

var config = {
  toWatch: ['src/**'],
  browserSync: {server: {baseDir: 'build'}},
  webpack: {
    dev: require('./webpack.config.dev.js'),
    prod: require('./webpack.config.prod.js')
  }
}

gulp.task('clean', function(cb) {
  del(['build'], cb)
})

gulp.task('build-dev', function() {
  return gulp.src('src/index.js')
    .pipe(webpack(config.webpack.dev))
    .pipe(addsrc.append('src/index.html'))
    .pipe(gulp.dest('build'))
})

gulp.task('build-prod', function() {
  return gulp.src('src/index.js')
    .pipe(webpack(config.webpack.prod))
    .pipe(addsrc.append('src/index.html'))
    .pipe(gulp.dest('build'))
})

gulp.task('server', ['build-dev'], function() {
  browserSync(config.browserSync)
})

gulp.task('watch', ['server'], function() {
  gulp.watch(config.toWatch, ['build-dev', browserSync.reload])
})

gulp.task('default', ['clean', 'watch'])
