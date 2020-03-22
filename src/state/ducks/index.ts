import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import levels from './levels';


function createRootReducer(history: History) {
  return combineReducers({
    levels,
    router: connectRouter(history)
  });
}


export default createRootReducer;
