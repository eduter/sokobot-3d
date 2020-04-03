import { goBack } from 'connected-react-router';
import { Button } from 'grommet';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import levels from '../../../data/levels.json';
import { levelsActions } from '../../../state/ducks/levels';
import BackButton from '../../BackButton';
import Screen from '../../Screen';
import MyCanvas from '../../webgl/MyCanvas';


interface MatchParams {
  level: string;
}

interface LevelProps extends RouteComponentProps<MatchParams> {
  finishLevel(level: number): void;
}

function Level({ match, finishLevel }: LevelProps) {
  const level = +match.params.level;
  const levelData = levels[level];

  if (!levelData) {
    return <Redirect to="/select-level"/>;
  }

  return (
    <Screen title={levelData.name}>
      <Button label="Finish level" onClick={() => finishLevel(level)} />
      <MyCanvas/>
      <BackButton/>
    </Screen>
  );
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    finishLevel(level: number) {
      dispatch(levelsActions.finishLevel(level));
      dispatch(goBack());
    }
  };
}


export default connect(null, mapDispatchToProps)(Level);
