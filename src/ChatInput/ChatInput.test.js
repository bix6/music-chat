import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { BrowserRouter } from 'react-router-dom';
import ChatInput from './ChatInput';

describe('ChatInput Component', () => {
    it('Smoke Test: Renders Default', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <ChatInput />
            </BrowserRouter>,
            div);
        ReactDOM.unmountComponentAtNode(div);
    })

    it('Snapshot Test: Default', () => {
        const wrapper = shallow(<ChatInput />);
        expect(toJson(wrapper)).toMatchSnapshot();
    })
})