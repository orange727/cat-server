var path = require('path');
var babelify = require('babelify');
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var runSequence = require('run-sequence');
var rename = require("gulp-rename");
var livereload = require("gulp-livereload");

var cwd = process.cwd(),
    babel = babelify.configure({
        stage: 0
    }),
    paths = {
        script: path.join(cwd, '/examples/**/*.jsx'),
        scriptDest: path.resolve(__dirname, '../build/'),
        watch: [path.join(cwd, '/examples/**/*.jsx'), path.join(cwd, '/src/**/*')]
    };

gulp.task('build', function () {
    gulp.src(paths.script)
        .pipe(browserify({
            transform: [babel],
            debug: true
        }))
        .pipe(rename({
            extname: '.js'
        }))
        .pipe(gulp.dest(paths.scriptDest));
});


gulp.task('watch', function () {
    livereload.listen();
    console.log('livereload start on 35729');
    gulp.watch(paths.watch, function (e) {
        if (e.type === 'changed') {
            gulp.src(e.path)
                .pipe(browserify({
                    transform: [babel],
                    debug: true
                }))
                .pipe(rename({
                    extname: '.js'
                }))
                .pipe(gulp.dest(paths.scriptDest))
                .pipe(livereload());
        }
    });
});

runSequence(['build', 'watch']);







