import { Direction } from '../../../utils/directionHelpers';
import { State } from './types';
import { DeepReadonly } from 'utility-types';


function getRobotPosition(state: State): DeepReadonly<[number, number]> {
  if (!state) {
    throw Error("Trying to get robot's position before starting a game.");
  }
  return state.robot.position;
}

function getRobotDirection(state: State): Direction {
  if (!state) {
    throw Error("Trying to get robot's direction before starting a game.");
  }
  return state.robot.direction;
}


export {
  getRobotPosition,
  getRobotDirection
};
