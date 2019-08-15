import React, { Component } from 'react';
import Multiselect from '../Multiselect/Multiselect'

import axios from '../../axios-devServer';

class CustomFrom extends Component {
    
    constructor (props) {
        super(props);
        this.state = {
            fruits: [],
            allFruits: [{id:1, name:"Apple"}, {id: 2, name:"Banana"}, {id:3, name:"Orange"}]
        }
    }

    getSelectedOptionsSelectHandler = (options, dataName) => {
        // console.log('CustomFrom.getSelectedOptionsSelectHandler\n new fruits: ', options);
        this.setState({[dataName]: options});
    }

    submitHandler = (ev) => {
        ev.preventDefault();

         console.log('submit', this.state);
    }

    componentDidMount () {
            // axios.get('/fakejson/')
            // .then(response => {
            //     // console.log(response);
            //     this.setState({allFruits: response.data});
            // })
            // .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="CustomFrom">
            <h3>{this.props.title}</h3>
                <form onSubmit={this.submitHandler}>
                    <input type="text" name="name" />
                    <Multiselect
                        options={this.state.allFruits}
                        sendSelectedOnSelect={this.getSelectedOptionsSelectHandler}
                        title="Select some options"
                        dataName="fruits" />
                    <input type="submit" name="submit" />
                </form>
            </div>
        );
    }
}

export default CustomFrom;
