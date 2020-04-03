import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { gameSelectors } from '../../state/ducks/game';
import { TileInfo } from '../../state/ducks/game/selectors';
import { State } from '../../state/types';
import CardboardBox from './CardboardBox';
import GroundElevation from './GroundElevation';
import Robot from './Robot';
import TargetTile from './TargetTile';
import { directionToAngle } from '../../mechanics/directions';


interface MapProps {
  getTilesInfo(): TileInfo[];
  getMapDimensions(): [number, number];
  getRobotPosition(): [number, number, number];
  getRobotDirection(): number;
}

function Map({ getTilesInfo, getMapDimensions, getRobotPosition, getRobotDirection }: MapProps) {
  const tiles = getTilesInfo();
  const [xSize, ySize] = getMapDimensions();

  return (
    <group position={[(1 - xSize) / 2, (1 - ySize) / 2, -.5]}>
      <Robot position={getRobotPosition()} direction={getRobotDirection()}/>
      {tiles.map(({ x, y, height, objects, target }) => (
        <Fragment key={`${x}-${y}`}>
          {height > 0 && <GroundElevation x={x} y={y} height={height}/>}
          {objects.map((object, index) => (
            <CardboardBox key={`${x}-${y}-${index}`} x={x} y={y} height={height + index + 1}/>
          ))}
          {target && <TargetTile x={x} y={y} height={height}/>}
        </Fragment>
      ))}
    </group>
  );
}


function mapStateToProps(state: State) {
  return {
    getMapDimensions() {
      return gameSelectors.getMapDimensions(state.game);
    },
    getTilesInfo() {
      return gameSelectors.getTilesInfo(state.game);
    },
    getRobotPosition() {
      return gameSelectors.getRobotPosition(state.game);
    },
    getRobotDirection() {
      return directionToAngle(gameSelectors.getRobotDirection(state.game));
    }
  };
}


export default connect(mapStateToProps)(Map);
