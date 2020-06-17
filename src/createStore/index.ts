import { useEffect, useMemo, useState } from 'react';
import get from 'just-safe-get';
import { Reducer, Store } from '../Store';
import splitInternals from './splitInternals';
import createDispatch from './createDispatch';

interface UpdateInfo {
  scope: string;
  newState: object;
}

const action = (reducer?: Reducer) => ({
  // Create a function so it won't get mapped like an object
  __action: () => reducer,
});

export default (store: Store) => {
  const [initialState, actions] = splitInternals(store);
  const [dispatch, emitter] = createDispatch(initialState, actions);

  return (path?: string) => {
    const [state, setState] = useState(() => (path ? get(initialState, path) : initialState));
    const selectedDispatch = useMemo(() => (path ? get(dispatch, path) : dispatch), [path]);

    useEffect(() => {
      const stateUpdater = ({ newState, scope }: UpdateInfo) => {
        if (path && scope.startsWith(path)) {
          setState(get(newState, path));
        } else {
          setState(newState);
        }
      };

      emitter.on('update', stateUpdater);

      return () => emitter.off('update', stateUpdater);
    }, [path]);

    return { state, dispatch: selectedDispatch };
  };
};
export { action };
