var gulp = require('gulp')
var webpack = require('gulp-webpack')
var addsrc = require('gulp-add-src')
var ghPages = require('gulp-gh-pages')
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

// Don't clean while the server is running, it causes crashes
gulp.task('build-dev-dirty', function() {
  return gulp.src('src/index.js')
    .pipe(webpack(config.webpack.dev))
    .pipe(addsrc.append('src/index.html'))
    .pipe(gulp.dest('build'))
})

// But clean on the first build
gulp.task('build-dev', ['clean', 'build-dev-dirty'])

gulp.task('build-prod', ['clean'], function() {
  return gulp.src('src/index.js')
    .pipe(webpack(config.webpack.prod))
    .pipe(addsrc.append('src/index.html'))
    .pipe(gulp.dest('build'))
})

gulp.task('server', ['build-dev'], function() {
  browserSync(config.browserSync)
})

gulp.task('watch', ['server'], function() {
  gulp.watch(config.toWatch, ['build-dev-dirty', browserSync.reload])
})

gulp.task('deploy', ['clean', 'build-prod'], function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages())
})

gulp.task('default', ['clean', 'watch'])
