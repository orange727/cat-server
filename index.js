'use strict;'

var nodemon = require('nodemon');
var path = require('path');

require('babel/register');
require('./server/build');

var pwd = process.argv[2] || './';
console.log(path.resolve(process.cwd(), pwd));
process.chdir(path.resolve(process.cwd(), pwd));

// or
// require('./server');
nodemon({
	script: path.join(__dirname, '/server/index.js'),
	ext: 'js json'
})
.on('start', function(){
    console.log('open http://localhost:' + 7777);
})
.on('restart', function(){
    console.log('restarted!');
});
