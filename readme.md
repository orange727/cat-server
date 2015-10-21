## ReadME

为react-cat提供Server服务


#### start server

npm install cat-server

node node_modules/.bin/cat-server


#### file structure

	-examples
	-src	     //put your component here
	-readme.md
	-package.json

#### examples/simple.jsx

	import React from 'react';

	class Example extends React.Component {
  		alert() {
        	alert('This is a simple example');
      	}
    	render() {
        	return (<div onClick={this.alert}>This is a simple Example</div>);
    	}
	};

	React.render(<Example />, document.getElementById('component-example-simple'));

This is importent for rendering examples on page:

`React.render(<Example />, document.getElementById('component-example-YourFileName'));
`
#### readme.md

Remember to follow User-Guide of cat-component
