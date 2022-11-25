const http = require("http"); //기본으로 내장된 http 모듈

const port = 3000;

http
    .createServer((req, res) => { //인수로 요청에 대한 콜백 함수, 이 콜백 함수에 응답을 적으면 됨 !
        //req 객체: 요청(request)에 관한 정보, res 객체: 응답(response)에 관한 정보
        res.write("<h1>IN SOPT SERVER!</h1>");
        res.end("<p>awesome</p>");
    })
    .listen(port, () => { //서버 연결
        console.log(`${port} 번 포트에서 대기중 !`);
    });