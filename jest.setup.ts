import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Store } from './src/Store';

configure({ adapter: new Adapter() });

const store: Store = {
  state: {
    count: 0,
    sideMenu: {
      isOpen: false,
      maxItems: 100,
      child: {
        isExpanded: false,
      },
    },
  },
  action: {
    increment: 0,
    sideMenu: {
      toggle: 0,
      increment: 0,
      child: {
        toggle: 0,
      },
    },
  },
  // This is what sets the new state
  reducer: {
    toggle: () => ({}), // Never gets called
    increment: state => ({ count: state.count + 1 }),
    sideMenu: {
      toggle: state => ({ isOpen: !state.isOpen }), // Can only change state of sideMenu
      increment: state => ({ maxItems: state.maxItems + 1 }),
      child: {
        toggle: state => ({ isExpanded: !state.isExpanded }),
      },
    },
  },
};

global.store = store;
