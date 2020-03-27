import React from 'react';
import { AxesHelper } from 'react-three-fiber/components';
import GroundElevation from './GroundElevation';
import CardboardBox from './CardboardBox';
import TargetTile from './TargetTile';


interface MapProps {
}

function Map({}: MapProps) {
  const tiles = [];
  const mapSize = 6;

  for (let x = 0; x < mapSize; x++) {
    for (let y = 0; y < mapSize; y++) {
      tiles.push({
        x,
        y,
        height: Math.random() > 0.7 ? 1 : 0,
        box: Math.random() > 0.9
      });
    }
  }
  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      <AxesHelper scale={[mapSize, mapSize, mapSize]}/>
      <group position={[(1 - mapSize) / 2, (1 - mapSize) / 2, -.5]}>
        <TargetTile x={0} y={0} height={tiles[0].height + 0.51}/>
        {tiles.map(({ x, y, height, box }) => (
          <>
            <GroundElevation x={x} y={y} height={height}/>
            {box && <CardboardBox x={x} y={y} height={height + 1}/>}
          </>
        ))}
      </group>
    </group>
  );
}


export default Map;
