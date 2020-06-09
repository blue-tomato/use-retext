import reduce from 'just-reduce-object';
import typeOf from 'just-typeof';
import { Store } from '../Store';

const extractInternals = (store: Store) =>
  reduce(
    store,
    (acc: Array<Record<string, unknown>>, key: string, value: unknown) => {
      const state = acc[0];
      let actions = acc[1];
      let reducer = acc[2];

      if (key === '_actions') {
        // Add to actions
        actions = {
          ...actions,
          ...(value as object),
        };
      } else if (key === '_reducer') {
        // Add to reducer
        reducer = {
          ...reducer,
          ...(value as object),
        };
      } else if (typeOf(value) === 'object') {
        // Extract inner store
        const [extractedState, extractedActions, extractedReducer] = extractInternals(value as Store);

        state[key] = extractedState;

        // Don't add empty objects
        if (Object.keys(extractedActions).length >= 1) {
          actions[key] = extractedActions;
        }
        if (Object.keys(extractedReducer).length >= 1) {
          reducer[key] = extractedReducer;
        }
      } else {
        // Add to state
        state[key] = value;
      }

      return [state, actions, reducer];
    },
    [{}, {}, {}],
  );

export default extractInternals;
