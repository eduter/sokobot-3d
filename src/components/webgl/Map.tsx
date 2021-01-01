import React, { Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { gameSelectors, RootState } from '../../state';
import CardboardBox from './CardboardBox';
import GroundElevation from './GroundElevation';
import Robot from './Robot';
import TargetTile from './TargetTile';
import PossibleMoves from './PossibleMoves';


interface MapProps extends ConnectedProps<typeof connector> {
}

function Map({ mapDimensions, tilesInfo, movableObjectsInfo, robotKey, isLevelCleared }: MapProps) {
  const [xSize, ySize] = mapDimensions;

  return (
    <group position={[(1 - xSize) / 2, (1 - ySize) / 2, -0.5]}>
      <Robot key={robotKey}/>
      {isLevelCleared || <PossibleMoves/>}
      {tilesInfo.map(({ x, y, height, hasTarget }) => (
        <Fragment key={`${x}-${y}`}>
          {height > 0 && <GroundElevation x={x} y={y} height={height}/>}
          {hasTarget && <TargetTile x={x} y={y} height={height}/>}
        </Fragment>
      ))}
      {movableObjectsInfo.map(({ key, position }) => (
        <CardboardBox key={key} position={position}/>
      ))}
    </group>
  );
}

function mapStateToProps(state: RootState) {
  return {
    mapDimensions: gameSelectors.getMapDimensions(state.game),
    tilesInfo: gameSelectors.getTilesInfo(state.game),
    movableObjectsInfo: gameSelectors.getMovableObjectsInfo(state.game),
    robotKey: gameSelectors.getRobotKey(state.game),
    isLevelCleared: gameSelectors.isLevelCleared(state.game)
  };
}

const connector = connect(mapStateToProps);


export default connector(Map);
export { Map };
