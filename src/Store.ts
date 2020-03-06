type KeysOfType<T, TProp> = { [P in keyof T]: T[P] extends TProp ? P : never }[keyof T];

export type Action<S> =
  | {
      [P in KeysOfType<S, object>]?: Action<S[P]>;
    }
  | {
      [key: string]: 0;
    };

export type ReducerFuntion = (state: any, payload?: any) => object;

export interface Reducer {
  [key: string]: Reducer | ReducerFuntion;
}

export interface Store<S> {
  state: S;
  action: Action<S>;
  reducer: Reducer;
}
