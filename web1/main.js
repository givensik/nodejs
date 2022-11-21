// 웹 서버 실행 => node main.js
var http = require('http'); 
var fs = require('fs');
var url = require('url'); // url(모듈)이라는걸 요구한다. nodejs에 갖고 있는 모듈임

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url,true).query;
    var title = queryData.id;
    
    console.log('/data/'+ queryData.id);
    
    if(_url == '/'){//localhost:3000/일때
      // _url = '/index.html';
      title="welcome";
    }
    if(_url == '/favicon.ico'){
        response.writeHead(404);
        response.end();
        return;
    }
    response.writeHead(200);
    fs.readFile('data/'+ queryData.id, 'utf8', function(err, data){ // 'sample.txt'에 있는 값을 utf8 언어 셋으로 가져오고 callback으로 function 넣어주기
      var content = data;
      // template을 만들기
      var template =`<!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        <ol>
          <li><a href="/?id=html">HTML</a></li>
          <li><a href="/?id=css">CSS</a></li>
          <li><a href="/?id=javascript">JavaScript</a></li>
        </ol>
        <h2>${title}</h2>
        ${content}
      </body>
      </html>
      `
      //fs.readFileSync() -> 들어간 인자의 경로에 해당하는 파일을 읽어서 그 값을 가져와서 반환(문자열로 반환?)
      response.end(template); // template를 인자로 넣어주면 그 값을 response로 보내줌
    });
    
    
    
   
    
 
});
app.listen(3000); // localhost:3000에서 실행하겠다 라는 뜻