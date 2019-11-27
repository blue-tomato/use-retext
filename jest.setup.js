import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.store = {
  state: {
    count: 0,
    sideMenu: {
      isOpen: false,
    },
  },
  reducer: {
    increment: state => ({ ...state, count: state.count + 1 }),
    decrement: state => ({ ...state, count: state.count - 1 }),
    setCount: (state, count) => ({ ...state, count }),
    sideMenu: {
      toggle: state => ({ ...state, sideMenu: { isOpen: !state.sideMenu.isOpen } }),
    },
  },
};
