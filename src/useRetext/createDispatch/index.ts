import mitt from 'mitt';
import { mapValuesDeep } from '../../helpers';
import { Action } from '../../Store';

export default (action: Action) => {
  const emitter = mitt();
  const dispatch = mapValuesDeep(action, ({ key, scope }) => (payload: any) => {
    emitter.emit(key, { scope, payload });
  });

  return [dispatch, emitter];
};
