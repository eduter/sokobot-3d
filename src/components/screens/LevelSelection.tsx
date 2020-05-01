import { push } from 'connected-react-router';
import { Button } from 'grommet';
import { Lock, Unlock } from 'grommet-icons';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { getLevelNames } from '../../levels';
import { levelsSelectors, RootState } from '../../state';
import Screen from '../Screen';


interface LevelSelectionProps extends ConnectedProps<typeof connector> {
}

function LevelSelection({ isUnlocked, selectLevel }: LevelSelectionProps) {
  return (
    <Screen title="Select Level">
      {getLevelNames().map((levelName, level) => (
        isUnlocked(level)
          ? <Button key={level} label={levelName} icon={<Unlock/>} onClick={() => selectLevel(level)}/>
          : <Button key={level} label={levelName} icon={<Lock/>} disabled={true}/>
      ))}
    </Screen>
  );
}

function mapStateToProps(state: RootState) {
  return {
    isUnlocked: (level: number) => levelsSelectors.isUnlocked(state.levels, level)
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    selectLevel: (level: number) => dispatch(push(`/level/${level}`))
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);


export default connector(LevelSelection);
export { LevelSelection };
