🔐 A small, scoped react state managment system using hooks with an simple api.

# Index
*

# Features
* ~1kB gzip, gets checked thanks to [bundlesize](https://github.com/siddharthkp/bundlesize)
* Scoping of state, actions and reducers
* Simple small API
* Usable for big states
* Can be used as hook or a with a provider
* Typescript support

# Installation
Type `npm install use-retext` into your console

# Usage
```jsx
import React from 'react';
import useRetext from 'use-retext';
import SideMenu from './SideMenu';

const store = {
  state: {
    isOpen: false,
    searchTerm: undefined,
  },
  reducer: {
    setSearchTerm: (state, payload) => ({ ...state, searchTerm: payload }),
    sideMenu: {
      toggle: state => ({ ...state, isOpen: !state.open }),
    },
  },
};

export default ({ children, ...props }) => {
  const { state, dispatch } = useRetext(store);

  return (
    <div {...props}>
      <button
        type="button"
        onClick={() => {
          dispatch.setSearchTerm('test');
          dispatch.sideMenu.toggle();
        }}
      >
        Test me!
      </button>
      <SideMenu state={state} />
    </div>
  );
};
```

# Usage with `createStore`
`Store.js`
```js
import { createStore } from 'use-retext';

const store = {
  state: {
    isOpen: false,
    searchTerm: undefined,
  },
  reducer: {
    setSearchTerm: (state, payload) => ({ ...state, searchTerm: payload }),
    sideMenu: {
      toggle: state => ({ ...state, isOpen: !state.open }),
    },
  },
};

const [Store, useStore] = createStore(store);

export default Store;
export { useStore };
```

`Parent.jsx`
```jsx
import React from 'react';
import Store from './Store';
import Child from './Child';

export default ({ ...props }) => (
  <Store {...props}>
    <Child />
  </Store>
);
```

`Child.jsx`
```jsx
import React from 'react';
import { useStore } from './Store';

export default ({ ...props }) => {
  const { state, dispatch } = useStore();

  return (
    <div {...props}>
      <button
        type="button"
        onClick={() => {
          dispatch.setSearchTerm('test');
        }}
      >
        Test me!
      </button>
      <div>Search term: {state.searchTerm}</div>
    </div>
  );
};
```

# Motivation
