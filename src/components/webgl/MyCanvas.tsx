import React from 'react';
import { Provider, ReactReduxContext } from 'react-redux';
import { Canvas } from 'react-three-fiber';
import { AxesHelper } from 'react-three-fiber/components';
import { Color } from 'three';
import CameraControls from './CameraControls';
import Map from './Map';
import VrButton from './VrButton';


function MyCanvas() {
  return (
    <ReactReduxContext.Consumer>
      {({ store }) => (
        <Canvas vr shadowMap style={{ backgroundColor: 'black', height: '100%', position: 'absolute', top: 0, left: 0 }}>
          <Provider store={store}>
            <CameraControls/>
            <VrButton/>
            <group rotation={[-Math.PI / 2, 0, 0]}>
              {process.env.NODE_ENV !== 'production' && <AxesHelper scale={[10, 10, 10]}/>}
              <ambientLight intensity={0.4}/>
              <spotLight
                color={new Color('#fffda7')}
                castShadow
                intensity={0.7}
                penumbra={1}
                decay={1}
                angle={Math.PI / 8}
                position={[10, 10, 10]}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
              />
              <Map/>
            </group>
          </Provider>
        </Canvas>
      )}
    </ReactReduxContext.Consumer>
  );
}


export default MyCanvas;
