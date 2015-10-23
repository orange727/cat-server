import React from 'react';
import ReactDOM from 'react-dom';

class Simple extends React.Component {
    alert() {
        console.log(arguments);
        alert('alert some test text');
    }

    render() {
        return (
            <div onClick={this.alert}>This is a simple example</div>
        );
    }
}

ReactDOM.render(<Simple />, document.getElementById('component-example-simple'));
