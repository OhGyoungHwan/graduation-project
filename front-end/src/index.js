import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import * as root from './rootValue';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'NotoSansKR-Medium',
  },
  breakpoints: {
    values: {
      xs: 0,
      xsm: 360,
      sm: 600,
      md: 720,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: root.PrimaryColor,
    },
    secondary: {
      main: root.SecondaryColor,
    },
  },
});

export const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
