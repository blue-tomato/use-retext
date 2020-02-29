import React, { createContext, useContext } from 'react';
import useRetext from '../useRetext';
import { Store } from '../Store';

export default <S,>(store: Store<S>) => {
  const Context = createContext({});
  const Store = ({ ...props }) => {
    const { state, dispatch } = useRetext(store);

    return <Context.Provider {...props} value={{ state, dispatch }} />;
  };
  const useStore = () => useContext(Context);

  return [Store, useStore];
};
