import { goBack } from 'connected-react-router';
import { Button } from 'grommet';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import levels from '../../../data/levels.json';
import { levelsActions, levelsSelectors } from '../../../state/ducks/levels';
import Screen from '../../Screen';
import MyCanvas from '../../webgl/MyCanvas';
import LevelClearedDialog from './LevelClearedDialog';
import { State } from '../../../state/types';


interface MatchParams {
  level: string;
}

interface LevelProps extends RouteComponentProps<MatchParams>, ConnectedProps<typeof connector> {
}

function Level({ match, isUnlocked, finishLevel }: LevelProps) {
  const level = +match.params.level;
  const levelData = levels[level];
  const nextLevel = levels[level + 1] ? level + 1 : undefined;

  if (!levelData || !isUnlocked(level)) {
    return <Redirect to="/select-level"/>;
  }
  return (
    <Screen title={levelData.name}>
      <Button label="Finish level" onClick={() => finishLevel(level)} />
      <MyCanvas/>
      <LevelClearedDialog nextLevel={nextLevel}/>
    </Screen>
  );
}

function mapStateToProps(state: State) {
  return {
    isUnlocked(level: number) {
      return levelsSelectors.isUnlocked(state.levels, level);
    }
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    finishLevel(level: number) {
      dispatch(levelsActions.finishLevel(level));
      dispatch(goBack());
    }
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Level);
export { Level };
