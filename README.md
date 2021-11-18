## 설치파일목록
    1. npm install mime

## 실행 방법 (기존과 동일)
cd ./front-end
npm start

## 실행 시, 참고사항

$ npm init
$ npm install --save firebase
$ npm install firebase-tools

npm start 안 될 때 사용한 방법
방법 1,
1. npm install create-react-app
* package 이름 생성 후, 진행
* 예시로 web-push라 지었음

2. npx create-react-app (name of file)
* 생성한 이름을 넣어주면 됨

3. cd (new directory)
4. npm start
* front-end/web-push는 이전에 npm start 오류로 인해 생성했으나,
  front-end > npm start 및 알림 설정이 가능(웹페이지 처음 접속 시, 알림 기능을 킬지말지 뜸)하게 수정하였으며, /web-push는 삭제 하지 않음

방법 2,
npm install --save start

Error: Cannot find module 'localforage' 해결방법

npm install --save localforage
npm install --save localforage-cordovasqlitedriver
