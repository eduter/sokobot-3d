import { Box } from 'grommet';
import React from 'react';
import styled from 'styled-components';

interface ScreenProps {
  title: string;
  children: React.ReactNode;
}

const H1 = styled.h1`
  text-align: center;
`;

function Screen({ title, children }: ScreenProps) {
  return (
    <Box width="medium">
      <header>
        <H1>{title}</H1>
      </header>
      <Box width="medium" gap="small" align="stretch">
        {children}
      </Box>
    </Box>
  );
}

export default Screen;
