import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { gameSelectors, RootState } from '../../state';


interface PossibleMovesProps extends ConnectedProps<typeof connector> {
}


function PossibleMoves({ possibleMoves }: PossibleMovesProps) {
  return (
    <>
      {possibleMoves.map(([x, y]) => <HighlightedTile key={`${x}-${y}`} x={x} y={y} height={1}/>)}
    </>
  );
}

interface HighlightedTileProps {
  x: number;
  y: number;
  height: number;
}

function HighlightedTile({ x, y, height }: HighlightedTileProps) {
  console.log(x, y, height);
  return (
    <mesh position={[x, y, height + 0.6]}>
      <planeBufferGeometry attach="geometry" args={[1, 1]}/>
      <meshLambertMaterial attach="material" color={0xFFFF00} transparent={true} opacity={0.3}/>
    </mesh>
  );
}

function mapStateToProps(state: RootState) {
  return {
    possibleMoves: gameSelectors.getPossibleMoves(state.game)
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {};
}

const connector = connect(mapStateToProps, mapDispatchToProps);


export default connector(PossibleMoves);
export { PossibleMoves };
