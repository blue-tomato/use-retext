import mitt from 'mitt';
import { mapValuesDeep } from '../helpers';

export default (action: object): [unknown, mitt.Emitter] => {
  const emitter = mitt();
  const dispatch = mapValuesDeep(action, ({ key, scope }) => (payload?: unknown) =>
    emitter.emit(key, { scope, payload }),
  );

  return [dispatch, emitter];
};
