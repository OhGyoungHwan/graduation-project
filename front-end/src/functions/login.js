import { useSelector, useDispatch } from 'react-redux';
import { getStatusRequest, getStatusFailure } from '../actions/authentication';
import { useHistory } from 'react-router-dom';
import { onLogout } from './logout';


function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(store => store.authentication.status.isLoggedIn);

  function onLogin() {
    if (!navigator.cookieEnabled && isLoggedIn) {
      history.push('/');

      onLogout();
    }

    login();
  }

  function login() {
    let loginData = getCookieByName('key');

    if (typeof loginData === "undefined") {
      dispatch(getStatusFailure())
      return
    };

    loginData = JSON.parse(atob(loginData));

    if (!loginData.isLoggedIn) {
      dispatch(getStatusFailure())
      return
    };

    getStatusRequest().then(
      (res) => {
        if (res.type === "AUTH_GET_STATUS_FAILURE") {
          console.log(res);
          onLogout();
        }
      }
    )
  }


  function getCookieByName(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  return onLogin;
}

export default Login;