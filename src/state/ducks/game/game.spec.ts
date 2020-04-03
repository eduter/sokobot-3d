import { Direction, Point2D } from '../../../mechanics/directions';
import * as actions from './actions';
import gameReducer from './reducer';
import { LevelMap, State } from './types';


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
const mapWithHole: State = {
  height: 3,
  width: 3,
  targets: [],
  tiles: [
    [{ height: 1, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }],
    [{ height: 1, objects: [] }, { height: 0, objects: [] }, { height: 1, objects: [] }],
    [{ height: 1, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }]
  ],
  robot: {
    position: [1, 0],
    direction: Direction.NORTH
  }
};
const mapWithObstacle: State = {
  height: 3,
  width: 3,
  targets: [],
  tiles: [
    [{ height: 1, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }],
    [{ height: 1, objects: [] }, { height: 2, objects: [] }, { height: 1, objects: [] }],
    [{ height: 1, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }]
  ],
  robot: {
    position: [1, 0],
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

  it('allows robot to move backward, when there are no obstacles', () => {
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

  it('does not allow robot to move outside the map', () => {
    {
      // moving forward
      const states: LevelMap[] = [
        { ...empty3x3Map, robot: { position: [1, 2], direction: Direction.NORTH } },
        { ...empty3x3Map, robot: { position: [1, 0], direction: Direction.SOUTH } },
        { ...empty3x3Map, robot: { position: [2, 1], direction: Direction.EAST } },
        { ...empty3x3Map, robot: { position: [0, 1], direction: Direction.WEST } }
      ];

      states.forEach(state => {
        expect(gameReducer(state, actions.moveForward())).toEqual(state);
      });
    }
    {
      // moving backward
      const states: LevelMap[] = [
        { ...empty3x3Map, robot: { position: [1, 2], direction: Direction.SOUTH } },
        { ...empty3x3Map, robot: { position: [1, 0], direction: Direction.NORTH } },
        { ...empty3x3Map, robot: { position: [2, 1], direction: Direction.WEST } },
        { ...empty3x3Map, robot: { position: [0, 1], direction: Direction.EAST } }
      ];

      states.forEach(state => {
        expect(gameReducer(state, actions.moveBackward())).toEqual(state);
      });
    }
  });

  it('does not allow robot to fall into holes', () => {
    {
      // moving forward
      const states: LevelMap[] = [
        { ...mapWithHole, robot: { position: [1, 0], direction: Direction.NORTH } },
        { ...mapWithHole, robot: { position: [1, 2], direction: Direction.SOUTH } },
        { ...mapWithHole, robot: { position: [0, 1], direction: Direction.EAST } },
        { ...mapWithHole, robot: { position: [2, 1], direction: Direction.WEST } }
      ];

      states.forEach(state => {
        expect(gameReducer(state, actions.moveForward())).toEqual(state);
      });
    }
    {
      // moving backward
      const states: LevelMap[] = [
        { ...mapWithHole, robot: { position: [1, 0], direction: Direction.SOUTH } },
        { ...mapWithHole, robot: { position: [1, 2], direction: Direction.NORTH } },
        { ...mapWithHole, robot: { position: [0, 1], direction: Direction.WEST } },
        { ...mapWithHole, robot: { position: [2, 1], direction: Direction.EAST } }
      ];

      states.forEach(state => {
        expect(gameReducer(state, actions.moveBackward())).toEqual(state);
      });
    }
  });

  it('allows robot to move down', () => {
    const moveForward = actions.moveForward();
    const moveBackward = actions.moveBackward();
    const testCases = [
      {
        before: { position: [1, 1] as Point2D, direction: Direction.NORTH },
        after: { position: [1, 2] as Point2D, direction: Direction.NORTH },
        action: moveForward
      },
      {
        before: { position: [1, 1] as Point2D, direction: Direction.SOUTH },
        after: { position: [1, 0] as Point2D, direction: Direction.SOUTH },
        action: moveForward
      },
      {
        before: { position: [1, 1] as Point2D, direction: Direction.EAST },
        after: { position: [2, 1] as Point2D, direction: Direction.EAST },
        action: moveForward
      },
      {
        before: { position: [1, 1] as Point2D, direction: Direction.WEST },
        after: { position: [0, 1] as Point2D, direction: Direction.WEST },
        action: moveForward
      },
      {
        before: { position: [1, 1] as Point2D, direction: Direction.SOUTH },
        after: { position: [1, 2] as Point2D, direction: Direction.SOUTH },
        action: moveBackward
      },
      {
        before: { position: [1, 1] as Point2D, direction: Direction.NORTH },
        after: { position: [1, 0] as Point2D, direction: Direction.NORTH },
        action: moveBackward
      },
      {
        before: { position: [1, 1] as Point2D, direction: Direction.WEST },
        after: { position: [2, 1] as Point2D, direction: Direction.WEST },
        action: moveBackward
      },
      {
        before: { position: [1, 1] as Point2D, direction: Direction.EAST },
        after: { position: [0, 1] as Point2D, direction: Direction.EAST },
        action: moveBackward
      },
    ];

    testCases.forEach(({ before, action, after }) => {
      const stateBefore = { ...mapWithObstacle, robot: before };
      const stateAfter = { ...mapWithObstacle, robot: after };

      expect(gameReducer(stateBefore, action)).toEqual(stateAfter);
    });
  });

  it('does not allow robot to move up', () => {
    {
      // moving forward
      const states: LevelMap[] = [
        { ...mapWithObstacle, robot: { position: [1, 0], direction: Direction.NORTH } },
        { ...mapWithObstacle, robot: { position: [1, 2], direction: Direction.SOUTH } },
        { ...mapWithObstacle, robot: { position: [0, 1], direction: Direction.EAST } },
        { ...mapWithObstacle, robot: { position: [2, 1], direction: Direction.WEST } }
      ];

      states.forEach(state => {
        expect(gameReducer(state, actions.moveForward())).toEqual(state);
      });
    }
    {
      // moving backward
      const states: LevelMap[] = [
        { ...mapWithObstacle, robot: { position: [1, 0], direction: Direction.SOUTH } },
        { ...mapWithObstacle, robot: { position: [1, 2], direction: Direction.NORTH } },
        { ...mapWithObstacle, robot: { position: [0, 1], direction: Direction.WEST } },
        { ...mapWithObstacle, robot: { position: [2, 1], direction: Direction.EAST } }
      ];

      states.forEach(state => {
        expect(gameReducer(state, actions.moveBackward())).toEqual(state);
      });
    }
  });

  it('allows robot to push boxes through flat surfaces', () => {
    const stateBefore: State = {
      width: 1,
      height: 3,
      targets: [],
      tiles: [
        [{ height: 1, objects: [] }, { height: 1, objects: [{ type: 'box' }] }, { height: 1, objects: [] }]
      ],
      robot: {
        position: [0, 0],
        direction: Direction.NORTH
      }
    };
    const stateAfter: State = {
      ...stateBefore,
      tiles: [
        [{ height: 1, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [{ type: 'box' }] }]
      ],
      robot: {
        position: [0, 1],
        direction: Direction.NORTH
      }
    };
    expect(gameReducer(stateBefore, actions.moveForward())).toEqual(stateAfter);
  });

  it('ignores unknown actions', () => {
    const stateBefore = empty3x3Map;
    const action = { type: 'any unknown action' };
    const stateAfter = gameReducer(stateBefore, action as any);

    expect(stateAfter).toBe(stateBefore);
  });

});
