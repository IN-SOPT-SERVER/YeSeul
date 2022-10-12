"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)(); // express 객체를 받아옴
const PORT = 3000; // 사용할 port를 3000번으로 설정
app.use(express_1.default.json()); // express 에서 request body를 json 으로 받아오겠다.
// app.use("/api", require("./api")); // use -> 모든 요청
//localhost:8000/api -> api 폴더
//localhost:8000/api/user -> user.ts
//* HTTP method - GET
app.get("/", (req, res, next) => {
    res.send("마! 이게 서버다! 조금 바꿔보겠다..");
});
app.listen(PORT, () => {
    console.log(`
        ###############################################
            🛡️ Server listening on port: ${PORT} 🛡️
        ###############################################
    `);
}); // 8000 번 포트에서 서버를 실행하겠다!
//# sourceMappingURL=index.js.map