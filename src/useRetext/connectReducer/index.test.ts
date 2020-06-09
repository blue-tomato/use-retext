import mitt from 'mitt';
import connectReducer from '.';

const { store } = global;

describe('connectReducer', () => {
  it('connects reducer with emitter', () => {
    const emitter = mitt();

    connectReducer(store.reducer, emitter, (args) => {
      expect(args).toMatchSnapshot();
    });

    emitter.emit('increment', { scope: '' });
    emitter.emit('toggle', { scope: 'sideMenu' });
    emitter.emit('toggle', { scope: 'sideMenu.child' });
  });
});
