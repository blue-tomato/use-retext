import createDispatch from '.';

const { store } = global;

describe('createDispatch', () => {
  it('dispatch works', () => {
    const [dispatch, emitter] = createDispatch(store.action);
    const test = ({ scope, payload }) => expect({ scope, payload }).toMatchSnapshot();

    emitter.on('increment', test);
    emitter.on('toggle', test);
    emitter.on('setOpen', test);

    dispatch.increment();
    dispatch.sideMenu.increment();
    dispatch.sideMenu.toggle();
    dispatch.sideMenu.child.toggle();
  });
});
