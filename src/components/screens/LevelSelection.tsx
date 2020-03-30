import { push } from 'connected-react-router';
import { Button } from 'grommet';
import { Lock, Unlock } from 'grommet-icons';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import levels from '../../data/levels.json';
import { State } from '../../state/types';
import { gameActions } from '../../state/ducks/game';
import { levelsSelectors } from '../../state/ducks/levels';
import { Direction } from '../../utils/directionHelpers';
import { LevelMap } from '../../state/ducks/game/types';
import Screen from '../Screen';


interface LevelSelectionProps {
  selectLevel: (level: number) => void
  isUnlocked: (level: number) => boolean
}

const testMap: LevelMap = {
  height: 3,
  width: 3,
  targets: [[1, 1]],
  tiles: [
    [{ height: 2, boxes: 0 }, { height: 3, boxes: 0 }, { height: 0, boxes: 0 }],
    [{ height: 1, boxes: 0 }, { height: 1, boxes: 0 }, { height: 1, boxes: 0 }],
    [{ height: 0, boxes: 0 }, { height: 1, boxes: 0 }, { height: 0, boxes: 0 }]
  ],
  robot: {
    position: [1, 1],
    direction: Direction.NORTH
  }
};

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
      dispatch(gameActions.startGame(testMap));
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(LevelSelection);
