import React, { Fragment } from 'react';
import GroundElevation from './GroundElevation';
import CardboardBox from './CardboardBox';
import TargetTile from './TargetTile';
import Robot from './Robot';


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
        height: 0,
        box: false
      });
    }
  }
  return (
    <group position={[(1 - mapSize) / 2, (1 - mapSize) / 2, -.5]}>
      <TargetTile x={0} y={0} height={tiles[0].height + 0.51}/>
      <Robot/>
      {tiles.map(({ x, y, height, box }) => (
        <Fragment key={`${x}-${y}`}>
          <GroundElevation x={x} y={y} height={height}/>
          {box && <CardboardBox x={x} y={y} height={height + 1}/>}
        </Fragment>
      ))}
    </group>
  );
}


export default Map;
