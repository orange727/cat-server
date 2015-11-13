var path = require('path');
var webpack = require('gulp-webpack');
var named = require('vinyl-named');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var LiveReloadPlugin = require('webpack-livereload-plugin');

var cwd = process.cwd(),
    paths = {
        script: path.join(cwd, '/examples/**/*.jsx'),
        scriptDest: path.resolve(__dirname, '../build/')
    },
    webpackConfig = {
        watch: true,
        module: {
            loaders: [
                { test: /\.(es6|js|jsx)$/, loader: 'babel?stage=0' },
                { test: /\.less$/, loader: 'style!css!less' }
            ]
        },
        output: {
            filename: '[name].js'
        },
        devtool: 'source-map',
        plugins:[new LiveReloadPlugin()]
    };

gulp.task('webpack', function(){
    gulp.src(paths.script)
        .pipe(named())
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(paths.scriptDest));
});

runSequence(['webpack']);







