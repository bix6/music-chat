import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
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

    it('Snapshot Test: Empty', () => {
        const TestComponent = () => (
            <ChatContext.Provider value={{ name: '' }}>
                <LandingPage />
            </ChatContext.Provider>
        )
        const wrapper = shallow(<TestComponent />);
        expect(toJson(wrapper.find(LandingPage).dive())).toMatchSnapshot();
    })
})