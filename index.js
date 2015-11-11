const gulp = require('gulp');

const livereload = require('gulp-livereload');
const less = require('gulp-less');
const connect = require('gulp-connect');
const gutil = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const watchify = require('watchify');
const browserify = require('browserify');
const uglify = require('gulp-uglify');



const config = {
  path: {
    assets: 'assets',
    src: './src',
    styles: 'styles',
    dist: './dist'
  }
};


gulp.task('webserver', function() {
  connect.server({
    port: 8081,
    root: config.path.dist
  });
});



gulp.task('styles', function() {
  gulp.src(config.path.styles + '/app.less')
    .pipe(less())
    .pipe(gulp.dest(config.path.dist + '/css'))
    .pipe(livereload());
});



var bundler = watchify(browserify('./src/index.js', watchify.args));
// add any other browserify options or transforms here
// bundler.transform(require('reactify'), {es6: true, es6module: true, nonStrictEs6Module: true});
bundler.transform(require('babelify'), {presets: ["es2015", "react"]});

function bundle() {
  gutil.log('Updated JS, rebundling...');
  return bundler.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('index.js'))
    // .pipe(buffer())
    // .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    // .pipe(uglify())
    // optional, remove if you dont want sourcemaps
    // .pipe(sourcemaps.write('./')) // writes .map file
    //
    .pipe(gulp.dest(config.path.dist + '/js'))
    .pipe(livereload());
}
gulp.task('js', bundle); // so you can run `gulp js` to build the file
bundler.on('update', bundle); // on any dep update, runs the bundler


gulp.task('assets', function() {
  gulp.src(config.path.assets + '/**/*.*')
    .pipe(gulp.dest(config.path.dist))
    .pipe(livereload());
});



gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(config.path.styles + '/**/*.less', ['styles']);
  gulp.watch(config.path.assets + '/**/*.*', ['assets']);
});





gulp.task('build-dev', ['watch', 'assets', 'js', 'styles']);
gulp.task('default', ['watch', 'js']);
  