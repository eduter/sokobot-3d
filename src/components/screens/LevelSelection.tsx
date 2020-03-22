import { push } from 'connected-react-router';
import { Box, Button } from 'grommet';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';
import levels from '../../data/levels.json';


interface LevelSelectionProps {
  selectLevel: (level: number) => void
}

const H1 = styled.h1`
  text-align: center;
`;

function LevelSelection({ selectLevel }: LevelSelectionProps) {
  return (
    <Box width="medium">
      <header>
        <H1>Select Level</H1>
      </header>
      <Box width="medium" gap="small" align="stretch">
        {levels.map(({ name }, index) => (
          <Button key={index} label={name} onClick={() => selectLevel(index)}/>
        ))}
      </Box>
    </Box>
  );
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    selectLevel: (level: number) => dispatch(push(`/level/${level}`))
  };
}


export default connect(null, mapDispatchToProps)(LevelSelection);
