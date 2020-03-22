import { Box } from 'grommet';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import styled from 'styled-components';
import levels from '../../data/levels.json';


interface MatchParams {
  level: string;
}

interface LevelProps extends RouteComponentProps<MatchParams> {
}

const H1 = styled.h1`
  text-align: center;
`;

function Level({ match }: LevelProps) {
  const levelIndex = +match.params.level;
  const levelData = levels[levelIndex];

  if (!levelData) {
    return <Redirect to="/select-level"/>;
  }

  return (
    <Box width="medium">
      <header>
        <H1>{levelData.name}</H1>
      </header>
      <Box width="medium" gap="small" align="stretch">
      </Box>
    </Box>
  );
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
  };
}


export default connect(null, mapDispatchToProps)(Level);
