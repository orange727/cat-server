##ReadME

为react-cat提供Server服务


####start server

npm install cat-server

node node_modules/.bin/cat-server


####file structure

	-examples
	-src	     //put your component here
	-readme.md
	-package.json

####examples

	import React from 'react';

	class Example extends React.Component {
  		alert() {
        	alert('This is a simple example');
      	}
    	render() {
        	return (<div onClick={this.alert}>This is a simple Example</div>);
    	}
	};

	React.render(<Example />, document.getElementById('__react-content'));

This is importent for rendering examples on page:

`React.render(<Example />, document.getElementById('__react-content'));
`
####readme.md

Remember to follow User-Guide of cat-component
