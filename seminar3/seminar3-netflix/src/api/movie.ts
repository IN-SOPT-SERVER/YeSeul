import { Request, Response } from "express";
import { Movie } from '../interface/Movie';
import { data } from "../database/movie";

const getMovie = (req:Request, res:Response) => {
    //req.param 찍어보기
    console.log(req.params.mediaId);
    //console.log(typeof(req.params.mediaId)); //string

    //클라이언트가 요청하는 mediaId의 영화 정보(json) 넘겨주기
    const movie = data.find((m: Movie) => {
        return m.title === req.params.mediaId;
    });

    if (!movie) {
        return res.status(400).json({errorMessage:" Movie was not found... "});
    } 
    
    return res.status(200).json(movie);
};

export default getMovie;