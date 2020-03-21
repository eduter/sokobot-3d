import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import createRootReducer from './ducks';


const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?? compose;

function configureStore() {
  const history = createBrowserHistory();
  const enhancer = composeEnhancers(applyMiddleware(
    routerMiddleware(history)
  ));
  const store = createStore(createRootReducer(history), enhancer);

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('./ducks', () => {
        store.replaceReducer(createRootReducer(history));
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
