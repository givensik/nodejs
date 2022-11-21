var fs = require('fs'); // file system 모듈 fs를 가져오기

fs.readFile('sample.txt', 'utf8', function(err, data){ // 'sample.txt'에 있는 값을 utf8 언어 셋으로 가져오고 callback으로 function 넣어주기
  console.log(data);
});