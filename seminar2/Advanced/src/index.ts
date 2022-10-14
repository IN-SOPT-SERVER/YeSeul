//index.ts는 user의 request가 가장 먼저 도달하는 ts이다.
//여기서 각각의 router들에게 request를 넘겨주어 처리를 한다.

import express, {NextFunction, Request, Response } from "express";
import indexRouter from './router/index'; //분기를 해줄 index 라우터 모듈

const app = express(); // express 객체를 받아옴
const PORT = 3000; // 사용할 port를 3000번으로 설정
app.use(express.json()); // express 에서 request body를 json 으로 받아오겠다.

app.use("/api", indexRouter); // use -> 모든 요청

//* HTTP method - GET
app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("2차 세미나 안 듣고 과제 하려니까 죽을 맛이다...");
});

app.listen(PORT, () => {
    console.log(`
        ###############################################
            🛡️ Server listening on port: ${PORT} 🛡️
        ###############################################
    `);
}); // 8000 번 포트에서 서버를 실행하겠다!