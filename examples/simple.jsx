import React from 'react';

class Simple extends React.Component {
	alert() {
		alert('alert some test text');
	};
	render() {
		return (
				<div onClick={this.alert}>This is a simple example</div>
			   );
	}
};

React.render(<Simple />, document.getElementById('__react-content'));
