import React from 'react';
import ReactDOM from 'react-dom';

class Advanced extends React.Component {
    render() {
        return (
            <div>This is an advanced 栗子2</div>
        )
    }
}

// export default Advanced;
ReactDOM.render(<Advanced />, document.getElementById('component-example-advanced'));
