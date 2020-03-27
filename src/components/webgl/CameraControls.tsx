import React from 'react';
import { extend, ReactThreeFiber, useThree } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


extend({ OrbitControls });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'orbitControls': ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>;
    }
  }
}

function CameraControls() {
  const { camera, gl } = useThree();

  return <orbitControls args={[camera, gl.domElement]} maxPolarAngle={Math.PI / 2}/>;
}


export default CameraControls;
