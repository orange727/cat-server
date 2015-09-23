import fs           from 'fs';
import glob         from 'glob';
import path         from 'path';
import babelify     from 'babelify';
import watchify     from 'watchify';
import browserify   from 'browserify';

let cwd = process.cwd();

let b = browserify();
let w = watchify(b);

let build = (b) => {
	glob.sync(path.join(cwd, '/examples/*')).forEach(function(file){
	 console.log('==build');
	 console.log(file);
	 console.log(path.resolve(__dirname, '../build/' + path.parse(file).name));
		b.add(file)
		b.transform(babelify)
		b.bundle()
			// .on("error", function (err) { console.log("Error : " + err.message); })
		 .pipe(fs.createWriteStream(path.resolve(__dirname, '../build/' + path.parse(file).name + '.js')));
	});
}

build(b);

w.on('update', function () {
	build(w);
});

