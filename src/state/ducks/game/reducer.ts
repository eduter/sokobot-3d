import { move, oppositeDirection, Point2D, rotateLeft, rotateRight } from '../../../utils/directionHelpers';
import { assertNever } from '../../../utils/types';
import { Action } from './actions';
import { ActionTypes, LevelMap, State } from './types';


const INITIAL_STATE: State = null;

function gameReducer(state: State = INITIAL_STATE, action: Action): State {
  if (action.type === ActionTypes.START_GAME) {
    return action.payload;
  } else if (state) {
    switch (action.type) {
      case ActionTypes.MOVE_FORWARD: {
        const newPosition = move(state.robot.position, state.robot.direction);

        if (isValidTile(state, newPosition) && heightDifference(state, state.robot.position, newPosition) <= 0) {
          return {
            ...state,
            robot: {
              position: newPosition,
              direction: state.robot.direction
            }
          };
        }
        return state;
      }
      case ActionTypes.MOVE_BACKWARD:
        const newPosition = move(state.robot.position, oppositeDirection(state.robot.direction));

        if (isValidTile(state, newPosition) && heightDifference(state, state.robot.position, newPosition) <= 0) {
          return {
            ...state,
            robot: {
              position: newPosition,
              direction: state.robot.direction
            }
          };
        }
        return state;
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

function isValidTile(map: LevelMap, [x, y]: Point2D) {
  return map.tiles[x] && map.tiles[x][y] && map.tiles[x][y].height > 0;
}

function heightDifference(map: LevelMap, origin: Point2D, destination: Point2D) {
  const [ox, oy] = origin;
  const [dx, dy] = destination;
  const originTile = map.tiles[ox][oy];
  const destTile = map.tiles[dx][dy];

  return destTile.height + destTile.objects.length - (originTile.height + originTile.objects.length);
}


export default gameReducer;
