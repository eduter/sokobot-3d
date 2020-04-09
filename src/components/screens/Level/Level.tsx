import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';
import levels from '../../../data/levels.json';
import { levelsSelectors } from '../../../state/ducks/levels';
import { State } from '../../../state/types';
import Screen from '../../Screen';
import MyCanvas from '../../webgl/MyCanvas';
import Controls from './Controls';
import LevelClearedDialog from './LevelClearedDialog';


interface MatchParams {
  level: string;
}

interface LevelProps extends RouteComponentProps<MatchParams>, ConnectedProps<typeof connector> {
}

function Level({ match, isUnlocked }: LevelProps) {
  const level = +match.params.level;
  const levelData = levels[level];
  const nextLevel = levels[level + 1] ? level + 1 : undefined;

  if (!levelData || !isUnlocked(level)) {
    return <Redirect to="/select-level"/>;
  }
  return (
    <Screen title={levelData.name}>
      <MyCanvas/>
      <Controls/>
      <LevelClearedDialog nextLevel={nextLevel}/>
    </Screen>
  );
}

function mapStateToProps(state: State) {
  return {
    isUnlocked: (level: number) => levelsSelectors.isUnlocked(state.levels, level)
  };
}

const connector = connect(mapStateToProps);


export default connector(Level);
export { Level };
