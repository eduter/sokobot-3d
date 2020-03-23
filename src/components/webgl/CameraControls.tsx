import React from 'react';
import { extend, useThree } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


extend({ OrbitControls });

function CameraControls() {
  const { camera, gl: { domElement } } = useThree();
  console.log(camera);
  // @ts-ignore
  return <orbitControls args={[camera, domElement]}/>;
}


export default CameraControls;
