import { Cmd, loop } from 'redux-loop';
import { Direction } from '../../../mechanics/directions';
import isMoveValid from '../../../mechanics/isMoveValid';
import { LevelMap } from '../../../mechanics/types';
import { levelsActions } from '../levels';
import * as actions from './actions';
import gameReducer, { INITIAL_STATE } from './reducer';
import { State } from './types';


jest.mock('../../../mechanics/isMoveValid');

const simpleMap: LevelMap = {
  width: 1,
  height: 3,
  tiles: [
    [{ height: 1, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }]
  ],
  targets: [],
  robot: {
    position: [0, 0],
    direction: Direction.NORTH
  }
};
const baseState: State = {
  finished: false,
  map: simpleMap
};

describe('gameReducer', () => {

  it('correctly initializes the state', () => {
    const action = { type: 'any unknown action' };
    expect(gameReducer(undefined, action as any)).toBe(INITIAL_STATE);
  });

  it('initializes the map, when a game (level) starts', () => {
    const stateBefore: State = {
      finished: true,
      map: {
        ...simpleMap,
        targets: [[0, 0], [0, 2]]
      }
    };
    const expectedStateAfter: State = {
      finished: false,
      map: simpleMap
    };
    expect(gameReducer(stateBefore, actions.startLevel(simpleMap))).toEqual(expectedStateAfter);
  });

  it('ignores all actions except START_LEVEL, before a map is selected', () => {
    const stateBefore: State = { finished: false };

    expect(gameReducer(stateBefore, actions.turnRight())).toBe(stateBefore);
    expect(gameReducer(stateBefore, actions.turnLeft())).toBe(stateBefore);
    expect(gameReducer(stateBefore, actions.moveForward())).toBe(stateBefore);
    expect(gameReducer(stateBefore, actions.moveBackward())).toBe(stateBefore);
    expect(gameReducer(stateBefore, actions.move(Direction.NORTH))).toBe(stateBefore);
    expect(gameReducer(stateBefore, actions.finishLevel())).toBe(stateBefore);
  });

  it('turns robot left and right', () => {
    expect(gameReducer(
      { ...baseState, map: { ...simpleMap, robot: { position: [0, 0], direction: Direction.NORTH } } },
      actions.turnLeft()
    )).toEqual(
      { ...baseState, map: { ...simpleMap, robot: { position: [0, 0], direction: Direction.WEST } } }
    );

    expect(gameReducer(
      { ...baseState, map: { ...simpleMap, robot: { position: [0, 0], direction: Direction.EAST } } },
      actions.turnRight()
    )).toEqual(
      { ...baseState, map: { ...simpleMap, robot: { position: [0, 0], direction: Direction.SOUTH } } }
    );
  });

  it('schedules a MOVE action in response to a MOVE_FORWARD action, iff the move is valid', () => {
    (isMoveValid as jest.Mock).mockReturnValueOnce(true);
    expect(
      gameReducer(baseState, actions.moveForward())
    ).toEqual(
      loop(baseState, Cmd.action(actions.move(Direction.NORTH)))
    );

    (isMoveValid as jest.Mock).mockReturnValueOnce(false);
    expect(
      gameReducer(baseState, actions.moveForward())
    ).toEqual(
      baseState
    );
  });

  it('schedules a MOVE action in response to a MOVE_BACKWARD action, iff the move is valid', () => {
    (isMoveValid as jest.Mock).mockReturnValueOnce(true);
    expect(
      gameReducer(baseState, actions.moveBackward())
    ).toEqual(
      loop(baseState, Cmd.action(actions.move(Direction.SOUTH)))
    );

    (isMoveValid as jest.Mock).mockReturnValueOnce(false);
    expect(
      gameReducer(baseState, actions.moveBackward()
      )).toEqual(
        baseState
    );
  });

  it('updates robot position, when it moves', () => {
    const mapBefore: LevelMap = {
      ...simpleMap,
      targets: [[0, 0]],
      robot: {
        ...simpleMap.robot,
        position: [0, 0]
      }
    };
    const mapAfter: LevelMap = {
      ...mapBefore,
      robot: {
        ...mapBefore.robot,
        position: [0, 1]
      }
    };
    expect(
      gameReducer({ ...baseState, map: mapBefore }, actions.move(Direction.NORTH))
    ).toEqual(
      { ...baseState, map: mapAfter }
    );
  });

  it('updates boxes\' positions, when robot MOVEs', () => {
    const mapBefore: LevelMap = {
      ...simpleMap,
      tiles: [
        [{ height: 1, objects: [] }, { height: 1, objects: [{ type: 'box'}] }, { height: 1, objects: [] }]
      ],
      robot: {
        ...simpleMap.robot,
        position: [0, 0]
      }
    };
    const mapAfter: LevelMap = {
      ...mapBefore,
      tiles: [
        [{ height: 1, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [{ type: 'box' }] }]
      ],
      robot: {
        ...mapBefore.robot,
        position: [0, 1]
      }
    };
    expect(
      gameReducer({ ...baseState, map: mapBefore }, actions.move(Direction.NORTH))
    ).toEqual(
      { ...baseState, map: mapAfter }
    );
  });

  it('triggers a FINISH_LEVEL action, when a MOVE clears the level', () => {
    const mapBefore: LevelMap = {
      width: 1,
      height: 3,
      tiles: [
        [{ height: 1, objects: [] }, { height: 1, objects: [{ type: 'box'}] }, { height: 1, objects: [] }]
      ],
      targets: [[0, 2]],
      robot: {
        position: [0, 0],
        direction: Direction.NORTH
      }
    };
    const mapAfter: LevelMap = {
      ...mapBefore,
      tiles: [
        [{ height: 1, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [{ type: 'box' }] }]
      ],
      robot: {
        ...mapBefore.robot,
        position: [0, 1]
      }
    };
    expect(
      gameReducer({ ...baseState, map: mapBefore }, actions.move(Direction.NORTH))
    ).toEqual(
      loop(
        { ...baseState, map: mapAfter },
        Cmd.action(actions.finishLevel())
      )
    );
  });

  it('updates isFinished and triggers levelsActions.clearLevel, when reducing a FINISH_LEVEL', () => {
    const stateBefore: State = { ...baseState, finished: false };
    const stateAfter: State = { ...stateBefore, finished: true };
    expect(
      gameReducer(stateBefore, actions.finishLevel())
    ).toEqual(
      loop(
        stateAfter,
        Cmd.action(levelsActions.clearLevel())
      )
    );
  });

  it('ignores unknown actions', () => {
    const stateBefore = baseState;
    const action = { type: 'any unknown action' };
    const stateAfter = gameReducer(stateBefore, action as any);

    expect(stateAfter).toBe(stateBefore);
  });

});
