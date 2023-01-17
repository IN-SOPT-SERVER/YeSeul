import express, { NextFunction, Request, Response } from "express";
import router from "./router";

const app = express(); // express 객체 받아옴
const PORT = 3000; // 사용할 port를 3000번으로 설정

app.use(express.json()); // express 에서 request body를 json 으로 받아오겠다.


app.use("/", router);

//* HTTP method - GET
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("netfilx");
});

app.listen(PORT, () => {
  console.log(`
        #############################################
            🛡️ Server listening on port: ${PORT} 🛡️
        #############################################
    `);
}); // 3000 번 포트에서 서버를 실행하겠다!
