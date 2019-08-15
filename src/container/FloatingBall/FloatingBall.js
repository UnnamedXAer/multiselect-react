import React from 'react';
import './FloatingBall.css';

class FloatingBall extends React.Component {


    focusHandler = (ev) => {
        console.log('Ball focused.');
    }

    render () {
        return (<div tabIndex="0" className="FloatingBall" onFocus={this.focusHandler}></div>);
    }
}

export default FloatingBall;