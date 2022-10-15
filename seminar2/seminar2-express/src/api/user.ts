import express, { Request, Response, Router } from "express";
//express 모듈에서 express, (request, response, router)-> 타입 정의를 위해 불러옴!

const router: Router = express.Router(); // express의 라우팅 시스템!

router.get("/", (req: Request, res: Response) => { //* GET ~/으로 요청이 들어온다면
    return res.status(200).json({ // 여기 있는 로직을 수행!
        status:200,
        message: "유저 조회 성공",
    });
});

module.exports = router; // 위에서 생성한 router 객체를 어디서든 사용하도록 모듈화