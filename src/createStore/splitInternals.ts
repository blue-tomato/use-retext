import reduce from 'just-reduce-object';
import typeOf from 'just-typeof';
import { Store } from '../Store';

const splitInternals = (store: Store) =>
  reduce(
    store,
    (acc: Array<Record<string, unknown>>, key: string, value: any) => {
      const state = acc[0];
      let actions = acc[1];

      if (value.__action) {
        // Add to actions
        actions = {
          ...actions,
          [key]: value.__action,
        };
      } else if (typeOf(value) === 'object') {
        // Extract inner store
        const [extractedState, extractedActions] = splitInternals(value as Store);

        state[key] = extractedState;

        // Don't add empty objects
        if (Object.keys(extractedActions).length >= 1) {
          actions[key] = extractedActions;
        }
      } else {
        // Add to state
        state[key] = value;
      }

      return [state, actions];
    },
    [{}, {}],
  );

export default splitInternals;
