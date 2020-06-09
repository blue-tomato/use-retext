import { useState } from 'react';
import get from 'just-safe-get';
import set from 'just-safe-set';
import typeOf from 'just-typeof';
import { assert } from '../helpers';
import { Store } from '../Store';
import extractInternals from './extractInternals';
import createDispatch from './createDispatch';
import registerReducer from './registerReducer';

export type SelectorFunction = (store: Store) => Store;

export default (store: Store, selectorFunction?: SelectorFunction) => {
  assert(typeOf(store) !== 'object', 'Store is not an object');

  const selectedStore = selectorFunction ? selectorFunction(store) : store;
  const [initialState, actions, reducer] = extractInternals(selectedStore);
  const [state, setState] = useState(initialState);
  const [dispatch, emitter] = createDispatch(actions);

  registerReducer(reducer, emitter, ({ reducerFunction, scope, payload }) => {
    setState((currentState: object) => {
      const scopedState = (scope ? get(currentState, scope) : currentState) as object;
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
