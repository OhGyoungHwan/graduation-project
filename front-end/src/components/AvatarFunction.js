import CryptoJS from 'crypto-js';


export function rename(name) {
  if (name === undefined) return;

  let rename = '';

  if (/[a-zA-Z0-9]/.test(name.charAt(0))) {
    rename = name.charAt(0);
  } else if (name.length >= 3) {
    if (/[a-zA-Z0-9]/.test(name.substring(name.length - 2, name.length))) {
      rename = name.charAt(0);
    } else {
      rename = name.substring(name.length - 2, name.length);
    }
  } else {
    rename = name;
  }

  return rename;
}

export function color(id) {
  if (id === undefined) return;

  return '#' + CryptoJS.MD5(id).toString().substring(1, 7);
}