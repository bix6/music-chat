import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { BrowserRouter } from 'react-router-dom';
import ChatSelector from './ChatSelector';
import ChatContext from '../ChatContext';

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

    it('Snapshot Test: Empty', () => {
        const TestComponent = () => (
            <ChatContext.Provider value={{ chatroomList: ['Global', 'Artists', 'Songs'] }}>
                <ChatSelector />
            </ChatContext.Provider>
        )
        const wrapper = mount(<TestComponent />);
        expect(toJson(wrapper.find(ChatSelector))).toMatchSnapshot();
        wrapper.unmount();
    })
})