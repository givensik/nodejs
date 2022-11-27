// 웹 서버 실행 => node main.js
var http = require('http'); 
var fs = require('fs');
var url = require('url'); // url(모듈)이라는걸 요구한다. nodejs에 갖고 있는 모듈임
const path = require('path');
const querystring = require('node:querystring');

function templateHTML(title, list, content){
  return `<!doctype html>
    <html>
      <head>
        <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
            ${list}
            <a href ='/create'>Create</a>
            <h2>${title}</h2>
            ${content}
      </body>        
    </html>
              `
}

function listHTML(filelist){
  
  var list = '<ul>';
  var i = 0;
  while(i < filelist.length){
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i = i + 1;
  }
  list = list+'</ul>';
  return list;
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url,true).query;
    
    console.log(url.parse(_url,true)); // 여기에는 url parse한 객체가 나옴. 뭐 호스트네임, pathname, hash, href, query 등등

    var list = '';
    var pathname = url.parse(_url,true).pathname;
    if(pathname === '/'){

      if(queryData.id === undefined){
          // var list = makeList();
          fs.readdir('./data', function(error, filelist){
            var title = 'Welcome';
            var list = listHTML(filelist);
            var content ='Hello Nodejs';
            var template =templateHTML(title, list, content);
              response.writeHead(200); // http head에 200 코드면 요청에 성공했다는 코드
              //fs.readFileSync() -> 들어간 인자의 경로에 해당하는 파일을 읽어서 그 값을 가져와서 반환(문자열로 반환?)
              response.end(template); // template를 인자로 넣어주면 그 값을 response로 보내줌
          });
      }else{
        fs.readFile('data/'+ queryData.id, 'utf8', function(err, data){ // 'sample.txt'에 있는 값을 utf8 언어 셋으로 가져오고 callback으로
          fs.readdir('./data', function(error, filelist){
            var list= listHTML(filelist);
            var title = queryData.id;
            var content = data;
            // template 만들기
            var template =templateHTML(title, list, content);
            response.writeHead(200); // http head에 200 코드면 요청에 성공했다는 코드
            //fs.readFileSync() -> 들어간 인자의 경로에 해당하는 파일을 읽어서 그 값을 가져와서 반환(문자열로 반환?)
            response.end(template); // template를 인자로 넣어주면 그 값을 response로 보내줌
          });
        });
      }
    }else if(pathname === '/create'){
      fs.readdir('./data', function(error, filelist){
        var title = 'Create';
        var list = listHTML(filelist);
        var content =` 
        <form action ='http://localhost:3000/create_process' method ='post'> 
          <p><input type ='text' name = 'title' placeholder ='title'></p>
          <p>
              <textarea name ='content'></textarea>
          </p>
          <p>
              <input type="submit" >
          </p>
        </form> `;
        var template =templateHTML(title, list, content);
          response.writeHead(200); // http head에 200 코드면 요청에 성공했다는 코드
          //fs.readFileSync() -> 들어간 인자의 경로에 해당하는 파일을 읽어서 그 값을 가져와서 반환(문자열로 반환?)
          response.end(template); // template를 인자로 넣어주면 그 값을 response로 보내줌
      });

    }else if(pathname === '/create_process'){
      var body =''
      //웹 브라우저가 post 방식으로 데이터를 보낼 때, 보내는 양이 많으면 아래와 같은 방법으로 
      request.on('data',function(data){
        body = body + data;
      })
      request.on('end', function(){
        var post = querystring.parse(body); // 받은 데이터를 객체화 한다.
        console.log(post);
        var title = post.title;
        var content = post.content;
        /**
         * 파일 쓰기 함수
         * 인자 : data경로 , 파일에 쓸 내용, 언어 형식, 콜백 함수
         */
        fs.writeFile(`data/${title}`,content,'utf-8',function(err){
          response.writeHead(302,{Location : `/?id=${title}`}); 
          response.end('success'); 
        });
      });

    }else {
      response.writeHead(404); // http head에 404면 요청에 실패했다는 코드
      response.end('Not Found'); // 실패했으니까 404를 띄운다.
    }
    
    
    
    
    
    
   
    
 
});
app.listen(3000); // localhost:3000에서 실행하겠다 라는 뜻