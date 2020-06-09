import useRetext, { SelectorFunction } from '../useRetext';
import { Store } from '../Store';

export default (store: Store) => {
  const useStore = (selectorFunction?: SelectorFunction) => {
    if (!selectorFunction) {
      return useRetext(store);
    }

    const selectedStore = selectorFunction(store);

    return useRetext(selectedStore);
  };

  return useStore;
};
