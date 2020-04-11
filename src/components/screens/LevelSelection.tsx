import { push } from 'connected-react-router';
import { Button } from 'grommet';
import { Lock, Unlock } from 'grommet-icons';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import levels from '../../data/levels.json';
import { State } from '../../state/types';
import { levelsSelectors } from '../../state/ducks/levels';
import Screen from '../Screen';


interface LevelSelectionProps extends ConnectedProps<typeof connector> {
}

function LevelSelection({ isUnlocked, selectLevel }: LevelSelectionProps) {
  return (
    <Screen title="Select Level">
      {levels.map((_, level) => (
        isUnlocked(level)
          ? <Button key={level} label={`Level ${level + 1}`} icon={<Unlock/>} onClick={() => selectLevel(level)}/>
          : <Button key={level} label={`Level ${level + 1}`} icon={<Lock/>} disabled={true}/>
      ))}
    </Screen>
  );
}

function mapStateToProps(state: State) {
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
