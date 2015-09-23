import _            from 'lodash'
import fs           from 'fs'
import path         from 'path'
import React        from 'react'
import koa          from 'koa'
import koarouter    from 'koa-router'
import koastatic    from 'koa-static'
import marked		from 'marked'

let app = koa(),
    router = koarouter();

let __root = (dir) => path.join(path.dirname(__dirname), dir);


let files = fs.readdirSync('examples'),
    navList = files.map(function (filename) {
    return `/examples/${filename.split('.')[0]}`;
});
navList.unshift('/readme');

// var layout = fs.readFileSync(__root('layout.html'));

//readme
router.get('/readme', function *(next) {
    var layout = fs.readFileSync(__root('layout.html'));
    let readme = fs.readFileSync('readme.md'),
        data = {
            navList: navList,
            body: marked(readme.toString()),
            script: ''
        };
    this.body = _.template(layout)(data);
});

//examples
router.get('/examples/:example', function *(next) {
    var layout = fs.readFileSync(__root('layout.html'));
    let data = {
        navList: navList,
        body: '',
        script: `/${this.params.example}.js`
    };
    data.body = fs.readFileSync(`${process.cwd()}/examples/${this.params.example}.jsx`);
    this.body =  _.template(layout)(data);
    //前端渲染而非同构
    // let Example = require(`${process.cwd()}/examples/${this.params.example}.jsx`);
    // data.body = React.renderToString(<Example />);
});

console.log('build path: %s', __root('build'));
//process static file service
app.use(koastatic(__root('build')));
app.use(koastatic(__root('assets')));

app.use(router.routes());

app.listen('7777');
