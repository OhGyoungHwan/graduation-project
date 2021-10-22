var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');
var cors = require("cors");
 
var app = express();
var whitelist = ['https://example.com/MaterialIcons-Regular.woff2']
var corsOptions = {
  origin: function(origin, callback){
  var isWhitelisted = whitelist.indexOf(origin) !== -1;
  callback(null, isWhitelisted); 
  // callback expects two parameters: error and options 
  },
  credentials:true
}

// express 포트 설정 
app.set('port', process.env.PORT || 3000);
 
// public 폴더 안에 있는 파일을 사용할 수 있는 static 
app.use(static(path.join(__dirname, "public")));

app.use(cors(corsOptions)); 

app.get('/',function(req,res){
    res.sendFile(__dirname+'/home.html');
});
 
// 서버 생성 
var server = http.createServer(app).listen(app.get('port') , function(){
    console.log('익스프레스로 웹 서버 실행 : ' + app.get('port'));
}); 
