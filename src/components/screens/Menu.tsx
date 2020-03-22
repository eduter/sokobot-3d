import { push } from 'connected-react-router';
import { Button } from 'grommet';
import { Play, SettingsOption } from 'grommet-icons';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Screen from '../Screen';


interface MenuProps {
  startGame: () => void,
  openSettings: () => void
}

function Menu({ startGame, openSettings }: MenuProps) {
  return (
    <Screen title="Sokobot 3D">
      <Button icon={<Play/>} label="Start Game" onClick={startGame}/>
      <Button icon={<SettingsOption/>} label="Settings" onClick={openSettings}/>
    </Screen>
  );
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    startGame: () => dispatch(push('/select-level')),
    openSettings: () => dispatch(push('/settings'))
  };
}

export default connect(null, mapDispatchToProps)(Menu);
