import React from 'react';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { a } from 'react-spring/three';
import { gameActions, gameSelectors } from '../../state/ducks/game';
import { State } from '../../state/types';
import { directionToAngle } from '../../mechanics/directions';
import { useEffectOnce, useMinimalRotation, useSimpleMovementAnimation } from '../../utils/hooks';


interface RobotProps extends ConnectedProps<typeof connector> {
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

  useEffectOnce(() => {
    window.addEventListener('keypress', onKeyPress);
    return () => {
      window.removeEventListener('keypress', onKeyPress);
    };
  });

  const zRotation = useMinimalRotation(direction);
  const props = useSimpleMovementAnimation({
    position,
    rotation: [0, 0, zRotation]
  });

  return (
    <a.mesh {...props} castShadow={true} receiveShadow={true}>
      <coneBufferGeometry attach="geometry" args={[0.5, 1, 10]}/>
      <meshLambertMaterial attach="material" color={0x6A0BFF}/>
    </a.mesh>
  );
}

function mapStateToProps(state: State) {
  return {
    position: gameSelectors.getRobotPosition(state.game),
    direction: directionToAngle(gameSelectors.getRobotDirection(state.game))
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    moveForward: () => dispatch(gameActions.moveForward()),
    moveBackward: () => dispatch(gameActions.moveBackward()),
    turnRight: () => dispatch(gameActions.turnRight()),
    turnLeft: () => dispatch(gameActions.turnLeft())
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);


export default connector(Robot);
export { Robot };
