import config    from 'config'
import fs        from 'fs'
import gutil     from 'gulp-util'
import gulp	     from 'gulp'
import nodemon   from 'gulp-nodemon'
import webpack   from 'webpack'
import browserSync from 'browser-sync'

//webpack files
let entry = {},
	files = fs.readdirSync('examples');
files.map(function(file) {
	entry[file.split('.')[0]] = `${process.cwd()}/examples/${file}`;
});
let webpackConfig = {
	watch: true,
	entry: entry,
	output: {
		path: './build/',
		filename: '[name].js'
	},
	module: {
		loaders: [
			{test: /\.(es6|js|jsx)$/, loader: 'babel-loader'}
		]
	}
};

gulp.task('default', [
	'build',
	'server',
]);

var muitiple = true;
gulp.task('build', function (callback) {
	webpack(webpackConfig, function(err, stats) {
		if (err) {
			return gutil.log(err);
		}
		// gutil.log("[webpack]", stats.toString(webpackConfig.stats));
		muitiple && callback();
		muitiple = false;
	});
});

// server
gulp.task('server', function(){
  nodemon({
    watch : [ 'server/' ],
    ignore: [ 'node_modules/' ]
  })
  .on('start', function(){
    gutil.log('open http://localhost:' + config.port);
  })
  .on('restart', function(){
    gutil.log('restarted!');
  })
});

// browser-sync
gulp.task('browser-sync', function() {
	browserSync.create().init({
		proxy: 'localhost://' + config.port
	});
});
