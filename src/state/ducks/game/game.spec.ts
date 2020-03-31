import { Direction } from '../../../utils/directionHelpers';
import * as actions from './actions';
import gameReducer from './reducer';
import { State } from './types';


const empty3x3Map: State = {
  height: 3,
  width: 3,
  targets: [],
  tiles: [
    [{ height: 1, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }],
    [{ height: 1, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }],
    [{ height: 1, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }]
  ],
  robot: {
    position: [1, 1],
    direction: Direction.NORTH
  }
};

describe('gameReducer', () => {

  it('initializes the map, when a game starts', () => {
    expect(gameReducer(null, actions.startGame(empty3x3Map))).toEqual(empty3x3Map);
  });

  it('turns robot left and right', () => {
    expect(gameReducer(
      { ...empty3x3Map, robot: { position: [1, 1], direction: Direction.NORTH } },
      actions.turnLeft()
    )).toEqual(
      { ...empty3x3Map, robot: { position: [1, 1], direction: Direction.WEST } }
    );

    expect(gameReducer(
      { ...empty3x3Map, robot: { position: [1, 1], direction: Direction.EAST } },
      actions.turnRight()
    )).toEqual(
      { ...empty3x3Map, robot: { position: [1, 1], direction: Direction.SOUTH } }
    );
  });

  it('allows robot to move forward, when there are no obstacles', () => {
    // Facing North
    expect(gameReducer(
      { ...empty3x3Map, robot: { position: [1, 1], direction: Direction.NORTH } },
      actions.moveForward()
    )).toEqual(
      { ...empty3x3Map, robot: { position: [1, 2], direction: Direction.NORTH } }
    );

    // Facing East
    expect(gameReducer(
      { ...empty3x3Map, robot: { position: [1, 1], direction: Direction.EAST } },
      actions.moveForward()
    )).toEqual(
      { ...empty3x3Map, robot: { position: [2, 1], direction: Direction.EAST } }
    );

    // Facing South
    expect(gameReducer(
      { ...empty3x3Map, robot: { position: [1, 1], direction: Direction.SOUTH } },
      actions.moveForward()
    )).toEqual(
      { ...empty3x3Map, robot: { position: [1, 0], direction: Direction.SOUTH } }
    );

    // Facing West
    expect(gameReducer(
      { ...empty3x3Map, robot: { position: [1, 1], direction: Direction.WEST } },
      actions.moveForward()
    )).toEqual(
      { ...empty3x3Map, robot: { position: [0, 1], direction: Direction.WEST } }
    );
  });

  it('allows robot to move backwards, when there are no obstacles', () => {
    // Facing North
    expect(gameReducer(
      { ...empty3x3Map, robot: { position: [1, 1], direction: Direction.NORTH } },
      actions.moveBackward()
    )).toEqual(
      { ...empty3x3Map, robot: { position: [1, 0], direction: Direction.NORTH } }
    );

    // Facing East
    expect(gameReducer(
      { ...empty3x3Map, robot: { position: [1, 1], direction: Direction.EAST } },
      actions.moveBackward()
    )).toEqual(
      { ...empty3x3Map, robot: { position: [0, 1], direction: Direction.EAST } }
    );

    // Facing South
    expect(gameReducer(
      { ...empty3x3Map, robot: { position: [1, 1], direction: Direction.SOUTH } },
      actions.moveBackward()
    )).toEqual(
      { ...empty3x3Map, robot: { position: [1, 2], direction: Direction.SOUTH } }
    );

    // Facing West
    expect(gameReducer(
      { ...empty3x3Map, robot: { position: [1, 1], direction: Direction.WEST } },
      actions.moveBackward()
    )).toEqual(
      { ...empty3x3Map, robot: { position: [2, 1], direction: Direction.WEST } }
    );
  });

  it('ignores unknown actions', () => {
    const stateBefore = empty3x3Map;
    const action = { type: 'any unknown action' };
    const stateAfter = gameReducer(stateBefore, action as any);

    expect(stateAfter).toBe(stateBefore);
  });

});
