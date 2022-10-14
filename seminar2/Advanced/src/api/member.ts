// members.ts
import { Request, Response } from "express";

const getMember = (req: Request, res: Response) => {
    return res.status(200).json({ //Status Code: 200은 성공을 의미..
        status: 200,
        message: "멤버 조회 성공",
        data: [
            {
              name: "권세훈",
              group: "ob",
            },
            {
              name: "조예슬",
              group: "yb",
            },
            {
              name: "최승빈",
              group: "ob",
            },
            {
              name: "소예원",
              group: "yb",
            }
          ]
    });
};

export default getMember;