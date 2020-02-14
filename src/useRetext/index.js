import { useMemo, useState } from 'react';
import { mapValues } from 'lodash-es';
import { assert, getType } from '../helpers';

const mapActions = actions => {
  mapValues(actions, (value, key) => {
    const type = getType(value);

    type === 'object' && null;

    if (value === 0) {
      return payload => null;
    }
  });
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

  const { state: initialState, actions, reducer } = store;

  assert(
    typeof initialState !== 'object' || typeof actions !== 'object' || typeof reducer !== 'object',
    'State, actions or reducer are not an object',
  );

  const [state, setState] = useState(initialState);
  const dispatch = useMemo(() => mapReducer(reducer, setState), [reducer]);

  return { state, dispatch };
};
