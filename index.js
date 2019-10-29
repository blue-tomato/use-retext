import { useMemo, useState } from 'react';

const mapReducers = (reducers, setState) =>
  Object.entries(reducers).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]:
        typeof value === 'object' ? mapReducers(value, setState) : payload => setState(state => value(state, payload)),
    }),
    {},
  );

export default ({ state: initialState, reducers }) => {
  const [state, setState] = useState(initialState);
  const dispatch = useMemo(() => mapReducers(reducers, setState), [reducers]);

  return [state, dispatch];
};
