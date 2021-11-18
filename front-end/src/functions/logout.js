import { logoutRequest } from './../actions/authentication';

export function onLogout() {
  logoutRequest().finally(
    () => {
      let domainIndex = window.location.hostname.indexOf('.') // ex) asdf.good.com -> 5 (.의 위치)
      let domainName
      if (domainIndex === -1) domainName = window.location.hostname // .을 못 찾은 경우 그대로 씀 -> localhost
      else domainName = window.location.hostname.substr(domainIndex) // .이 있는 경우 -> .good.com

      let loginData = {
        isLoggedIn: false,
        email: ''
      };
      document.cookie = 'key=' + btoa(JSON.stringify(loginData)) + ';domain=' + domainName + ';path=/;';
    }
  );
}