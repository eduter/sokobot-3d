import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { install, StoreCreator } from 'redux-loop';
import createRootReducer from './ducks';


const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?? compose;

function configureStore() {
  const history = createBrowserHistory();
  const enhancer = composeEnhancers(
    applyMiddleware(routerMiddleware(history)),
    install()
  );
  const enhancedCreateStore = createStore as StoreCreator;
  const store = enhancedCreateStore(createRootReducer(history), undefined, enhancer);

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
