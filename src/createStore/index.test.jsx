import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { renderHook, act } from '@testing-library/react-hooks';
import createStore from '.';

const { store } = global;

describe('return', () => {
  it('returns a store and useStore', () => {
    const [Store, useStore] = createStore(store);
    const wrapper = shallow(<Store />);

    expect(useStore).toMatchSnapshot();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe('in application usage', () => {
  it('updates the state', () => {
    const [Store, useStore] = createStore(store);
    const { result } = renderHook(() => useStore(store), { wrapper: Store });

    act(() => {
      result.current[1].setCount(10);
      result.current[1].increment();
      result.current[1].increment();
      result.current[1].decrement();
      result.current[1].sideMenu.toggle();
    });

    expect(result.current[0]).toMatchSnapshot();
  });
});
