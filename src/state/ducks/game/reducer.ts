import { move, oppositeDirection, rotateLeft, rotateRight } from '../../../utils/directionHelpers';
import { assertNever } from '../../../utils/types';
import { Action } from './actions';
import { ActionTypes, State } from './types';


const INITIAL_STATE: State = null;

function gameReducer(state: State = INITIAL_STATE, action: Action): State {
  if (action.type === ActionTypes.START_GAME) {
    return action.payload;
  } else if (state) {
    switch (action.type) {
      case ActionTypes.MOVE_FORWARD:
        return {
          ...state,
          robot: {
            position: move(state.robot.position, state.robot.direction),
            direction: state.robot.direction
          }
        };
      case ActionTypes.MOVE_BACKWARD:
        return {
          ...state,
          robot: {
            position: move(state.robot.position, oppositeDirection(state.robot.direction)),
            direction: state.robot.direction
          }
        };
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


export default gameReducer;
