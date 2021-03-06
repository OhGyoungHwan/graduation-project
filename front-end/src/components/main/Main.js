import './Main.css';
import Box from '@material-ui/core/Box';
import React from 'react';
import * as OneSignal from 'onesignal-node'; 

import { useTheme, useMediaQuery } from '@material-ui/core';

import Header from '../header/Header';
import Body from './Body/Body';

function App() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const xsm = useMediaQuery(theme.breakpoints.up('xsm'));

  return (
    <Box>
      <Header />
      <Body />
    </Box>
  );
}

export default App;
