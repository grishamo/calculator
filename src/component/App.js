import React from 'react';
import Display from './Display';
import ButtonPanelBuilder from '../ABtesting/client/ButtonPanelBuilder';
import { withCookies } from 'react-cookie';
import './App.css';
import { connect } from 'react-redux';
import { calculate, calculatorLoaded } from '../actions/calculator'
import { hot } from 'react-hot-loader'
export class App extends React.Component {
    handleClick = (buttonName) => {
        this.props.calculate(buttonName);
    };

    render() {
        const {total, next, cookies} = this.props;
        return (
            <div className="component-app">
                <Display
                    value={next || total || '0'}
                />
                <ButtonPanelBuilder
                    clickHandler={this.handleClick}
                    cookies={cookies}
                />
            </div>
        );
    }
}
const mapState = state => ({
    total: state.calculator.total,
    next: state.calculator.next
});
export default hot(module)(withCookies(connect(mapState, { calculate, calculatorLoaded })(App)))
