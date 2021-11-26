import  React, {useEffect} from 'react';
import { shallow, mount } from 'enzyme';
import { AutoComplete, ListItem, DefaultDropdownIcon, AutocompleteInterface, Option } from '.';

const data = [
    {
        id: '101',
        value: 'item 1',
        img: 'https://imgcdn.com/user/1',
        secondaryValue: 'secondary value',
    },
    {
        id: '102',
        value: 'item 2',
        img: 'https://imgcdn.com/user/2',
        secondaryValue: 'secondary value',
    },
    {
        id: '103',
        value: 'item 3',
        img: 'https://imgcdn.com/user/3',
        secondaryValue: 'secondary value',
    }
];

const newData = [
    {id: '101', value: 'item 1'},{id: '102', value: 'item 2'},{id: '103', value: 'item 3'},{id: '104', value: 'item 4'}
]

const props: AutocompleteInterface = {
    onkeypress: jest.fn(),
    onblur: jest.fn(),
    onfocus: jest.fn(),
    onclickmore: jest.fn(),
    onSelect: jest.fn(),
    listItems: data,
    maxItem: 10,
    CustomDropdownIcon: <span className="CustomDropdownIcon">🔍</span>
};

// onkeypress: (query: string, delay?: number) => void;
// onblur?: (query: string) => void;
// onfocus?: () => void;
// onclickmore?: (query: string) => void;
// onSelect: (item: Option) => void;
// renderCustomListItem?: (porps: any) => React.ReactElement;

describe('AutoComplete', ()=>{
    
    test('render without default value', () => {
        const wrapper = shallow(<AutoComplete {...props} />);
        expect(wrapper.find('input').props().value).toMatch("");
    });

    test('render with default value', () => {
        const nProps = {...props, defaultValue: 'item 1'};
        const wrapper = shallow(<AutoComplete {...nProps} />);
        expect(wrapper.find('input').props().value).toMatch('item 1');
    });

    test('fires onFocus event with dropdown items', () => {
        const wrapper = shallow(<AutoComplete {...props} />);
        wrapper.find('input').simulate('focus');
        expect(wrapper.find('.listContainer')).toHaveLength(1);
        expect(wrapper.find('.listContainer').children()).toHaveLength(3);
    });
    
    test('click one from dropdown items', () => {
        const nProps = {...props, defaultValue: 'item 1'}
        const wrapper = shallow(<AutoComplete {...nProps} />);
        wrapper.find('input').simulate('focus');
        expect(wrapper.find('.listContainer')).toHaveLength(1);
        expect(wrapper.find('.listContainer').children()).toHaveLength(3);
        wrapper.find('.listContainer').children().at(1).simulate('click');
        expect(props.onSelect).toHaveBeenLastCalledWith(data[1]);
        expect(wrapper.find('input').props().value).toMatch(data[1].value);
    });

    test('fires onblur event with input value', () => {
        const nProps = {...props, defaultValue: 'item 1'}
        const wrapper = shallow(<AutoComplete {...nProps} />);
        wrapper.find('input').simulate('blur');
        expect(props.onblur).toHaveBeenLastCalledWith('item 1');
    });

    test('fires onkeypress event', () => {
        const wrapper = shallow(<AutoComplete {...props} />);
        wrapper.find('input').simulate('change', {target: {value: 'it'}});
        expect(props.onkeypress).toHaveBeenLastCalledWith('it');
    });

    test('renders DefaultDropdownIcon when no icon provided', () => {
        const onDropdownIconClick = jest.fn();
        const nProps = {...props, showDropdownIcon: true};
        delete nProps.CustomDropdownIcon;
        const wrapper = shallow(<AutoComplete {...nProps} />);
        wrapper.find('input').simulate('focus');
        expect(wrapper.find('DefaultDropdownIcon')).toHaveLength(1);
        wrapper.find('DefaultDropdownIcon').simulate('click');

    });

    test('renders CustomDropdownIcon when icon provided', () => {
        const wrapper = shallow(<AutoComplete {...props} />);
        expect(wrapper.find('.CustomDropdownIcon')).toHaveLength(1);
    });

    test('renders more link and trigger click event', () => {
        const onClickMoreLink = jest.fn()
        const nProps = {...props, listItems: newData, maxItem: 2};
        const wrapper = shallow(<AutoComplete {...nProps} />);
        wrapper.find('input').simulate('focus');
        expect(wrapper.find('ListItem')).toHaveLength(2);
        expect(wrapper.find('.CustomDropdownIcon')).toHaveLength(1);
    });

    test('onClickMoreLink click event', () => {
        const onClickMoreLink = jest.fn()
        const nProps = {...props, listItems: newData, maxItem: 2};
        const wrapper = shallow(<AutoComplete {...nProps} />);
        wrapper.find('input').simulate('focus');
        wrapper.find('.more-link').simulate('click');

        delete nProps.onclickmore;
        const wrapper1 = shallow(<AutoComplete {...nProps} />);
        wrapper1.find('input').simulate('focus');
        wrapper1.find('.more-link').simulate('click');
        // console.log(wrapper.props());
        // expect(onClickMoreLink).toHaveBeenCalledTimes(1);
    });

    test('renders 2 max list items', () => {
        const nProps = {...props, listItems: newData, maxItem: 2};
        const wrapper = shallow(<AutoComplete {...nProps} />);
        wrapper.find('input').simulate('focus');
        expect(wrapper.find('ListItem')).toHaveLength(2);
    });

    test('renders custom list items', () => {
        const nProps = {...props, listItems: newData, maxItem: 2, renderCustomListItem: jest.fn()};
        const wrapper = shallow(<AutoComplete {...nProps} />);
        wrapper.find('input').simulate('focus');
        expect(nProps.renderCustomListItem).toHaveBeenCalledTimes(2);
    });

    

    test('ListItem renders with vlaue', () => {
        const wrapper = shallow(<ListItem item={data[0]} />);
        expect(wrapper.find('.listitem').text()).toMatch(data[0].value)
    });

    
    test('DefaultDropdownIcon COmponent renders and onDropdownIconClick called onClick', () => {
        const nProps = {
            onDropdownIconClick: jest.fn()
        } 
        const wrapper = shallow(<DefaultDropdownIcon {...nProps} />);
        expect(wrapper.find('svg')).toHaveLength(1)

        wrapper.simulate('click');
        expect(nProps.onDropdownIconClick).toHaveBeenCalledTimes(1);
    });

})

// expect(wrapper.find('input').props().id).toEqual(document.activeElement.id)