var  _            = require('lodash');
var  fs           = require('fs');
var  path         = require('path');
var  React        = require('react');
var  koa          = require('koa');
var  koarouter    = require('koa-router');
var  koastatic    = require('koa-static');

var app = koa(),
    router = koarouter();

var __root = function (dir) { return path.join(path.dirname(__dirname), dir); }


var files = fs.readdirSync('examples'),
    navList = files.map(function (filename) {
    return `/examples/${filename.split('.')[0]}`;
});
navList.unshift('/readme');

// var layout = fs.readFileSync(__root('layout.html'));

//readme
router.get('/readme', function *(next) {
    var layout = fs.readFileSync(__root('layout.html'));
    var readme = fs.readFileSync('readme.md', 'utf8'),
        data = {
            navList: navList,
            body: readme,
            script: ''
        };
    this.body = _.template(layout)(data);
});

//examples
router.get('/examples/:example', function *(next) {
    var layout = fs.readFileSync(__root('layout.html'));
    var data = {
        navList: navList,
        body: fs.readFileSync(`${process.cwd()}/examples/${this.params.example}.jsx`, 'utf8'),
        script: this.params.example
    };
    this.body =  _.template(layout)(data);
    //前端渲染而非同构
    // var Example = require(`${process.cwd()}/examples/${this.params.example}.jsx`);
    // data.body = React.renderToString(<Example />);
});

console.log('build path: %s', __root('build'));
//process static file service
app.use(koastatic(__root('build')));
app.use(koastatic(__root('assets')));

app.use(router.routes());

app.listen('7777');
