import React from 'react';
import { Box, Button } from 'grommet';
import { Close, Play, SettingsOption } from 'grommet-icons';

function MainMenu() {
  return (
    <Box width="medium" gap="small" align="stretch">
      <Button icon={<Play/>} label="Start Game"/>
      <Button icon={<SettingsOption/>} label="Settings"/>
      <Button icon={<Close/>} label="Quit"/>
    </Box>
  );
}

export default MainMenu;
