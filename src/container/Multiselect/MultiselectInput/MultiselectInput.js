import React from 'react';
import './MultiselectInput.css';


const multiselectInput = React.forwardRef((props, ref) => {

    return (
        <input className="MultiselectInput" type="text" 
            value={props.inputValue} 
            onChange={props.inputValueChanged}
            onBlur={props.blur}
            ref={ref}
            onKeyDown={props.keyDown} />
    );
});

export default multiselectInput;