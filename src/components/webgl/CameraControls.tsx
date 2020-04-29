import React, { useRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { extend, useThree } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { gameSelectors } from '../../state/ducks/game';
import { State } from '../../state/types';
import { useEffectOnce } from '../../utils/hooks';

// False positive, when only the type is needed
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ReactThreeFiber } from 'react-three-fiber';


extend({ OrbitControls });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'orbitControls': ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>;
    }
  }
}

interface CameraControlsProps extends ConnectedProps<typeof connector> {
}

function CameraControls({ initialPosition }: CameraControlsProps) {
  const { camera, gl } = useThree();
  const controls = useRef<OrbitControls>();

  useEffectOnce(() => {
    if (initialPosition) {
      camera.position.set(...initialPosition);
      if (controls.current) {
        controls.current.update();
      }
    }
  });

  return <orbitControls args={[camera, gl.domElement]} maxPolarAngle={Math.PI / 2} enablePan={false} ref={controls}/>;
}

function mapStateToProps(state: State) {
  return {
    // TODO: find a proper way to determine a good initial camera position
    initialPosition: (() => {
      try {
        const mapDimensions = gameSelectors.getMapDimensions(state.game);
        const n = Math.max(3, Math.max(...mapDimensions) * 0.7);

        return [n, n, n] as const;
      } catch {
      }
      return undefined;
    })()
  };
}

const connector = connect(mapStateToProps);


export default connector(CameraControls);
export { CameraControls };
