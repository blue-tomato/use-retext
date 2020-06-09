export type Actions = Record<string, 0>;

export type ReducerFunction = (state: any, payload?: any) => object;

export type Reducer = Record<string, ReducerFunction>;

export interface Store {
  [key: string]: Store | unknown;
  _actions?: Actions;
  _reducer?: Reducer;
}
