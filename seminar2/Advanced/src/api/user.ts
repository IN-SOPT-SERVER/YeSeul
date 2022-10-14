// user.ts
import { Request, Response } from "express";

const getUser = (req: Request, res: Response) => {

    return res.status(200).json({
        status: 200,
        message: "유저 조회 성공",
        data: {
            name: "yeseul",
            address: "잠실새내역"
        }
    });
};

export default getUser;