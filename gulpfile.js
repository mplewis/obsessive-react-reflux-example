var gulp = require('gulp')
var webpack = require('gulp-webpack')
var addsrc = require('gulp-add-src')
var ghPages = require('gulp-gh-pages')
var browserSync = require('browser-sync')
var del = require('del')
var runSequence = require('run-sequence')
var file = require('gulp-file')

var config = {
  paths: {
    entryPoint: 'src/index.js',
    indexHtml: 'src/index.html',
    outputDir: 'build',
    toWatch: ['src/**']
  },
  deploy: {
    cname: 'www.json2pojo.com'
  },
  browserSync: {server: {baseDir: 'build'}},
  webpack: {
    dev: require('./webpack.config.dev.js'),
    prod: require('./webpack.config.prod.js')
  }
}

// Returns a webpack pipeline that builds a bundle based on the specified webpack config
function pipelineForWebpackConfig(webpackConfig) {
  return gulp.src(config.paths.entryPoint)
    .pipe(webpack(webpackConfig))
    .pipe(addsrc.append(config.paths.indexHtml))
    .pipe(gulp.dest(config.paths.outputDir))
}

// Delete the build folder
gulp.task('clean', function(cb) {
  del(['build'], cb)
})

// Dirty build: Don't clean while the server is running -
// the server crashes when it can't find the files requested
gulp.task('build-dev-dirty', function() {
  return pipelineForWebpackConfig(config.webpack.dev)
})

// Produce a clean development build
gulp.task('build-dev', ['clean', 'build-dev-dirty'])

// Produce a clean production build
gulp.task('build-prod', ['clean'], function() {
  return pipelineForWebpackConfig(config.webpack.prod)
})

// Serve the dev build with BrowserSync
gulp.task('server', ['build-dev-dirty'], function() {
  browserSync(config.browserSync)
})

// Watch the app files for changes, rebuild and serve
gulp.task('watch', ['server'], function() {
  gulp.watch(config.paths.toWatch, ['build-dev-dirty', browserSync.reload])
})

// Deploy the static site to GitHub Pages
gulp.task('deploy', ['clean', 'build-prod'], function() {
  return gulp.src(config.paths.outputDir + '/**/*')
    .pipe(file('CNAME', config.deploy.cname))
    .pipe(ghPages(config.deploy))
})

// Default: Clean build and start the dev server
// Ensure clean runs and completes before starting watcher
// to avoid race conditions and ENOENT errors.
gulp.task('default', function(callback) {
  runSequence('clean', 'watch', callback)
})
