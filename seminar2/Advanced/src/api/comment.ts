// comment.ts
import { Request, Response } from "express";

const getComment = (req: Request, res: Response) => {
    return res.status(200).json({ //Status Code: 200은 성공을 의미..
        status: 200,
        message: "댓글 조회 성공",
        data: "라우팅 재밌으면서 어려워요...빙글빙글..."
    });
};

export default getComment;