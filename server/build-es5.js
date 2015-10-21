var path = require('path');
var gulp = require('gulp');
var babel = require('gulp-babel');
var runSequence = require('run-sequence');
var rename = require("gulp-rename");
var livereload = require("gulp-livereload");

var cwd = process.cwd(),
    paths = {
        script: [path.join(cwd, '/src/**/*.jsx'), path.join(cwd, '/src/**/*.js')],
        scriptDest: path.join(cwd, '/dist/')
    };

gulp.task('build-es5', function () {
    gulp.src(paths.script)
        .pipe(babel())
        .pipe(gulp.dest(paths.scriptDest));
});


runSequence(['build-es5']);







