var fs           = require('fs');
var glob         = require('glob');
var path         = require('path');
var babelify     = require('babelify');
var watchify     = require('watchify');
var browserify   = require('browserify');

var cwd = process.cwd();
var build = function (b, file) {
	console.log("===build===", file);
	b.add(file)
	b.transform(babelify.configure({
	  stage: 0,
	  }))
	b.bundle()
	.on("error", function (err) { console.log("Babel Error : " + err.message); })
	.pipe(fs.createWriteStream(path.resolve(__dirname, '../build/' + path.parse(file).name + '.js')));
}

glob.sync(path.join(cwd, '/examples/*')).forEach(function(file){
	var b = browserify();
	build(b, file);
	var w = watchify(b);

	w.on('update', function () {
		build(w, file);
	});
});
