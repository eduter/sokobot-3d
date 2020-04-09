import { Button } from 'grommet';
import { Refresh } from 'grommet-icons';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';
import { gameSelectors } from '../../../state/ducks/game';
import { levelsActions } from '../../../state/ducks/levels';
import { State } from '../../../state/types';


interface RestartButtonProps extends ConnectedProps<typeof connector> {
}

function RestartButton({ level, restart }: RestartButtonProps) {
  return (
    <Wrapper>
      <Button label="Restart" icon={<Refresh/>} onClick={() => restart(level)}/>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  top: .5rem;
  left: .5rem;
  z-index: 1000;
`;

function mapStateToProps(state: State) {
  return {
    level: gameSelectors.getCurrentLevel(state.game)
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    restart: (level: number) => dispatch(levelsActions.startLevel(level))
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);


export default connector(RestartButton);
export { RestartButton };
