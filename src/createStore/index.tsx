import React, { createContext, useContext } from 'react';
import useRetext from '../useRetext';
import { Store } from '../Store';

export default <S extends unknown>(store: Store<S>) => {
  const Context = createContext({});
  const StoreProvider = ({ ...props }) => {
    const { state, dispatch } = useRetext(store);

    return <Context.Provider {...props} value={{ state, dispatch }} />;
  };
  const useStore = () => useContext(Context);

  return [StoreProvider, useStore];
};
