import { renderHook, act } from '@testing-library/react-hooks';
import useRetext from '.';

const getHook = store => renderHook(() => useRetext(store));
const defaultStore = {
  state: {
    count: 0,
    sideMenu: {
      isOpen: false,
    },
  },
  reducer: {
    increment: state => ({ ...state, count: state.count + 1 }),
    decrement: state => ({ ...state, count: state.count - 1 }),
    setCount: (state, count) => ({ ...state, count }),
    sideMenu: {
      toggle: state => ({ ...state, sideMenu: { isOpen: !state.sideMenu.isOpen } }),
    },
  },
};

describe('store argument', () => {
  it('throws an error when no object is passed', () => {
    const { result } = getHook();

    expect(result.error).toEqual(Error('Store is not an object'));
  });

  const storeEmptyError = Error('State or reducer are not an object');

  it('throws an error when no state is passed', () => {
    const { result } = getHook({ reducer: {} });

    expect(result.error).toEqual(storeEmptyError);
  });

  it('throws an error when no reducer is passed', () => {
    const { result } = getHook({ state: {} });

    expect(result.error).toEqual(storeEmptyError);
  });
});

describe('return', () => {
  it('keeps the initial state', () => {
    const { result } = getHook(defaultStore);
    const [state] = result.current;

    expect(state).toEqual(defaultStore.state);
  });

  it('creates a disptach object', () => {
    const { result } = getHook(defaultStore);
    const [, dispatch] = result.current;

    expect(typeof dispatch).toEqual('object');
    expect(typeof dispatch.increment).toEqual('function');
    expect(typeof dispatch.sideMenu).toEqual('object');
    expect(typeof dispatch.sideMenu.toggle).toEqual('function');
  });
});

describe('in application usage', () => {
  it('tests the count', () => {
    const { result } = getHook(defaultStore);

    act(() => {
      result.current[1].setCount(3);
      result.current[1].increment();
      result.current[1].increment();
      result.current[1].decrement();
    });

    expect(result.current[0].count).toEqual(4);
  });

  it('tests the sideMenu', () => {
    const { result } = getHook(defaultStore);

    act(() => {
      result.current[1].sideMenu.toggle();
    });

    expect(result.current[0].sideMenu.isOpen).toEqual(true);
  });
});
