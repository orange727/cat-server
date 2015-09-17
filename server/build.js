import fs           from 'fs';
import glob         from 'glob';
import path         from 'path';
import babelify     from 'babelify';
import browserify   from 'browserify';

let cwd = process.cwd();
let entry = {};

glob.sync(path.join(cwd, '/examples/*')).forEach(function(file){
    let b = browserify();
    b.add(file)
    b.transform(babelify)
    b.bundle()
        // .on("error", function (err) { console.log("Error : " + err.message); })
     .pipe(fs.createWriteStream(path.resolve(__dirname, '../build/' + path.parse(file).name + '.js')));
});
