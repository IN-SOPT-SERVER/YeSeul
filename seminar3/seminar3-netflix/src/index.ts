import express, {NextFunction, Request, Response } from "express";
import indexRouter from './router/index';

const app = express();
const PORT = 3000; // 사용할 port를 3000번으로 설정
app.use(express.json());

app.use("/", indexRouter);

app.get("/", (req:Request, res:Response, next:NextFunction) => {
    res.send("... 넷플릭스 ...");
});

app.listen(PORT, () => {
    console.log(`
    ###############################################
        🛡️ Server listening on port: ${PORT} 🛡️
    ###############################################
    `);
});