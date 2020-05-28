import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { BrowserRouter } from 'react-router-dom';
import ChatConvo from './ChatConvo';

describe('ChatConvo Component', () => {
    it('Smoke Test: Renders Default', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <ChatConvo />
            </BrowserRouter>,
            div);
        ReactDOM.unmountComponentAtNode(div);
    })

    it('Snapshot Test: Default', () => {
        const wrapper = shallow(<ChatConvo />);
        expect(toJson(wrapper)).toMatchSnapshot();
    })
})