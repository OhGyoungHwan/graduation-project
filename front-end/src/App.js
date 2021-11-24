import React, {useEffect} from 'react';
import 'firebase/analytics';
import "firebase/messaging";
import OneSignal from 'react-onesignal';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';

import './App.css';
import './components/main/Main.css';
import Main from './components/main/Main';
import Call from './components/call/Call';
import NotFound from './components/NotFound';

import useLogin from './functions/login';

function App() {

  useEffect(() => {
    OneSignal.init({
      appId: "4c98f8db-528d-4b71-9a41-0d2cd9c5c7ac"
    });
  });

  const login = useLogin();
  React.useEffect(() => {
    login();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onHandleTag = (tag) => {
    console.log('Tagging');
    OneSignal.sendTag('tech', tag).then(() => {
      console.log('Send tag : '+ tag);
    });
  }

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
