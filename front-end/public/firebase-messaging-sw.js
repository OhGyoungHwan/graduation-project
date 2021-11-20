importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// firebase에서 웹앱 생성 시, 
const config = {
  apiKey: "AIzaSyCwNZMrHNktfr1lY6hbPYiJxzdL8HzUD-A",
  authDomain: "web-react-1117.firebaseapp.com",
  projectId: "web-react-1117",
  storageBucket: "web-react-1117.appspot.com",
  messagingSenderId: "1080998228103",
  appId: "1:1080998228103:web:133119c94357b1df79c822",
  measurementId: "G-GHK7LVF781"
};

// eslint-disable-next-line no-undef
firebase.initializeApp(config);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo192.png",
  };

  // eslint-disable-next-line no-restricted-globals
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

const option = {
  method: 'POST',
  url: 'https://fcm.googleapis.com/fcm/send', //FCM 서버의 주소 수정X
  json: {
    // 'to'에서는 서버에서 얻은 token 값을 넣어줌 < 현재 수동
    'to': 'ewzlOTbhLBM:APA91bFCMrsdo0Oi-V3F6Jw8b_02T8wxJvFJRrSivJWAwVziwV3iA_GTwYSfGNySpFxkezB12gIWGylpY9aoOOzmvfoY9OiUyoxKMCTqSiinJ3mEkeZoBkF0SuUo8Qbb81tfFgm-4F8h',
    'title': 'Caii 영어 챗봇', //알림의 제목에 해당하는 부분
    'body': '지금 바로 영어회화 공부하세요 :-)', //알림의 본문에 해당하는 부분
    'url':'https://caii_en.sumai.co.kr/', // 클릭 시 접속하도록 설정
  },
  headers: {
    'Content-Type': 'application/json',
    // 서버에서 얻은 token 값 앞에 'key='를 붙여 사용
    'Authorization': 'key=ewzlOTbhLBM:APA91bFCMrsdo0Oi-V3F6Jw8b_02T8wxJvFJRrSivJWAwVziwV3iA_GTwYSfGNySpFxkezB12gIWGylpY9aoOOzmvfoY9OiUyoxKMCTqSiinJ3mEkeZoBkF0SuUo8Qbb81tfFgm-4F8h' //위에서 찾았던 서버키 앞에 'key='을 붙여서 사용합니다.
  }
}