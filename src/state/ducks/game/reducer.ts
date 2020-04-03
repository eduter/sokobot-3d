import { Direction, move, oppositeDirection, rotateLeft, rotateRight } from '../../../mechanics/directions';
import getRelevantTiles from '../../../mechanics/getRelevantTiles';
import isMoveValid from '../../../mechanics/isMoveValid';
import pushObjects from '../../../mechanics/pushObjects';
import { LevelMap } from '../../../mechanics/types';
import { assertNever } from '../../../utils/types';
import { Action } from './actions';
import { ActionTypes, State } from './types';


const INITIAL_STATE: State = null;

function gameReducer(state: State = INITIAL_STATE, action: Action): State {
  if (action.type === ActionTypes.START_GAME) {
    return action.payload;
  } else if (state) {
    switch (action.type) {
      case ActionTypes.MOVE_FORWARD: {
        const direction = state.robot.direction;

        if (canMove(state, direction)) {
          return {
            ...state,
            tiles: pushObjects(state.tiles, state.robot.position, direction),
            robot: {
              position: move(state.robot.position, direction),
              direction: state.robot.direction
            }
          };
        }
        return state;
      }
      case ActionTypes.MOVE_BACKWARD: {
        const direction = oppositeDirection(state.robot.direction);

        if (canMove(state, direction)) {
          return {
            ...state,
            tiles: pushObjects(state.tiles, state.robot.position, direction),
            robot: {
              position: move(state.robot.position, direction),
              direction: state.robot.direction
            }
          };
        }
        return state;
      }
      case ActionTypes.TURN_RIGHT:
        return {
          ...state,
          robot: {
            position: state.robot.position,
            direction: rotateRight(state.robot.direction)
          }
        };
      case ActionTypes.TURN_LEFT:
        return {
          ...state,
          robot: {
            position: state.robot.position,
            direction: rotateLeft(state.robot.direction)
          }
        };
      default:
        assertNever(action.type);
        return state;
    }
  } else {
    return state;
  }
}

function canMove(state: LevelMap, direction: Direction) {
  const relevantTiles = getRelevantTiles(state.tiles, state.robot.position, direction);
  return isMoveValid(...relevantTiles);
}


export default gameReducer;
