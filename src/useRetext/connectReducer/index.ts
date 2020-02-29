import { Emitter } from 'mitt';
import { mapValuesDeep } from '../../helpers';
import { Reducer, ReducerFuntion } from '../../Store';

interface OnCallObject<S> {
  key: string;
  scope: string;
  reducer: ReducerFuntion<S>;
  payload: any;
}

export default <S>(reducer: Reducer<S>, emitter: Emitter, onCall: (event: OnCallObject<S>) => void) => {
  mapValuesDeep(reducer, ({ key, value, scope: reducerScope }) => {
    emitter.on(key, ({ scope: emitterScope, payload }) => {
      // Ensure that the reducer-scope starts at least with the emitter-scope
      if (!reducerScope.startsWith(emitterScope)) return;

      onCall({ key, scope: reducerScope, reducer: value, payload });
    });
  });
};
