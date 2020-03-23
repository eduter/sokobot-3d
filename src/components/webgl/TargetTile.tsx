import React from 'react';


interface TargetTileProps {
  x: number;
  y: number;
  height: number;
}

function TargetTile({ x, y, height }: TargetTileProps) {
  return (
    <mesh position={[x, height, y]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[1, 1]}/>
      <meshLambertMaterial attach="material" color={0x00FF00}/>
    </mesh>
  );
}


export default TargetTile;
