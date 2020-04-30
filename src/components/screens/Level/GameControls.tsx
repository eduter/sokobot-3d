import { Box, Button } from 'grommet';
import { LinkDown, LinkUp, RotateLeft, RotateRight } from 'grommet-icons';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';
import { gameActions } from '../../../state/ducks/game';
import { useEffectOnce } from '../../../utils/hooks';


interface ControlsProps extends ConnectedProps<typeof connector> {
}

function GameControls({ moveForward, moveBackward, turnLeft, turnRight }: ControlsProps) {
  const onKeyPress = createKeyPressHandler({
    W: moveForward,
    A: turnLeft,
    S: moveBackward,
    D: turnRight
  });

  useEffectOnce(() => {
    window.addEventListener('keypress', onKeyPress);
    return () => {
      window.removeEventListener('keypress', onKeyPress);
    };
  });

  return (
    <Wrapper>
      <Box align="center">
        <IconButton icon={<LinkUp/>} title="Move forward (W)" onClick={moveForward}/>
      </Box>
      <Box direction="row">
        <IconButton icon={<RotateLeft/>} title="Turn left (A)" onClick={turnLeft}/>
        <IconButton icon={<LinkDown/>} title="Move backward (S)" onClick={moveBackward}/>
        <IconButton icon={<RotateRight/>} title="Turn right (D)" onClick={turnRight}/>
      </Box>
    </Wrapper>
  );
}

function createKeyPressHandler(keyMapping: { [key: string]: () => void }) {
  return (event: KeyboardEvent) => {
    const key = event.key.toUpperCase();

    if (key in keyMapping) {
      keyMapping[key].call(null);
    }
  };
}

const Wrapper = styled.div`
  position: fixed;
  bottom: .5rem;
  right: .5rem;
  z-index: 1000;
`;

interface IconButtonProps {
  icon: JSX.Element;
  title: string;
  onClick: () => void;
}

function IconButton(props: IconButtonProps) {
  return <Button {...props} plain={false} margin="xxsmall"/>;
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    moveForward: () => dispatch(gameActions.moveForward()),
    moveBackward: () => dispatch(gameActions.moveBackward()),
    turnLeft: () => dispatch(gameActions.turnLeft()),
    turnRight: () => dispatch(gameActions.turnRight())
  };
}

const connector = connect(null, mapDispatchToProps);


export default connector(GameControls);
export { GameControls };
