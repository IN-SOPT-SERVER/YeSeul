// movie.ts
import { Request, Response } from "express";

const getMovie = (req: Request, res: Response) => {
    return res.status(200).json({ //Status Code: 200은 성공을 의미..
        status: 200,
        message: "영화 조회 성공",
        data: {
            name: "이프 온리",
            genre: "로맨스",
            runningTime: "96m"
        }
    });
};

export default getMovie;