import firebase from "firebase/app";
import "firebase/messaging";

// Firebase SDK
const firebaseConfig = {
  apiKey: "AIzaSyCwNZMrHNktfr1lY6hbPYiJxzdL8HzUD-A",
  authDomain: "web-react-1117.firebaseapp.com",
  projectId: "web-react-1117",
  storageBucket: "web-react-1117.appspot.com",
  messagingSenderId: "1080998228103",
  appId: "1:1080998228103:web:133119c94357b1df79c822",
  measurementId: "G-GHK7LVF781"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// .env.production public key 
const { REACT_APP_VAPID_KEY } = process.env;
const publicKey = REACT_APP_VAPID_KEY;

// token 값 얻기 > 보낼 대상의 정보 수집
export const getToken = async (setTokenFound) => {
  let currentToken = "";

  try {
    currentToken = await messaging.getToken({ vapidKey: publicKey });
    if (currentToken) {
      setTokenFound(true);
    } else {
      setTokenFound(false);
    }
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error);
  }

  return currentToken;
};
// push message
export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
