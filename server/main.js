var  _            = require('lodash');
var  fs           = require('fs');
var  path         = require('path');
var  React        = require('react');
var  koa          = require('koa');
var  koarouter    = require('koa-router');
var  koastatic    = require('koa-static');
var  highlight    = require('highlight').Highlight;
var  marked       = require('marked');

var app = koa(),
    router = koarouter();

var __root = function (dir) { return path.join(path.dirname(__dirname), dir); }


var files = fs.readdirSync('examples'),
    jsxReg = new RegExp('.jsx$'),
    navList = files.filter(function (filename) {
        return jsxReg.test(filename);
    }).map(function (filename) {
        return `/examples/${filename.split('.')[0]}`;
    });
navList.unshift('/readme');

// var layout = fs.readFileSync(__root('layout.html'));

//readme
router.get('/readme', function *(next) {
    var layout = fs.readFileSync(__root('layout.html')),
        readme = fs.readFileSync('readme.md', 'utf8'),
        data = {
            navList: navList,
            script: '',
            readme: marked(readme),
            code: ''
        };
    this.body = _.template(layout)(data);
});

//examples
router.get('/examples/:example', function *(next) {
    var layout = fs.readFileSync(__root('layout.html')),
        readmeFileName = `${process.cwd()}/examples/${this.params.example}.md`,
        readme = fs.existsSync(readmeFileName) ? fs.readFileSync(readmeFileName, 'utf8') : '',
        data = {
            navList: navList,
            script: this.params.example,
            readme: marked(readme),
            code: highlight(fs.readFileSync(`${process.cwd()}/examples/${this.params.example}.jsx`, 'utf8'))
        };

    this.body =  _.template(layout)(data);
});

//redirect
router.redirect('/', '/readme');

//process static file service
app.use(koastatic(__root('build')));
app.use(koastatic(__root('assets')));

app.use(router.routes());

var port = process.env.PORT || 7777;
app.listen(port);
console.log('start server on ' + port);
