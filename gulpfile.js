var gulp = require('gulp');
var gulpFilter = require('gulp-filter');
var mainBowerFiles = require('main-bower-files');

var src = 'src';
var dest = 'build';

gulp.task('main-files', function() {
    gulp.src(src + '/js/*.js')
        .pipe(gulp.dest(dest + '/js'));
    gulp.src(src + '/web/**')
        .pipe(gulp.dest(dest));
});

gulp.task('bower-files', function() {
    var jsFilter = gulpFilter('*.js');
    var cssFilter = gulpFilter('*.css');
        
    return gulp.src(mainBowerFiles())
        .pipe(jsFilter)
        .pipe(gulp.dest(dest + '/js'))
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe(gulp.dest(dest + '/css'));
});

gulp.task('watch', function() {
    gulp.watch('bower_components/**', ['bower-files']);
    gulp.watch(src + '/**', ['main-files']);
});

gulp.task('default', function() {
    gulp.run('main-files', 'bower-files');
});
