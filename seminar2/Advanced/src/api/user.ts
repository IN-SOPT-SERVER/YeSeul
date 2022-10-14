// user.ts
import { Request, Response } from "express";

const getUser = (req: Request, res: Response) => { // 각 요청/응답에 대한 로직을 함수로 작성

    return res.status(200).json({
        status: 200,
        message: "유저 조회 성공",
        data: {
            name: "yeseul",
            address: "잠실새내역"
        }
    });
};

export default getUser; // 모듈화 해준 뒤 export 해서 userRouter 함수에서 사용