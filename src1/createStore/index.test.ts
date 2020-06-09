import { act, renderHook } from '@testing-library/react-hooks';
import createStore from '.';

const useStore = createStore({
  count: 1,
  _actions: {
    increment: 0,
    setCount: 0,
  },
  _reducer: {
    increment: (state: { count: number }) => ({ count: state.count + 1 }),
    setCount: (state: { count: number }, count: number) => ({ count }),
  },
  sideMenu: {
    isOpen: false,
    maxItems: 100,
    _actions: {
      toggle: 0,
      increment: 0,
    },
    _reducer: {
      toggle: (state: { isOpen: boolean }) => ({ isOpen: !state.isOpen }),
      increment: (state: { maxItems: number }) => ({ maxItems: state.maxItems + 1 }),
    },
    child: {
      isExpanded: false,
      _reducer: {
        toggle: (state: { isExpanded: boolean }) => ({ isExpanded: !state.isExpanded }),
      },
    },
  },
});

it('changes the state', () => {
  const { result } = renderHook(() => useStore());
  const { dispatch } = result.current as any;

  act(() => {
    dispatch.increment();
  });

  console.log(result.current.state);

  expect(true).toBeTruthy();
});
