import { push } from 'connected-react-router';
import { Button } from 'grommet';
import { Lock, Unlock } from 'grommet-icons';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import levels from '../../data/levels.json';
import { LevelMap } from '../../mechanics/types';
import { State } from '../../state/types';
import { gameActions } from '../../state/ducks/game';
import { levelsSelectors } from '../../state/ducks/levels';
import Screen from '../Screen';


interface LevelSelectionProps {
  selectLevel: (level: number) => void
  isUnlocked: (level: number) => boolean
}

function LevelSelection({ isUnlocked, selectLevel }: LevelSelectionProps) {
  return (
    <Screen title="Select Level">
      {levels.map(({ name }, level) => (
        isUnlocked(level)
          ? <Button key={level} label={name} icon={<Unlock/>} onClick={() => selectLevel(level)}/>
          : <Button key={level} label={name} icon={<Lock/>} disabled={true}/>
      ))}
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
    selectLevel(level: number) {
      dispatch(push(`/level/${level}`));
      dispatch(gameActions.startGame(levels[level].map as unknown as LevelMap));
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(LevelSelection);
