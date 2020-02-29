export interface Action<S> {
  [key: string]: Action<S> | 0;
}

export type ReducerFuntion<S> = ((state: S, payload?: any) => S)

export interface Reducer<S> {
  [key: string]: Reducer<S> | ReducerFuntion<S>;
}

export interface Store<S> {
  state: S,
  action: Action<S>,
  reducer: Reducer<S>,
}
