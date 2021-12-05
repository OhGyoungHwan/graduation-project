import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import OneSignal from 'react-onesignal';

import * as root from './rootValue';

const theme = createTheme({
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
/*
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
*/
ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root'),
);
reportWebVitals();

OneSignal.init({
  appId: "4c98f8db-528d-4b71-9a41-0d2cd9c5c7ac"
});