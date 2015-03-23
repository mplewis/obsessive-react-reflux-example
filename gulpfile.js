var gulp = require('gulp')
var webpack = require('gulp-webpack')
var addsrc = require('gulp-add-src')
var browserSync = require('browser-sync')
var del = require('del')

var config = {
  toWatch: ['src/**'],
  browserSync: {server: {baseDir: 'build'}},
  webpack: require('./webpack.config.js')
}

gulp.task('clean', function(cb) {
  del(['build'], cb)
})

gulp.task('webpack', ['clean'], function() {
  return gulp.src('src/index.js')
    .pipe(webpack(config.webpack))
    .pipe(addsrc.append('src/index.html'))
    .pipe(gulp.dest('build'))
})

gulp.task('server', ['webpack'], function() {
  browserSync(config.browserSync)
})

gulp.task('watch', ['server'], function() {
  gulp.watch(config.toWatch, ['webpack', browserSync.reload])
})

gulp.task('default', ['watch'])
