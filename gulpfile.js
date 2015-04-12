// Gulp is our task runner.
var gulp = require('gulp')

// Webpack is our build system.
var webpack = require('gulp-webpack')

// addsrc helps us add files in the middle of a gulp task, because we need to
// a) compile the JS at src/index.js, then b) add the HTML at src/index.html as
// our browser entry point.
var addsrc = require('gulp-add-src')

// ghPages helps us deploy to GitHub Pages when we run 'gulp deploy'.
var ghPages = require('gulp-gh-pages')

// BrowserSync refreshes the browser when files change and are recompiled.
var browserSync = require('browser-sync')

// del deletes files in a tree (rm -rf).
var del = require('del')

// runSequence runs two or more Gulp tasks serially instead of in parallel.
var runSequence = require('run-sequence')

// file helps us add a file with arbitrary data in the middle of our Gulp tasks.
var file = require('gulp-file')

var config = {
  paths: {

    // The entry point is where the app starts compiling.
    entryPoint: 'src/index.js',

    // The index HTML is what index.js uses as the base layout. It's just big
    // enough to give us a root node so we can inject our React view.
    indexHtml: 'src/index.html',

    // Output compiled files to build/.
    outputDir: 'build',

    // Watch all files in src/ for changes, rebuild, and refresh the server when
    // anything changes.
    toWatch: ['src/**']

  },

  deploy: {
    // Deploying to GitHub Pages? Set your site name here and Gulp will add a
    // CNAME file with this entry. This lets you point your external page to
    // GitHub Pages as a web host.
    cname: 'www.json2pojo.com'
  },

  // BrowserSync refreshes our browser when the files in /build change.
  browserSync: {server: {baseDir: 'build'}},

  // These are the two different Webpack configs for building for dev/prod.
  webpack: {
    dev: require('./webpack.config.dev.js'),
    prod: require('./webpack.config.prod.js')
  }
}

// Returns a webpack pipeline that builds a bundle based on the specified
// webpack config
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
