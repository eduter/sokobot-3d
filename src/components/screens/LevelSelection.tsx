import { push } from 'connected-react-router';
import { Button } from 'grommet';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import levels from '../../data/levels.json';
import Screen from '../Screen';


interface LevelSelectionProps {
  selectLevel: (level: number) => void
}

function LevelSelection({ selectLevel }: LevelSelectionProps) {
  return (
    <Screen title="Select Level">
      {levels.map(({ name }, index) => (
        <Button key={index} label={name} onClick={() => selectLevel(index)}/>
      ))}
    </Screen>
  );
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    selectLevel: (level: number) => dispatch(push(`/level/${level}`))
  };
}


export default connect(null, mapDispatchToProps)(LevelSelection);
