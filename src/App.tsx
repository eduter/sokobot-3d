import React from 'react';
import MainMenu from './components/MainMenu';
import { Box, Main } from 'grommet';
import styled from 'styled-components';

function Header() {
  const H1 = styled.h1`
    text-align: center;
  `;

  return (
    <header>
      <H1>Sokobot 3D</H1>
    </header>
  );
}

function App() {
  return (
    <Main align="center">
      <Box width="medium">
        <Header/>
        <MainMenu/>
      </Box>
    </Main>
  );
}

export default App;
