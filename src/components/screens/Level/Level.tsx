import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';
import { getLevelNames } from '../../../levels';
import { gameSelectors, levelsSelectors, RootState } from '../../../state';
import Screen from '../../Screen';
import MyCanvas from '../../webgl/MyCanvas';
import GameControls from './GameControls';
import LevelClearedDialog from './LevelClearedDialog';
import RestartButton from './RestartButton';


interface MatchParams {
  level: string;
}

interface LevelProps extends ConnectedProps<typeof connector> {
}

function Level({ isLevelCleared, isUnlocked, levelName }: LevelProps) {
  if (levelName === undefined || !isUnlocked) {
    return <Redirect to="/select-level"/>;
  }
  return (
    <Screen title={levelName}>
      <MyCanvas/>
      {isLevelCleared ? (
        <LevelClearedDialog/>
      ) : (
        <>
          <GameControls/>
          <RestartButton/>
        </>
      )}
    </Screen>
  );
}

interface MatchParams {
  level: string;
}

function mapStateToProps(state: RootState, { match }: RouteComponentProps<MatchParams>) {
  const level = parseInt(match.params.level);

  return {
    isLevelCleared: gameSelectors.isLevelCleared(state.game),
    isUnlocked: levelsSelectors.isUnlocked(state.levels, level),
    levelName: getLevelNames()[level]
  };
}

const connector = connect(mapStateToProps);


export default connector(Level);
export { Level };
