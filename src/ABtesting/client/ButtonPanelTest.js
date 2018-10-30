import Button from '../../component/Button';
import React from 'react';
import PropTypes from 'prop-types';
import '../../component/ButtonPanel.css';

const getCalcIcon = (icons, index) => {
    return icons[index] || " ";
};

class ButtonPanelTest extends React.Component {
    handleClick = (buttonName) => {
        this.props.clickHandler(buttonName);
    };

    render() {
        const { testData } = this.props;
        const icons = testData && testData.buttonsOrder ? testData.buttonsOrder.split(',') : ['÷','x','-','+','='];
        return (
            <div className="component-button-panel">
                <div>
                    <Button name="AC" clickHandler={this.handleClick}/>
                    <Button name="+/-" clickHandler={this.handleClick}/>
                    <Button name="%" clickHandler={this.handleClick}/>
                    <Button name={getCalcIcon(icons, 0)} clickHandler={this.handleClick} orange color={testData.buttonsColor} />
                </div>
                <div>
                    <Button name="1" clickHandler={this.handleClick}/>
                    <Button name="2" clickHandler={this.handleClick}/>
                    <Button name="3" clickHandler={this.handleClick}/>
                    <Button name={getCalcIcon(icons, 1)} clickHandler={this.handleClick} orange color={testData.buttonsColor}/>
                </div>
                <div>
                    <Button name="4" clickHandler={this.handleClick}/>
                    <Button name="5" clickHandler={this.handleClick}/>
                    <Button name="6" clickHandler={this.handleClick}/>
                    <Button name={getCalcIcon(icons, 2)} clickHandler={this.handleClick} orange color={testData.buttonsColor}/>
                </div>
                <div>
                    <Button name="7" clickHandler={this.handleClick}/>
                    <Button name="8" clickHandler={this.handleClick}/>
                    <Button name="9" clickHandler={this.handleClick}/>
                    <Button name={getCalcIcon(icons, 3)} clickHandler={this.handleClick} orange color={testData.buttonsColor}/>
                </div>
                <div>
                    <Button name="0" clickHandler={this.handleClick} wide/>
                    <Button name="." clickHandler={this.handleClick}/>
                    <Button name={getCalcIcon(icons, 4)} clickHandler={this.handleClick} orange color={testData.buttonsColor}/>
                </div>
            </div>
        );
    }
}
ButtonPanelTest.propTypes = {
    clickHandler: PropTypes.func,
    testData: PropTypes.object
};
export default ButtonPanelTest;
