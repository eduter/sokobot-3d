import React from 'react';
import { a } from 'react-spring/three';
import { useSimpleMovementAnimation } from '../../utils/hooks';


interface CardboardBoxProps {
  position: [number, number, number];
}

function CardboardBox({ position }: CardboardBoxProps) {
  const props = useSimpleMovementAnimation({ position });

  return (
    <a.mesh {...props} castShadow={true} receiveShadow={true}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]}/>
      <meshLambertMaterial attach="material" color={0xaa8844}/>
    </a.mesh>
  );
}


export default CardboardBox;
