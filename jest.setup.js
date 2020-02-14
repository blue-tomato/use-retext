import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.store = {
  // This is our state
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
  // This is what gets disptached
  actions: {
    increment: 0, // Calls all increment reducer
    sideMenu: {
      toggle: 0, // Can only call toggle in or below sideMenu
      increment: 0, // Only calls increment in or below sideMenu
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
