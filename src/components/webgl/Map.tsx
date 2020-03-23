import React from 'react';
import GroundElevation from './GroundElevation';
import CardboardBox from './CardboardBox';
import TargetTile from './TargetTile';


interface MapProps {
}

function Map({}: MapProps) {
  const tiles = [];

  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {
      tiles.push({
        x,
        y,
        height: Math.random() > 0.7 ? 1 : 0,
        box: Math.random() > 0.9
      });
    }
  }
  return (
    <>
      <TargetTile x={-2.5} y={-2.5} height={tiles[0].height + 0.51}/>
      {tiles.map(({x, y, height}) => <GroundElevation x={x - 2.5} y={y - 2.5} height={height}/>)}
      {tiles.map(({x, y,height, box}) => box && <CardboardBox x={x - 2.5} y={y - 2.5} height={height + 1}/>)}
    </>
  );
}


export default Map;
