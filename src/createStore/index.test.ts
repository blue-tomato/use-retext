import { act, renderHook } from '@testing-library/react-hooks';
import createStore, { action } from '.';

const useRetext = createStore({
  count: 1,

  increment: action((state: { count: number }) => ({ count: state.count + 1 })),
  setCount: action((state: { count: number }, count: number) => ({ count })),

  sideMenu: {
    isOpen: false,
    maxItems: 100,

    toggle: action((state: { isOpen: boolean }) => ({ isOpen: !state.isOpen })),
    increment: action((state: { maxItems: number }) => ({ maxItems: state.maxItems + 1 })),

    child: {
      isExpanded: false,

      toggle: action((state: { isExpanded: boolean }) => ({ isExpanded: !state.isExpanded })),
    },
  },
});

it('a', () => {
  const { result } = renderHook(useRetext);

  act(() => {
    result.current.dispatch.setCount(100);
    result.current.dispatch.increment();
    result.current.dispatch.sideMenu.increment();
  });

  console.log(result.current.state);

  expect(true).toBeTruthy();
});

it('b', () => {
  const { result: result1 } = renderHook(useRetext);
  const { result } = renderHook(() => useRetext('sideMenu'));

  act(() => {
    result1.current.dispatch.increment();
    result.current.dispatch.increment();
    result.current.dispatch.toggle();
  });

  console.log(result1.current.state);
  console.log(result.current.state);

  expect(true).toBeTruthy();
});
