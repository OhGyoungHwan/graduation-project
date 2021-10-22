const http = require('http');
const url = require('url');
const fs = require('fs');
const hostname = '0.0.0.0';
const port = 3000;

var mime = require('mime');

http.createServer((request, response) => {
  const path = url.parse(request.url, true).pathname; // url에서 path 추출
  var resource = path;
  console.log(resource);
    
  if (request.method === 'GET') { // GET 요청이면
    if (path === '/about') { // 주소가 /about이면
      response.writeHead(200,{'Content-Type':'text/html'}); // header 설정
      fs.readFile(__dirname + '/home.html', (err, data) => { // 파일 읽는 메소드
        if (err) {
          return console.error(err); // 에러 발생시 에러 기록하고 종료
        }
        response.end(data, 'utf-8'); // 브라우저로 전송
      });
    } else if (path === '/') { // 주소가 /이면
      response.writeHead(200,{'Content-Type':'text/html'});
      fs.readFile(__dirname + '/home.html', (err, data) => {
        if (err) {
          return console.error(err);
        }
        response.end(data, 'utf-8');
      });
    } else if (resource.indexOf('/images/') == 0) {
        var imgPath = resource.substring(1);
        console.log('imgPath='+imgPath);
        var imgMime = mime.getType(imgPath);
        console.log('mime='+imgMime);
        fs.readFile(imgPath, function(error, data) {
          if(error){
            response.writeHead(500, {'Content-Type':'text/html'});
            response.end('500 Internal Server '+error);
          }else{
            response.writeHead(200, {'Content-Type':imgMime});
            response.end(data);
          }
        });
    }
      else { // 매칭되는 주소가 없으면
      response.statusCode = 404; // 404 상태 코드
      response.end('주소가 없습니다');
    }
  }
}).listen(3000);