import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { DeepReadonly } from 'utility-types';
import { State } from '../../state/types';
import { gameActions, gameSelectors } from '../../state/ducks/game';
import { directionToAngle, Point2D } from '../../utils/directionHelpers';


interface RobotProps {
  getPosition(): DeepReadonly<Point2D>;
  getDirection(): number;
  moveForward(): void;
  moveBackward(): void;
  turnRight(): void;
  turnLeft(): void;
}

function Robot({ getPosition, getDirection, ...actions }: RobotProps) {
  const [x, y] = getPosition();

  function onKeyPress(event: KeyboardEvent) {
    switch (event.key) {
      case 'w':
        actions.moveForward();
        break;
      case 'd':
        actions.turnRight();
        break;
      case 's':
        actions.moveBackward();
        break;
      case 'a':
        actions.turnLeft();
        break;
    }
  }

  useEffect(() => {
    window.addEventListener('keypress', onKeyPress);
    return () => {
      window.removeEventListener('keypress', onKeyPress);
    };
  });

  return (
    <mesh position={[x, y, 1]} rotation={[0, 0, getDirection()]} castShadow={true} receiveShadow={true}>
      <coneBufferGeometry attach="geometry" args={[0.5, 1, 10]}/>
      <meshLambertMaterial attach="material" color={0x6A0BFF}/>
    </mesh>
  );
}


function mapStateToProps(state: State) {
  return {
    getPosition() {
      return gameSelectors.getRobotPosition(state.game);
    },
    getDirection() {
      return directionToAngle(gameSelectors.getRobotDirection(state.game));
    }
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    moveForward() {
      dispatch(gameActions.moveForward());
    },
    moveBackward() {
      dispatch(gameActions.moveBackward());
    },
    turnRight() {
      dispatch(gameActions.turnRight());
    },
    turnLeft() {
      dispatch(gameActions.turnLeft());
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Robot);
