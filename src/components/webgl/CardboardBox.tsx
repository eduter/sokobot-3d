import React from 'react';


interface CardboardBoxProps {
  position: [number, number, number];
}

function CardboardBox({ position }: CardboardBoxProps) {
  return (
    <mesh position={position} castShadow={true} receiveShadow={true}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]}/>
      <meshLambertMaterial attach="material" color={0xaa8844}/>
    </mesh>
  );
}


export default CardboardBox;
