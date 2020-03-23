import React from 'react';
import { Canvas } from 'react-three-fiber';
import CameraControls from './CameraControls';
import Map from './Map';


function MyCanvas() {
  return (
    <Canvas>
      <CameraControls/>
      <ambientLight/>
      <pointLight position={[10, 10, 10]}/>
      <Map/>
    </Canvas>
  );
}


export default MyCanvas;
