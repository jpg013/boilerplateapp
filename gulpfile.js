// Dependencies
// -------------------------
require("./environment")
var gulp        = require('gulp');
var rename      = require('gulp-rename');
var less        = require('gulp-less')
var minifyCSS   = require('gulp-minify-css');
var nodemon     = require('gulp-nodemon');
var browserify  = require('browserify');
var rename      = require('gulp-rename');
var del         = require('del');
var gulpuglify  = require('gulp-uglify');
var hbsfy       = require('hbsfy');
var source      = require('vinyl-source-stream');
var runSequence = require('run-sequence');
var livereload  = require('gulp-livereload');
var sourcemaps  = require('gulp-sourcemaps');
var gulpif      = require('gulp-if');
var prefix      = require('gulp-autoprefixer');
var concat      = require('gulp-concat');

// Tasks
// -------------------------

// Only uglify if not in development
var uglify = function() {
  return gulpif(process.env.NODE_ENV !== 'development', gulpuglify());
}

// Build tasks
gulp.task('browserify', function() {
  var b = browserify('./client/js/app.js', {debug: true})
  return b.transform(hbsfy)
    .bundle()
    .pipe(source('app.browserified.js'))
    .pipe(gulp.dest('./build'))
});

gulp.task('minify', ['styles'], function() {
  return gulp.src('./build/bundle.css')
    .pipe(minifyCSS())
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest('./public/css'))
});

gulp.task('uglify', function() {
  return gulp.src('build/app.browserified.js')
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('public/js'));
});

// Style tasks
gulp.task('styles', function() {
  return gulp.src('./client/less/index.less')
    .pipe(less())
    .pipe(prefix({ cascade: true }))
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('./build'))
});

// Clean tasks
gulp.task('clean', ['cleanbuild'], function(done) {
  del(['./public/js', './public/css'], done)
});

gulp.task('cleanbuild', function(done) {
  del(['./build'], done)
});

// commands
gulp.task('build', ['clean'], function(done) {
  return runSequence('browserify', 'uglify', 'minify', 'cleanbuild', done);
});

gulp.task('watch', function(done){
  return runSequence('build', function() {
    gulp.watch('./client/js/**/*.js', ['build']);
    gulp.watch('./client/templates/*.hbs', ['build']);
    gulp.watch('./client/less/*.less', ['build']);
    done()
  })
});

gulp.task('dev', ['watch'], function() {
  nodemon({
    script: 'server.js',
    delay: 2500
  })
});
