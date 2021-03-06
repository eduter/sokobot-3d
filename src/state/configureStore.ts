import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { install, StoreCreator } from 'redux-loop';
import createRootReducer, { State } from './ducks';
import { loadPersistedState, setupStatePersistence } from './localStorage';


const PERSISTENT_SLICES: Array<keyof State> = ['levels', 'settings'];

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?? compose;

function configureStore() {
  const persistedState = loadPersistedState(PERSISTENT_SLICES);
  const history = createBrowserHistory({ basename: 'sokobot-3d' });
  const enhancer = composeEnhancers(
    applyMiddleware(routerMiddleware(history)),
    install()
  );
  const enhancedCreateStore = createStore as StoreCreator;
  const store = enhancedCreateStore(createRootReducer(history), persistedState as State, enhancer);

  setupStatePersistence(store, PERSISTENT_SLICES);

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('./ducks', () => {
        store.replaceReducer(createRootReducer(history) as any);
      });
    }
  }
  return {
    store,
    history
  };
}


export default configureStore;
