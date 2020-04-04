import { push } from 'connected-react-router';
import { Box, Button } from 'grommet';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';
import isLevelCleared from '../../../mechanics/isLevelCleared';
import { levelsActions } from '../../../state/ducks/levels';
import { State } from '../../../state/types';


interface LevelClearedDialogProps extends ConnectedProps<typeof connector> {
  nextLevel: number | undefined;
}

const DialogWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background-color: rgba(200, 200, 200, 0.5);
  border-radius: 1em;
  h1 {
    text-align: center;
  }
`;

function LevelClearedDialog({ isLevelCleared, nextLevel, goToLevel, goToLevelSelection }: LevelClearedDialogProps) {
  if (isLevelCleared()) {
    return (
      <DialogWrapper>
        <Box width="medium" gap="small" align="stretch" pad="small">
          <h1>{nextLevel ? 'Level Cleared' : 'Game Cleared'}</h1>
          {nextLevel !== undefined && <Button label="Go to next level" onClick={() => goToLevel(nextLevel)}/>}
          {/*<Button label="Back to level selection" onClick={goToLevelSelection}/>*/}
        </Box>
      </DialogWrapper>
    );
  }
  return null;
}

function mapStateToProps(state: State) {
  return {
    isLevelCleared: () => !!state.game && isLevelCleared(state.game)
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    goToLevel(level: number) {
      dispatch(levelsActions.finishLevel(level - 1)); // TODO: refactor this mess
      dispatch(push(`/level/${level}`));
    },
    goToLevelSelection() {
      dispatch(push('/select-level'));
    }
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);


export default connector(LevelClearedDialog);
export { LevelClearedDialog };
