import { CheckBox } from 'grommet';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState, settingsActions, settingsSelectors } from '../../state';
import BackButton from '../BackButton';
import Screen from '../Screen';


interface SettingsProps extends ConnectedProps<typeof connector> {
}

function Settings({ displayOnScreenControls, toggleOnScreenControls }: SettingsProps) {
  return (
    <Screen title="Settings">
      <CheckBox label="Display on-screen controls (required on devices without a keyboard)"
                checked={displayOnScreenControls}
                onChange={toggleOnScreenControls}
      />
      <BackButton/>
    </Screen>
  );
}

function mapStateToProps(state: RootState) {
  return {
    displayOnScreenControls: settingsSelectors.displayOnScreenControls(state.settings)
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    toggleOnScreenControls: () => dispatch(settingsActions.toggleOnScreenControls())
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);


export default connector(Settings);
export { Settings };
