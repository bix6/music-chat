import React from 'react';
import ReactDOM from 'react-dom';
import toJson from 'enzyme-to-json';
import { BrowserRouter } from 'react-router-dom';
import ChatConvo from './ChatConvo';

describe('ChatConvo Component', () => {
    it.skip('Smoke Test: Renders Empty', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <ChatConvo />
            </BrowserRouter>,
            div);
        ReactDOM.unmountComponentAtNode(div);
    })

    it.skip('Snapshot Test: Empty', () => {
        const wrapper = shallow(<ChatConvo />);
        expect(toJson(wrapper)).toMatchSnapshot();
    })
})