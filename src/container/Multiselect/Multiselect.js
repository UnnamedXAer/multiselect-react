import React, { Component } from 'react';
import SelectedElement from './SelectedElement/SelectedElement';
import MultiselectInput from './MultiselectInput/MultiselectInput';
import MultiselectSelectBox from './MultiselectSelectBox/MultiselectSelectBox';
import { getReducedArray } from '../../utility';
import './Multiselect.css';

class Multiselect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOptions: [],
            inputValue: "",
            showSelectBox: false,
            focusedOption: 0,
            //options: [...this.props.options]
            availableOptions: [...this.props.options]
        }

        // create a ref to store the textInput DOM element
        this.textInput = React.createRef();

        this.optionRefs = {};

        this.blurTimeout =  null;
    }

    selectBoxScrollTo(id) {
        const ref = this.optionRefs[id];
        if (ref) {
            ref.scrollIntoView();
        }
    }

    inputChangedHandler = (ev) => {
        const value = ev.target.value;
        this.setState({inputValue: value});
        const len = value.length;
        let options = [...this.props.options];
        options = options.filter(x => x.name.substring(0,len).toLowerCase() === value.toLowerCase());
        const selectedOptions = [...this.state.selectedOptions];
        const newOptions = getReducedArray(options, selectedOptions);
        this.setState({availableOptions: newOptions, showSelectBox: true, focusedOption: 0});


        /*
        this.inputChanged_timeout = new Timeout(() => {
            axios.get('/fakejson/'+value)
            .then(response => {
                console.log(response);
                console.log('inputChangedHandler_timeout - in timeout', this.inputChanged_timeout);
                if (!this.inputChanged_timeout.cleared) { // do update records.
                    const newOptions = getReducedArray(response.data, this.state.selectedOptions);
                    this.setState({options: newOptions, showSelectBox: true});
                }
                else {
                    //console.log('multipleSelectOnInputChangedHandler - updating skipped'); // remove if if this never occurs
                }
            })
            .catch(err => console.log(err));
        }, 200);*/
    }

    multiselectOptionClickHandler = (ev, newOption) => {
        //clearTimeout(this.blurTimeout);
        // console.log('in: multiselectOptionClick');
        this.addToSelected(newOption);
    }

    addToSelected = (newOption) => {
        const selectedOptions = [...this.state.selectedOptions];
        selectedOptions.push(newOption);

        const newOptions = getReducedArray([...this.props.options], selectedOptions);

        this.setState({
            availableOptions: newOptions, 
            selectedOptions: selectedOptions,
            inputValue: ""
        });

        this.props.sendSelectedOnSelect(selectedOptions, this.props.dataName);
        //this.textInput.current.focus();
    }

    selectedElementRemoveClickHandler = (ev, id) => {
        const selectedOptions = [...this.state.selectedOptions];
        const newSelectedOption = selectedOptions.filter(x => x.id !== id);
        this.setState({selectedOptions: newSelectedOption});

        this.props.sendSelectedOnSelect(selectedOptions, this.props.dataName);
    }

    blurHandler = (ev) => {
        // const currentTarget = ev.currentTarget;
        // console.log('in: blur');
        this.blurTimeout = setTimeout(() => {
            // console.log('activeElement', document.activeElement)
            // console.log('this', this);
            // console.log('in: blur > timeout');
            if (this.state.showSelectBox /*&& !currentTarget.contains(document.activeElement)*/) {
                // console.log('in: blur > timeout > if');
                this.setState({showSelectBox: false});
            }
        }, 10);
    }

    focusHandler = (ev) => {
        clearTimeout(this.blurTimeout);
        // console.log('focused',ev.target);
        // if (!this.showSelectBox) {
        //     this.setState({showSelectBox: true});
        // }
    }

    elementsContainerClickHandler = (ev) => {
        this.textInput.current.focus();
    }

    toggleSelectboxHandler = (ev) => {
        const show = !this.state.showSelectBox;
        
        if (show) {
            this.setState({showSelectBox: show});
            this.textInput.current.focus();
        }
        else {
            this.setState({showSelectBox: show, inputValue: ""});
        }
    }

    inputKeyDownHandler = (ev) => {
        let focusedOption;
        switch (ev.keyCode) {
            case 40: //down
                if (!this.state.showSelectBox) {
                    this.setState({showSelectBox: true});
                }
                else {
                    focusedOption = this.state.focusedOption+1;
                    if (focusedOption < this.state.availableOptions.length)
                        this.setState({focusedOption: focusedOption});
                        this.selectBoxScrollTo(focusedOption);
                }
                break;
            case 38: //up
                focusedOption = this.state.focusedOption-1; 
                if (focusedOption >= 0) {
                    this.setState({focusedOption: focusedOption});
                    this.selectBoxScrollTo(focusedOption);
                }
                break;
            case 13: //enter
                const option = this.state.availableOptions[this.state.focusedOption];
                if (option !== undefined && this.state.showSelectBox)
                    this.addToSelected(option);
                break;
            case 27: //esc
                this.setState({inputValue: "", showSelectBox: false});
            break;
            default:
                break;
        }
        //console.log(this.state.focusedOption)
    }

    removeAllSelectedHandler = (ev) => {
        this.setState({selectedOptions: [], availableOptions: this.props.options, inputValue: ''});
        this.textInput.current.focus();
    }

    selectBoxOptionMouseEnterHandler = (ev, idx) => {
        this.setState({focusedOption: idx});
    }

    selectBoxSetRef = (el, idx) => {
        this.optionRefs[idx] = el;
    }

    render() {
        return (
            <div className="MultiSelect" >
                <h4 className="MultiselectTitle">{this.props.title}</h4>
                <div className="Container" onBlur={this.blurHandler}  onFocus={this.focusHandler} tabIndex="0">
                    <div className="Elements" onClick={this.elementsContainerClickHandler} >
                        {this.state.selectedOptions.map((option) =>
                                <SelectedElement 
                                    key={option.id} 
                                    name={option.name} 
                                    id={option.id} 
                                    removeClicked={this.selectedElementRemoveClickHandler} />
                            )
                        }
                        <MultiselectInput 
                            keyDown={this.inputKeyDownHandler}
                            dataName={this.props.dataName} 
                            inputValue={this.state.inputValue} 
                            inputValueChanged={this.inputChangedHandler} 
                            ref={this.textInput} />
                    </div>
                    <div className="Buttons">
                        <div className="Clear" onClick={this.removeAllSelectedHandler}>×</div>
                        <div className="Expand" onClick={this.toggleSelectboxHandler}>
                            <span className="ExpandArrow"></span>
                        </div>
                    </div>
                </div>
                <div className="SelectBoxWrapper">
                    <MultiselectSelectBox 
                        elementClicked={this.multiselectOptionClickHandler}
                        data={this.state.availableOptions}
                        show={this.state.showSelectBox}
                        focusedOption={this.state.focusedOption} 
                        mouseEntered={this.selectBoxOptionMouseEnterHandler}
                        setRef={this.selectBoxSetRef}
                        focused={this.focusHandler}
                        blur={this.blurHandler}
                    />
                </div>
            </div>
        );
    }
}

export default Multiselect;
