# ReadME

为React Component提供Server服务

Remember to follow User-Guide of cat-component


## Start Server

npm install cat-server

node node_modules/.bin/cat-server   //启动服务(默认端口7777)

## Publish

node node_modules/.bin/pre-publish  //将src目录下的es6文件编译成es5，目标目录dist

npm publish

## File Structure

	-assets
	-examples
	-src	     //put your component here
	-readme.md
	-package.json

## examples/simple.jsx

	import React from 'react';
    import ReactDOM from 'react-dom';

	class Example extends React.Component {
  		alert() {
        	alert('This is a simple example');
      	}
    	render() {
        	return <button onClick={this.alert.bind(this)}>This is a simple Example</button>;
    	}
	};

	ReactDOM.render(<Example />, document.getElementById('component-example-simple'));

This is important for rendering examples on page:

`React.render(<Example />, document.getElementById('component-example-YourFileName'));
`
