import { useState } from 'react';
import get from 'just-safe-get';
import set from 'just-safe-set';
import { assert } from '../helpers';
import createDispatch from './createDispatch';
import connectReducer from './connectReducer';
import { Store } from '../Store';

export default (store: Store) => {
  assert(typeof store !== 'object', 'Store is not an object');

  const { state: initialState, action, reducer } = store;

  assert(
    typeof initialState !== 'object' || typeof action !== 'object' || typeof reducer !== 'object',
    'State, action or reducer are not an object',
  );

  const [state, setState] = useState(initialState);
  const [dispatch, emitter] = createDispatch(action);

  connectReducer(reducer, emitter, ({ scope, reducer: reducerFunction, payload }) => {
    setState((currentState: any) => {
      const scopedState = scope ? get(currentState, scope) : currentState;
      const result = reducerFunction(scopedState, payload);
      let newState = { ...currentState };

      if (scope) {
        set(newState, scope, { ...scopedState, ...result });
      } else {
        newState = { ...scopedState, ...result };
      }

      return newState;
    });
  });

  return { state, dispatch };
};
