import { push } from 'connected-react-router';
import { Box, Button } from 'grommet';
import { Play, SettingsOption } from 'grommet-icons';
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';


const H1 = styled.h1`
  text-align: center;
`;

interface MenuProps {
  startGame: () => void,
  openSettings: () => void
}

function Menu({ startGame, openSettings }: MenuProps) {
  return (
    <Box width="medium">
      <header>
        <H1>Sokobot 3D</H1>
      </header>
      <Box width="medium" gap="small" align="stretch">
        <Button icon={<Play/>} label="Start Game" onClick={startGame}/>
        <Button icon={<SettingsOption/>} label="Settings" onClick={openSettings}/>
      </Box>
    </Box>
  );
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    startGame: () => dispatch(push('/select-level')),
    openSettings: () => dispatch(push('/settings'))
  };
}

export default connect(null, mapDispatchToProps)(Menu);
