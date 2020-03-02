import { Emitter } from 'mitt';
import { mapValuesDeep } from '../../helpers';
import { Reducer, ReducerFuntion } from '../../Store';

interface OnCallObject {
  key: string;
  scope: string;
  reducer: ReducerFuntion;
  payload: any;
}

export default (reducer: Reducer, emitter: Emitter, onCall: (event: OnCallObject) => void) => {
  mapValuesDeep(reducer, ({ key, value, scope: reducerScope }) => {
    emitter.on(key, ({ scope: emitterScope, payload }) => {
      // Ensure that the reducer-scope starts at least with the emitter-scope
      if (!reducerScope.startsWith(emitterScope)) return;

      onCall({ key, scope: reducerScope, reducer: value, payload });
    });
  });
};
