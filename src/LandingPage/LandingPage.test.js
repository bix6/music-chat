import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { BrowserRouter } from 'react-router-dom';
import LandingPage from './LandingPage';
import ChatContext from '../ChatContext';

describe('LandingPage Component', () => {
    it('Smoke Test: Renders Empty', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <LandingPage />
            </BrowserRouter>,
            div);
        ReactDOM.unmountComponentAtNode(div);
    })

    it('Snapshot Test: Default, Empty Name', () => {
        const TestComponent = () => (
            <ChatContext.Provider value={{ name: '' }}>
                <LandingPage />
            </ChatContext.Provider>
        )
        const wrapper = mount(<TestComponent />);
        expect(toJson(wrapper.find(LandingPage))).toMatchSnapshot();
        wrapper.unmount();
    })
})