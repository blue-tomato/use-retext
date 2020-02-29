import { renderHook, act } from '@testing-library/react-hooks';
import useRetext from '.';

const getHook = store => renderHook(() => useRetext(store));
const { store } = global;

describe('store argument', () => {
  it('throws an error when no object is passed', () => {
    const { result } = getHook();

    expect(result.error).toMatchSnapshot();
  });

  it('throws an error when no state is passed', () => {
    const { result } = getHook({ action: {}, reducer: {} });

    expect(result.error).toMatchSnapshot();
  });

  it('throws an error when no reducer is passed', () => {
    const { result } = getHook({ state: {}, action: {} });

    expect(result.error).toMatchSnapshot();
  });

  it('throws an error when no action is passed', () => {
    const { result } = getHook({ state: {}, reducer: {} });

    expect(result.error).toMatchSnapshot();
  });
});

describe('return', () => {
  it('keeps the initial state', () => {
    const { result } = getHook(store);
    const { state } = result.current;

    expect(state).toMatchSnapshot();
  });

  it('creates a disptach object', () => {
    const { result } = getHook(store);
    const { dispatch } = result.current;

    expect(dispatch).toMatchSnapshot();
  });
});

describe('in application usage', () => {
  it('increments state', () => {
    const { result } = getHook(store);

    act(() => {
      result.current.dispatch.increment();
      result.current.dispatch.sideMenu.increment();
    });

    expect(result.current.state.count).toEqual(1);
    expect(result.current.state.sideMenu.maxItems).toEqual(102);
  });

  it('toggles state', () => {
    const { result } = getHook(store);

    act(() => {
      result.current.dispatch.sideMenu.toggle();
    });

    expect(result.current.state.sideMenu.isOpen).toEqual(true);
    expect(result.current.state.sideMenu.child.isExpanded).toEqual(true);
  });
});
