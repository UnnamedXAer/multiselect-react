import React from 'react';
import './MultiselectSelectBox.css';


const multiselectSelectBox = (props) => {

    const { focusedOption } = props;
    return (
        //props.data.length === 0 ? <div className="MultiselectSelectBoxPlaceholder" >Type to search...</div> :
        <div className={"MultiselectSelectBox" + (props.show ? " MultiselectSelectBoxShow":" MultiselectSelectBoxHide")} 
            onBlur={props.blur} 
            tabIndex="0" 
            onFocus={props.focused}>
            <div className="MultiselectSelectBoxPlaceholder" >Type to search...</div>
            {
                props.data.map((x, idx) => (
                        <div className={'MultiselectSelectBoxElement' + ((focusedOption === idx) ? ' MultiselectSelectBoxElementFocused' : "")}
                            onClick={(ev) => props.elementClicked(ev, x)}
                            onMouseEnter={(ev) => props.mouseEntered(ev, idx)}
                            ref={ref => props.setRef(ref, idx)}
                            key={x.id} >
                            {x.name}
                        </div>
                    )
                )
            }
        </div> 
    );
}

export default multiselectSelectBox;