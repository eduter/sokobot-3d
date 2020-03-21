import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';


function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history)
  });
}


export default createRootReducer;
