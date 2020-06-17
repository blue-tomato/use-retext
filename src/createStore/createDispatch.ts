import get from 'just-safe-get';
import set from 'just-safe-set';
import mitt from 'mitt';
import { mapValuesDeep } from '../helpers';
import { Reducer } from '../Store';

interface ReducerInfo {
  scope: string;
  reducer: Reducer;
}

export default (initialState: {}, actions: {}): [any, mitt.Emitter] => {
  const groupedReducer: Record<string, Array<ReducerInfo>> = {};
  const emitter = mitt();
  let currentState = initialState;

  return [
    mapValuesDeep(actions, ({ key, value, scope: actionScope }) => {
      if (!groupedReducer[key]) {
        groupedReducer[key] = [];
      }

      groupedReducer[key].push({
        scope: actionScope,
        reducer: (value as Function)(),
      });

      return (payload?: unknown) => {
        groupedReducer[key].forEach(({ scope, reducer }: ReducerInfo) => {
          // Ensure that the scope starts at least with the action-scope
          if (!scope.startsWith(actionScope)) return;

          const state = scope ? get(currentState, scope) : currentState;
          const newState = reducer(state, payload);

          if (scope) {
            set(currentState, scope, {
              ...get(currentState, scope),
              ...newState,
            });
          } else {
            currentState = {
              ...currentState,
              ...newState,
            };
          }
        });

        emitter.emit('update', {
          newState: currentState,
          scope: actionScope,
        });

        // return currentState;
      };
    }),
    emitter,
  ];
};
