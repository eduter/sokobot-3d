import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import game from './game';
import levels from './levels';
import { combineReducers } from 'redux-loop';
import { State } from '../types';


function createRootReducer(history: History) {
  return combineReducers<State, any>({
    game,
    levels,
    router: connectRouter(history)
  });
}


export default createRootReducer;
