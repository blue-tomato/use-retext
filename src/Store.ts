export interface Action {
  [key: string]: Action | 0;
}

export type ReducerFuntion = ((state: any, payload?: any) => object)

export interface Reducer {
  [key: string]: Reducer | ReducerFuntion;
}

export interface Store {
  state: any,
  action: Action,
  reducer: Reducer,
}
