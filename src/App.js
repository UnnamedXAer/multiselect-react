import React, { Component } from 'react';
import './App.css';
import CustomForm from './container/CustomForm/CustomFrom';
import FloatingBall from './container/FloatingBall/FloatingBall';

class App extends Component {
    render() {
        return (
            <div className="App">
                <FloatingBall />
                <header className="App-header">
                    Multiselect demo
                </header>
                <CustomForm />
            </div>
        );
    }
}

export default App;
