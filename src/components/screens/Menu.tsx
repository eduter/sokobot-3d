import { push } from 'connected-react-router';
import { Button } from 'grommet';
import { Play, SettingsOption } from 'grommet-icons';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import Screen from '../Screen';


interface MenuProps extends ConnectedProps<typeof connector> {
}

function Menu({ startGame, openSettings }: MenuProps) {
  return (
    <Screen title="Sokobot">
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

const connector = connect(null, mapDispatchToProps);


export default connector(Menu);
export { Menu };
