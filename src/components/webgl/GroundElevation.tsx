import React from 'react';


interface GroundElevationProps {
  x: number;
  y: number;
  height: number;
}

function GroundElevation({ x, y, height }: GroundElevationProps) {
  return (
    <mesh position={[x, height, y]}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]}/>
      <meshLambertMaterial attach="material" color={0x555555} transparent={true}/>
    </mesh>
  );
}


export default GroundElevation;
