import { goBack } from 'connected-react-router';
import { Button } from 'grommet';
import { Previous } from 'grommet-icons';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';


interface BackButtonProps extends ConnectedProps<typeof connector> {
}

function BackButton({ goBack }: BackButtonProps) {
  return <Button icon={<Previous/>} label="Back" onClick={() => goBack()}/>;
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    goBack: () => dispatch(goBack())
  };
}

const connector = connect(null, mapDispatchToProps);


export default connector(BackButton);
export { BackButton };
