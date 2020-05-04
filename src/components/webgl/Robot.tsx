import React, { Suspense } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { a } from 'react-spring/three';
import { useLoader } from 'react-three-fiber';
import { Mesh, MeshStandardMaterial } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { gameSelectors, RootState } from '../../state';
import { directionToAngle } from '../../mechanics/directions';
import { useMinimalRotation, useSimpleMovementAnimation } from '../../utils/hooks';


interface RobotProps extends ConnectedProps<typeof connector> {
}

function Robot(props: RobotProps) {
  return (
    <Suspense fallback={null}>
      <RobotMesh {...props}/>
    </Suspense>
  );
}

function RobotMesh({ position, direction }: RobotProps) {
  const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + '/3d-models/robot.glb');
  const { geometry } = gltf.scene.children[0] as Mesh;
  const material = new MeshStandardMaterial({ roughness: 0.5, metalness: 0.6 });
  const zRotation = useMinimalRotation(direction);
  const props = useSimpleMovementAnimation({
    position,
    rotation: [0, 0, zRotation]
  });

  return <a.mesh {...props} castShadow={true} receiveShadow={true} geometry={geometry} material={material}/>;
}

function mapStateToProps(state: RootState) {
  return {
    position: gameSelectors.getRobotPosition(state.game),
    direction: directionToAngle(gameSelectors.getRobotDirection(state.game))
  };
}

const connector = connect(mapStateToProps);


export default connector(Robot);
export { Robot };
