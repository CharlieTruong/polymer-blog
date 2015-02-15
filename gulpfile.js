var gulp = require('gulp');
var connect = require('gulp-connect');
var vulcanize = require('gulp-vulcanize');
var historyApiFallback = require('connect-history-api-fallback');

var build = function() {
  var DEST_DIR = 'dist';
  return gulp.src('index.html')
    .pipe(vulcanize({
      dest: DEST_DIR,
      strip: true,
      csp: true,
      inline: true
    }))
    .pipe(gulp.dest(DEST_DIR));
};

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true,
    middleware: function(connect, opt) {
      return [historyApiFallback];
    }
  });
});

gulp.task('reload', function () {
  build()
  .pipe(connect.reload());
});
 
gulp.task('watch', function () {
  gulp.watch(['index.html', 'elements/**/*.html'], ['reload']);
});

gulp.task('build', function() {
  build();
});

gulp.task('default', ['build', 'connect', 'watch']);