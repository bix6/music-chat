import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { BrowserRouter } from 'react-router-dom';
import ChatSelector from './ChatSelector';

describe('ChatSelector Component', () => {
    it('Smoke Test: Renders Empty', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <ChatSelector />
            </BrowserRouter>,
            div);
        ReactDOM.unmountComponentAtNode(div);
    })

    it.skip('Snapshot Test: Empty', () => {
        const wrapper = shallow(<ChatSelector />);
        expect(toJson(wrapper)).toMatchSnapshot();
    })
})