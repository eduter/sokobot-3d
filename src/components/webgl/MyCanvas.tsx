import React from 'react';
import { Canvas } from 'react-three-fiber';
import { AxesHelper } from 'react-three-fiber/components';
import { Color } from 'three';
import CameraControls from './CameraControls';
import Map from './Map';


function MyCanvas() {
  return (
    <Canvas shadowMap style={{ backgroundColor: 'black' }}>
      <CameraControls/>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <AxesHelper scale={[10, 10, 10]}/>
        <ambientLight intensity={0.3}/>
        <spotLight
          color={new Color('#fffda7')}
          castShadow
          intensity={0.7}
          penumbra={1}
          decay={1}
          angle={Math.PI / 8}
          position={[10,10,10]}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <Map/>
      </group>
    </Canvas>
  );
}


export default MyCanvas;
