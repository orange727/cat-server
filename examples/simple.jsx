import React from 'react';

class Simple extends React.Component {
	alert() {
		alert(22);
	};
	render() {
		return (
				<div onClick={this.alert}>hhhThis khjfdshais a hjsimple 栗子，哈哈</div>
			   );
	}
};

React.render(<Simple />, document.getElementById('__react-content'));
// export default Simple;
