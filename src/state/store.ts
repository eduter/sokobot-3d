import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { install, StoreCreator } from 'redux-loop';
import createRootReducer from './ducks';
import { loadPersistedState, setupStatePersistence } from './localStorage';
import { State } from './types';


const PERSISTENT_SLICES: Array<keyof State> = ['levels'];

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?? compose;

function configureStore() {
  const persistedState = loadPersistedState(PERSISTENT_SLICES);
  const history = createBrowserHistory();
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


export {
  configureStore
};
