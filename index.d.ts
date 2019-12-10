interface Store {
  state: object,
  reducer: object,
}

type Return<S extends Store> = [S['state'], S['reducer']];

declare function useRetext<S extends Store>(store: S): Return<S>;
declare function createStore<S extends Store>(store: S): [JSX.Element, () => Return<S>]

export default useRetext;
export { createStore };
