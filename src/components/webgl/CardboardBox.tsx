import React from 'react';


interface CardboardBoxProps {
  x: number;
  y: number;
  height: number;
}

function CardboardBox({ x, y, height }: CardboardBoxProps) {
  return (
    <mesh position={[x, height, y]}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]}/>
      <meshLambertMaterial attach="material" color={0xD2691E}/>
    </mesh>
  );
}


export default CardboardBox;
