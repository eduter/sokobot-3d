import { Previous } from 'grommet-icons';
import { Button } from 'grommet';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { goBack } from 'connected-react-router';
import React from 'react';


type BackButtonProps = {
  goBack: () => void
};

function BackButton({ goBack }: BackButtonProps) {
  return <Button icon={<Previous/>} label="Back" onClick={() => goBack()}/>;
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    goBack() {
      dispatch(goBack());
    }
  };
}

export default connect(null, mapDispatchToProps)(BackButton);
