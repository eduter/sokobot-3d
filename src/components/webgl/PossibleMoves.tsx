import React, { useRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { gameActions, gameSelectors, RootState } from '../../state';
import { Direction } from '../../mechanics/directions';
import { useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import { Material } from 'three/src/materials/Material';


interface PossibleMovesProps extends ConnectedProps<typeof connector> {
}


function PossibleMoves({ possibleMoves, selectMove }: PossibleMovesProps) {

  const ref = useRef(new THREE.MeshBasicMaterial({ color: '#2ABCFF' }));
  const time = useRef(0);

  useFrame((state, delta) => {
    if (ref.current) {
      time.current += delta;
      ref.current.opacity = (Math.sin(time.current * 2) + 1) / 4 + 0.1;
    }
  });

  return (
    <>
      {possibleMoves.map(([x, y, height]) => (
        <mesh position={[x, y, height + 0.52]} material={ref.current} onClick={event => {
          event.stopPropagation();
          selectMove(x, y);
        }}>
          <planeBufferGeometry attach="geometry" args={[0.95, 0.95]}/>
          {/*<meshBasicMaterial ref={ref} attach="material" color={'#2ABCFF'} transparent={true}/>*/}
        </mesh>
        
        // <HighlightedTile key={`${x}-${y}`} x={x} y={y} height={height} onClick={() => selectMove(x, y)} material={ref.current}/>
      ))}
    </>
  );
}

interface HighlightedTileProps {
  x: number;
  y: number;
  height: number;
  onClick: () => void;
  material: THREE.Material;
}

function HighlightedTile({ x, y, height, onClick, material }: HighlightedTileProps) {
  // console.log(x, y, height);
  // const ref = useRef<THREE.MeshBasicMaterial>();
  // const time = useRef(0);

  // useFrame((state, delta) => {
  //   if (ref.current) {
  //     time.current += delta;
  //     ref.current.opacity = (Math.sin(time.current * 2) + 1) / 4 + 0.1;
  //   }
  // });

  return (
    <mesh position={[x, y, height + 0.52]} material={material} onClick={event => {
      event.stopPropagation();
      onClick();
    }}>
      <planeBufferGeometry attach="geometry" args={[0.95, 0.95]}/>
      {/*<meshBasicMaterial ref={ref} attach="material" color={'#2ABCFF'} transparent={true}/>*/}
    </mesh>
  );
}

function mapStateToProps(state: RootState) {
  return {
    possibleMoves: gameSelectors.getPossibleMoves(state.game)
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    selectMove: (x: number, y: number) => {
      dispatch(gameActions.walk([x, y])); // TODO: figure out the correct direction
    }
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);


export default connector(PossibleMoves);
export { PossibleMoves };
