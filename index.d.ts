/* eslint-disable */
interface Store {
  state: object,
  reducers: object,
}

type useRetext = <S extends Store>(store: S) => [S['state'], S['reducers']];
type createStore = <S extends Store>(store: S) => [JSX.Element, useRetext]

export default useRetext;
export { createStore };
