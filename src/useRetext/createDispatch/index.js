import mitt from 'mitt';
import { mapValuesDeep } from '../../helpers';

export default action => {
  const emitter = mitt();
  const dispatch = mapValuesDeep(action, ({ key, scope }) => payload => {
    emitter.emit(key, { scope, payload });
  });

  return [dispatch, emitter];
};
