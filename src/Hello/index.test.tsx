import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { Hello } from '.';
import '../autocomplete/autocomplete.css';

const props: {text: string} = {
    text: 'Welcome' 
};

describe('Hello', ()=>{
    test('Render text welcome', () => {
        const wrapper = shallow(<Hello {...props} />);
        expect(wrapper.find('h1').text()).toMatch('Welcome');
        const wrap = mount(<Hello {...props} />);
    });
})