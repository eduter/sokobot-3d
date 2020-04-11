import { Cmd, loop } from 'redux-loop';
import {
  Direction,
  move as getNeighbor,
  oppositeDirection,
  rotateLeft,
  rotateRight
} from '../../../mechanics/directions';
import getRelevantTiles from '../../../mechanics/getRelevantTiles';
import isLevelCleared from '../../../mechanics/isLevelCleared';
import isMoveValid from '../../../mechanics/isMoveValid';
import pushObjects from '../../../mechanics/pushObjects';
import { LevelMap } from '../../../mechanics/types';
import { assertNever, Reducer } from '../../../utils/types';
import { levelsActions } from '../levels';
import { finishLevel, GameAction, move } from './actions';
import { ActionTypes, State } from './types';


const INITIAL_STATE: State = {
  finished: false
};

type TriggeredAction = GameAction | ReturnType<typeof levelsActions.clearLevel>;

const gameReducer: Reducer<State, GameAction, TriggeredAction> = (state = INITIAL_STATE, action) => {
  if (action.type === ActionTypes.START_LEVEL) {
    return {
      finished: false,
      ...action.payload
    };
  } else if (state.map) {
    switch (action.type) {
      case ActionTypes.MOVE_FORWARD: {
        const direction = state.map.robot.direction;

        if (canMove(state.map, direction)) {
          return loop(state, Cmd.action(move(direction)));
        }
        return state;
      }
      case ActionTypes.MOVE_BACKWARD: {
        const direction = oppositeDirection(state.map.robot.direction);

        if (canMove(state.map, direction)) {
          return loop(state, Cmd.action(move(direction)));
        }
        return state;
      }
      case ActionTypes.TURN_RIGHT:
        return {
          ...state,
          map: {
            ...state.map,
            robot: {
              position: state.map.robot.position,
              direction: rotateRight(state.map.robot.direction)
            }
          }
        };
      case ActionTypes.TURN_LEFT:
        return {
          ...state,
          map: {
            ...state.map,
            robot: {
              position: state.map.robot.position,
              direction: rotateLeft(state.map.robot.direction)
            }
          }
        };
      case ActionTypes.MOVE:
        const newState = {
          ...state,
          map: {
            ...state.map,
            tiles: pushObjects(state.map.tiles, state.map.robot.position, action.payload),
            robot: {
              position: getNeighbor(state.map.robot.position, action.payload),
              direction: state.map.robot.direction
            }
          }
        };
        if (isLevelCleared(newState.map)) {
          return loop(newState, Cmd.action(finishLevel()));
        }
        return newState;
      case ActionTypes.FINISH_LEVEL:
        return loop(
          { ...state, finished: true },
          Cmd.action(levelsActions.clearLevel())
        );
      default:
        assertNever(action);
        return state;
    }
  } else {
    return state;
  }
};

function canMove(state: LevelMap, direction: Direction) {
  const relevantTiles = getRelevantTiles(state.tiles, state.robot.position, direction);
  return isMoveValid(...relevantTiles);
}


export default gameReducer;
export { INITIAL_STATE };
