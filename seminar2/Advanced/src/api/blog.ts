// blog.ts
import { Request, Response } from "express";

const getBlog = (req: Request, res: Response) => {
    return res.status(200).json({ //Status Code: 200은 성공을 의미..
        status: 200,
        message: "블로그 조회 성공",
        data: "-------블로그 내용-------"
    });
};

export default getBlog;