import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import game from './game';
import levels from './levels';


function createRootReducer(history: History) {
  return combineReducers({
    game,
    levels,
    router: connectRouter(history)
  });
}


export default createRootReducer;
