import { Box, Button } from 'grommet';
import { LinkDown, LinkUp, RotateLeft, RotateRight } from 'grommet-icons';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';
import { gameActions } from '../../../state/ducks/game';


interface ControlsProps extends ConnectedProps<typeof connector> {
}

function Controls({ moveForward, moveBackward, turnLeft, turnRight }: ControlsProps) {
  return (
    <Wrapper>
      <Box align="center">
        <IconButton icon={<LinkUp/>} title="Move forward" onClick={moveForward}/>
      </Box>
      <Box direction="row">
        <IconButton icon={<RotateLeft/>} title="Turn left" onClick={turnLeft}/>
        <IconButton icon={<LinkDown/>} title="Move backward" onClick={moveBackward}/>
        <IconButton icon={<RotateRight/>} title="Turn right" onClick={turnRight}/>
      </Box>
    </Wrapper>
  );
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
  return <Button {...props} plain={false} margin="xxsmall"/>
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    moveForward() {
      dispatch(gameActions.moveForward());
    },
    moveBackward() {
      dispatch(gameActions.moveBackward());
    },
    turnLeft() {
      dispatch(gameActions.turnLeft());
    },
    turnRight() {
      dispatch(gameActions.turnRight());
    },
  };
}

const connector = connect(null, mapDispatchToProps);


export default connector(Controls);
export { Controls };
