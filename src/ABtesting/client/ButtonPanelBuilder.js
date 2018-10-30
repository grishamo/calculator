import React from 'react';
import { PropTypes, instanceOf } from 'prop-types';
import { Cookies } from 'react-cookie'
import ButtonPanel from '../../component/ButtonPanel';
import ButtonPanelTest from './ButtonPanelTest';

class ButtonPanelBuilder extends React.Component {
    constructor(props) {
        super(props);
        const {cookies} = this.props;
        this.template = this.buildTemplate(cookies);
    }

    buildTemplate(cookies) {
        const testData = cookies.get('tname');
        if(!testData) {
            return <ButtonPanel clickHandler={this.handleClick}/>
        }
        return <ButtonPanelTest testData={testData} clickHandler={this.handleClick}/>
    }

    handleClick = (buttonName) => {
        this.props.clickHandler(buttonName);
    };

    render() {
        return this.template;
    }
}
ButtonPanelBuilder.propTypes = {
    clickHandler: PropTypes.func,
    cookies: instanceOf(Cookies)
};
export default ButtonPanelBuilder;
