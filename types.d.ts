import { Store } from './src/Store';

declare global {
  namespace NodeJS {
    interface Global {
      store: Store;
    }
  }
}
