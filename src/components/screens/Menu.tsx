import { Box, Button } from 'grommet';
import { Play, SettingsOption } from 'grommet-icons';
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const H1 = styled.h1`
  text-align: center;
`;

function Menu() {
  return (
    <Box width="medium">
      <header>
        <H1>Sokobot 3D</H1>
      </header>
      <Box width="medium" gap="small" align="stretch">
        <Link to="/select-level">
          <Button icon={<Play/>} label="Start Game"/>
        </Link>
        <Link to="/settings">
          <Button icon={<SettingsOption/>} label="Settings"/>
        </Link>
      </Box>
    </Box>
  );
}

export default Menu;
