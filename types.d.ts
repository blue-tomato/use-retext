declare module NodeJS  {
  interface Global<S> {
      store: S
  }
}
