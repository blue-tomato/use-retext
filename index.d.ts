interface Action<S> {

}

interface Reducer<S> {
  [key: string]: Reducer<S> | ((state: S, payload?: any) => S);
}

export interface Store<S> {
  state: S,
  action: Action<S>,
  reducer: Reducer<S>,
}

interface Return<T> {
  state: Store<T>['state'],
  dispatch: Store<T>['reducer']
}

declare function useRetext<T>(store: Store<T>): Return<T>;
declare function createStore<T>(store: Store<T>): [JSX.Element, () => Return<T>];

export default useRetext;
export { createStore };
