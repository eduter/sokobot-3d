import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import game from './game';
import levels from './levels';
import settings from './settings';
import { combineReducers } from 'redux-loop';
import { State } from '../types';


function createRootReducer(history: History) {
  return combineReducers<State, any>({
    game,
    levels,
    settings,
    router: connectRouter(history)
  });
}


export default createRootReducer;
