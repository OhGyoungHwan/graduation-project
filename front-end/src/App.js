import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import './components/main/Main.css';
import Main from './components/main/Main';
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

        <Route component={NotFound} status={404} />
      </Switch>
    </Router>
  );
}

export default App;
