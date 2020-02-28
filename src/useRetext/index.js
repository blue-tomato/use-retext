import { useState } from 'react';
import { get, set } from 'lodash-es';
import { assert } from '../helpers';
import createDispatch from './createDispatch';
import connectReducer from './connectReducer';

export default store => {
  assert(typeof store !== 'object', 'Store is not an object');

  const { state: initialState, action, reducer } = store;

  assert(
    typeof initialState !== 'object' || typeof action !== 'object' || typeof reducer !== 'object',
    'State, action or reducer are not an object',
  );

  const [state, setState] = useState(initialState);
  const [dispatch, emitter] = createDispatch(action);

  connectReducer(reducer, emitter, ({ scope, reducer: reducerFunction, payload }) => {
    setState(currentState => {
      const scopedState = scope ? get(currentState, scope) : currentState;
      const result = reducerFunction(scopedState, payload);
      const newState = scope
        ? set({ ...currentState }, scope, { ...scopedState, ...result })
        : { ...scopedState, ...result };

      return newState;
    });
  });

  return { state, dispatch };
};
