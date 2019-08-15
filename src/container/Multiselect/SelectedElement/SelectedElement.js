import React from 'react';
import './SelectedElement.css';


const selectedElement = (props) => {
    return <span className="SelectedElement">
            <div className="SelectedElementRemove" onClick={(ev) => props.removeClicked(ev, props.id)}>×</div>
            <div className="SelectedElementValue">{props.name}</div>
        </span>
}

export default selectedElement;