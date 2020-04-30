import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { a } from 'react-spring/three';
import { gameSelectors } from '../../state/ducks/game';
import { State } from '../../state/types';
import { directionToAngle } from '../../mechanics/directions';
import { useMinimalRotation, useSimpleMovementAnimation } from '../../utils/hooks';


interface RobotProps extends ConnectedProps<typeof connector> {
}

function Robot({ position, direction }: RobotProps) {
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

const connector = connect(mapStateToProps);


export default connector(Robot);
export { Robot };
