import { mapValuesDeep } from '../../helpers';

export default (reducer, emitter, onCall) => {
  mapValuesDeep(reducer, ({ key, value, scope: reducerScope }) => {
    emitter.on(key, ({ scope: emitterScope, payload }) => {
      // Ensure that the reducer-scope starts at least with the emitter-scope
      if (!reducerScope.startsWith(emitterScope)) return;

      onCall({ key, scope: reducerScope, reducer: value, payload });
    });
  });
};
