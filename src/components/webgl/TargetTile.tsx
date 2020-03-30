import React from 'react';


interface TargetTileProps {
  x: number;
  y: number;
  height: number;
}

function TargetTile({ x, y, height }: TargetTileProps) {
  return (
    <mesh position={[x, y, height + .51]} receiveShadow={true}>
      <planeBufferGeometry attach="geometry" args={[1, 1]}/>
      <meshLambertMaterial attach="material" color={0x00FF00}/>
    </mesh>
  );
}


export default TargetTile;
