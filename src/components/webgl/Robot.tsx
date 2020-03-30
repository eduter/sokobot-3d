import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { gameActions } from '../../state/ducks/game';


interface RobotProps {
  position: [number, number, number];
  direction: number;
  moveForward(): void;
  moveBackward(): void;
  turnRight(): void;
  turnLeft(): void;
}

function Robot({ position, direction, ...actions }: RobotProps) {
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
    <mesh position={position} rotation={[0, 0, direction]} castShadow={true} receiveShadow={true}>
      <coneBufferGeometry attach="geometry" args={[0.5, 1, 10]}/>
      <meshLambertMaterial attach="material" color={0x6A0BFF}/>
    </mesh>
  );
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


export default connect(null, mapDispatchToProps)(Robot);
