import React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import levels from '../../data/levels.json';
import Screen from '../Screen';
import BackButton from '../BackButton';


interface MatchParams {
  level: string;
}

interface LevelProps extends RouteComponentProps<MatchParams> {
}

function Level({ match }: LevelProps) {
  const levelIndex = +match.params.level;
  const levelData = levels[levelIndex];

  if (!levelData) {
    return <Redirect to="/select-level"/>;
  }

  return (
    <Screen title={levelData.name}>
      <BackButton/>
    </Screen>
  );
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {};
}


export default connect(null, mapDispatchToProps)(Level);
