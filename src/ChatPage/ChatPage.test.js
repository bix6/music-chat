import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { BrowserRouter } from 'react-router-dom';
import ChatPage from './ChatPage';

describe('ChatPage Component', () => {
    it.skip('Smoke Test: Renders Empty', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <ChatPage />
            </BrowserRouter>,
            div);
        ReactDOM.unmountComponentAtNode(div);
    })

    it('Snapshot Test: Empty', () => {
        const wrapper = shallow(<ChatPage />);
        expect(toJson(wrapper)).toMatchSnapshot();
    })
})