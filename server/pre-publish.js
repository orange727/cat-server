var path = require('path');
var gulp = require('gulp');
var babel = require('gulp-babel');
var less = require('gulp-less');
var runSequence = require('run-sequence');

var cwd = process.cwd(),
    paths = {
        script: [path.join(cwd, '/src/**/*.jsx'), path.join(cwd, '/src/**/*.js')],
        dest: path.join(cwd, '/dist/'),
        css: [path.join(cwd, '/assets/index.less')]
    };

gulp.task('pre-publish', function () {
    gulp.src(paths.script)
        .pipe(babel({stage:0}))
        .pipe(gulp.dest(paths.dest));
    gulp.src(paths.css)
        .pipe(less())
        .pipe(gulp.dest(paths.dest));
});


runSequence(['pre-publish']);







