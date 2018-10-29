import React from 'react';
import Display from './Display';
import ButtonPanel from './ButtonPanel';
import ButtonPanel2 from './ButtonPanel2';
import './App.css';
import { connect } from 'react-redux'
import { calculate, calculatorLoaded } from '../actions/calculator'
import { hot } from 'react-hot-loader'
export class App extends React.Component {
    handleClick = (buttonName) => {
        this.props.calculate(buttonName);
    };

    render() {
        const {total, next} = this.props;
        return (
            <div className="component-app">
                <Display
                    value={next || total || '0'}
                />
                <ButtonPanel2
                    clickHandler={this.handleClick}
                />
            </div>
        );
    }
}
const mapState = state => ({
    total: state.calculator.total,
    next: state.calculator.next,
})
export default hot(module)(connect(mapState, { calculate, calculatorLoaded })(App))
