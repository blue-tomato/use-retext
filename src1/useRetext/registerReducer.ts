import mitt from 'mitt';
import { mapValuesDeep } from '../helpers';
import { ReducerFunction } from '../Store';

interface OnCallEvent {
  key: string;
  scope: string;
  reducerFunction: ReducerFunction;
  payload?: unknown;
}

export default (reducer: object, emitter: mitt.Emitter, onCall: (event: OnCallEvent) => void) => {
  mapValuesDeep(reducer, ({ key, value, scope: reducerScope }) => {
    // Reducer listen to emitter
    emitter.on(key, ({ scope: emitterScope, payload }) => {
      // Ensure that the reducer-scope starts at least with the emitter-scope
      if (!reducerScope.startsWith(emitterScope)) return;

      onCall({
        key,
        scope: reducerScope,
        reducerFunction: value as ReducerFunction,
        payload,
      });
    });
  });
};
