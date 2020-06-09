import { FunctionComponent } from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { renderHook, act } from '@testing-library/react-hooks';
import createStore from '.';

const { store } = global;

describe('return', () => {
  it('returns a store and useStore', () => {
    const [Store, useStore] = createStore(store);

    expect(useStore).toMatchSnapshot();
    expect(Store).toMatchSnapshot();
  });
});

describe('in application usage', () => {
  it('updates the state', () => {
    const [Store, useStore] = createStore(store);
    const { result } = renderHook(() => useStore(store), { wrapper: Store as FunctionComponent });

    act(() => {
      result.current.dispatch.increment();
      result.current.dispatch.sideMenu.increment();
      result.current.dispatch.sideMenu.toggle();
    });

    expect(result.current.state).toMatchSnapshot();
  });
});
