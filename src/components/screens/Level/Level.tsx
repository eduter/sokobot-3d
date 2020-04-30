import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';
import { getLevelNames } from '../../../levels';
import { levelsSelectors } from '../../../state/ducks/levels';
import { State } from '../../../state/types';
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

function Level({ isUnlocked, levelName }: LevelProps) {
  if (levelName === undefined || !isUnlocked) {
    return <Redirect to="/select-level"/>;
  }
  return (
    <Screen title={levelName}>
      <MyCanvas/>
      <GameControls/>
      <RestartButton/>
      <LevelClearedDialog/>
    </Screen>
  );
}

interface MatchParams {
  level: string;
}

function mapStateToProps(state: State, { match }: RouteComponentProps<MatchParams>) {
  const level = parseInt(match.params.level);

  return {
    levelName: getLevelNames()[level],
    isUnlocked: levelsSelectors.isUnlocked(state.levels, level)
  };
}

const connector = connect(mapStateToProps);


export default connector(Level);
export { Level };
