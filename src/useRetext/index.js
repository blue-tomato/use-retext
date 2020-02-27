import { useMemo, useState } from 'react';
import { get } from 'lodash-es';
import { assert } from '../helpers';
import createDisptach from './createDispatch';
import connectReducer from './connectReducer';

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

  const { state: initialState, action, reducer } = store;

  assert(
    typeof initialState !== 'object' || typeof action !== 'object' || typeof reducer !== 'object',
    'State, action or reducer are not an object',
  );

  const [state, setState] = useState(initialState);
  const [disptach, emitter] = createDisptach(action);

  connectReducer(reducer, emitter, ({ scope, reducer: reducerFunction, payload }) => {
    // reducerFunction(get(state, scope), payload);
  });

  const dispatch = useMemo(() => mapReducer(reducer, setState), [reducer]);

  return { state, dispatch };
};
