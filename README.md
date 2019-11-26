🔐 React useReducer alternative by Blue Tomato.

# Installation
Type `npm install @blue-tomato/use-retext` into your console

# Usage
```jsx
import React from 'react';
import useRetext from '@blue-tomato/use-retext';
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
  const [state, dispatch] = useRetext(store);

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
