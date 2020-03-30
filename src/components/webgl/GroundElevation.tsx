import React from 'react';


interface GroundElevationProps {
  x: number;
  y: number;
  height: number;
}

function GroundElevation({ x, y, height }: GroundElevationProps) {
  return (
    <mesh position={[x, y, (1 + height) / 2]} castShadow={true} receiveShadow={true}>
      <boxBufferGeometry attach="geometry" args={[1, 1, height]}/>
      <meshPhongMaterial attach="material" color={0x555555}/>
    </mesh>
  );
}


export default GroundElevation;
