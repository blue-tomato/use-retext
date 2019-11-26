import { useMemo, useState } from 'react';

const assert = (condition, message) => {
  if (condition) throw new Error(message);
};

const mapReducer = (reducer, setState) =>
  Object.entries(reducer).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]:
        typeof value === 'object' ? mapReducer(value, setState) : payload => setState(state => value(state, payload)),
    }),
    {},
  );

export default store => {
  assert(typeof store !== 'object', 'Store is not an object');

  const { state: initialState, reducer } = store;

  assert(typeof initialState !== 'object' || typeof reducer !== 'object', 'State or reducer are not an object');

  const [state, setState] = useState(initialState);
  const dispatch = useMemo(() => mapReducer(reducer, setState), [reducer]);

  return [state, dispatch];
};
