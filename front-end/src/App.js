import React, {useEffect, useState} from 'react';
import 'firebase/analytics';
import "firebase/messaging";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';

import './App.css';
import './components/main/Main.css';
import Main from './components/main/Main';
import Call from './components/call/Call';
import NotFound from './components/NotFound';

import useLogin from './functions/login';

function App() {
  const login = useLogin();
  React.useEffect(() => {
    login();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      {/* <ClientInfoComponent />  */}
      <Switch>
        <Route exact path='/' component={Main} />

        <Route exact path='/call' component={Call} />

        <Route component={NotFound} status={404} />
      </Switch>
    </Router>
  );
}

export default App;
