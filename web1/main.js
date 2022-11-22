// 웹 서버 실행 => node main.js
var http = require('http'); 
var fs = require('fs');
var url = require('url'); // url(모듈)이라는걸 요구한다. nodejs에 갖고 있는 모듈임

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url,true).query;
    
    console.log(url.parse(_url,true)); // 여기에는 url parse한 객체가 나옴. 뭐 호스트네임, pathname, hash, href, query 등등

    if(url.parse(_url,true).pathname === '/'){
      if(queryData.id === undefined){
        var title = 'welcome';
        var content ='Hello Nodejs';
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
          `;
          response.writeHead(200); // http head에 200 코드면 요청에 성공했다는 코드
          //fs.readFileSync() -> 들어간 인자의 경로에 해당하는 파일을 읽어서 그 값을 가져와서 반환(문자열로 반환?)
          response.end(template); // template를 인자로 넣어주면 그 값을 response로 보내줌
      }else{
        fs.readFile('data/'+ queryData.id, 'utf8', function(err, data){ // 'sample.txt'에 있는 값을 utf8 언어 셋으로 가져오고 callback으로 function 넣어주기
          var title = queryData.id;
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
          `;
          response.writeHead(200); // http head에 200 코드면 요청에 성공했다는 코드
          //fs.readFileSync() -> 들어간 인자의 경로에 해당하는 파일을 읽어서 그 값을 가져와서 반환(문자열로 반환?)
          response.end(template); // template를 인자로 넣어주면 그 값을 response로 보내줌
        });
      }
    }else {
      response.writeHead(404); // http head에 404면 요청에 실패했다는 코드
      response.end('Not Found'); // 실패했으니까 404를 띄운다.
    }
    
    
    
    
    
    
   
    
 
});
app.listen(3000); // localhost:3000에서 실행하겠다 라는 뜻