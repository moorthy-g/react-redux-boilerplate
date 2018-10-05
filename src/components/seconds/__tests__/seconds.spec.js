import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Seconds } from '../components/seconds';

describe('<Seconds />', () => {
  it('should show seconds prop', () => {
    const wrapper = shallow(<Seconds seconds={10} updateSeconds={() => {}} />);
    expect(wrapper.find('span').text()).toEqual('10');
  });
  it('should match snapshot', () => {
    const output = renderer.create(<Seconds seconds={0} updateSeconds={() => {}} />);
    expect(output).toMatchSnapshot();
  });
});
