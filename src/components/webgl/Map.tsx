import React, { Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { gameSelectors } from '../../state/ducks/game';
import { State } from '../../state/types';
import CardboardBox from './CardboardBox';
import GroundElevation from './GroundElevation';
import Robot from './Robot';
import TargetTile from './TargetTile';


interface MapProps extends ConnectedProps<typeof connector> {
}

function Map({ mapDimensions, tilesInfo }: MapProps) {
  const [xSize, ySize] = mapDimensions;

  return (
    <group position={[(1 - xSize) / 2, (1 - ySize) / 2, -.5]}>
      <Robot/>
      {tilesInfo.map(({ x, y, height, objects, target }) => (
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
    mapDimensions: gameSelectors.getMapDimensions(state.game),
    tilesInfo: gameSelectors.getTilesInfo(state.game)
  };
}

const connector = connect(mapStateToProps);


export default connector(Map);
export { Map };
