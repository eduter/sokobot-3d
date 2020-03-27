import React from 'react';

interface CardboardBoxProps {
  x: number;
  y: number;
  height: number;
}

function CardboardBox({ x, y, height }: CardboardBoxProps) {
  return (
    <mesh position={[x, y, height]} castShadow={true} receiveShadow={true}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]}/>
      <meshLambertMaterial attach="material" color={0xaa8844}/>
    </mesh>
  );
}


export default CardboardBox;
