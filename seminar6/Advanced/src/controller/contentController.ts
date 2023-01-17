import { Request, Response } from "express";
import { rm, sc } from "../constants";
import { fail, success } from "../constants/response";
import { ContentResDTO } from "../interfaces/content/ContentResDTO";
import { ContentRatingDeleteDTO } from "../interfaces/contentRating/ContentRatingDeleteDTO";
import { ContentRatingDTO } from "../interfaces/contentRating/ContentRatingDTO";
import { contentService } from "../service";


//* 컨텐츠 평가 생성
// POST /content/rating/:contentId
const createContentRating = async (req: Request, res: Response) => {
    const { contentId } = req.params;

    //0: 맘에 안들어요, 1: 좋아요, 2: 최고에요
    const ContentRatingDto: ContentRatingDTO = req.body;

    const data = await contentService.createContentRating(+contentId, ContentRatingDto); 

    if (!data) {
        return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.CREATE_RATING_FAIL));
    }
    return res.status(sc.CREATED).send(success(sc.CREATED, rm.CREATE_RATING_SUCCESS, data));
};

//* 컨텐츠 내용 조회
// GET contents/:contentId
const getContentById = async (req: Request, res: Response) => {
    const { contentId } = req.params;

    const data = await contentService.getContentById(+contentId);

    if (!data) {
        return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.READ_CONTENT_FAIL));
    }
    return res.status(sc.OK).send(success(sc.OK, rm.READ_CONTENT_SUCCESS, data)); 
};

//* 컨텐츠 평가 조회
//* GET /content/rating
const getContentRating = async (req: Request, res: Response) => {
    const ContentRatingDto : ContentRatingDTO = req.body;

    const data = await contentService.getContentRating(ContentRatingDto);

    if (!data) {
        return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.NO_CONTENT_RATING));
    }
    return res.status(sc.OK).send(success(sc.OK, rm.READ_CONTENT_RATING_SUCCESS)); 
};

//* 컨텐츠 평가 업데이트
//* PATCH /contents/rating
const updateContentRating = async (req: Request, res: Response) => {
    const ContentRatingDto : ContentRatingDTO = req.body;

    const data = await contentService.updateContentRating(ContentRatingDto); 
    
    if (!data) {
        return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.UPDATE_RATING_FAIL));
    }
    return res.status(sc.OK).send(success(sc.OK, rm.UPDATE_RATING_SUCCESS)); 

};

//* 컨텐츠 평가 삭제
//* DELETE /content/rating
const deleteContentRating = async (req: Request, res: Response) => {
    const ContetnRatingDeleteDto : ContentRatingDeleteDTO = req.body;

    const data = await contentService.deleteContentRating(ContetnRatingDeleteDto); 
    
    return res.status(sc.OK).send(success(sc.OK, rm.DELETE_RATING_SUCCESS)); 
};

//* 평가 전체 조회
const getAllRating = async (req: Request, res: Response) => {
    const data = await contentService.getAllRating();

    if(!data){
        return res.status(sc.NO_CONTENT).send(success(sc.NO_CONTENT, rm.READ_ALL_RATING_SUCCESS, data))
      }
      return res.status(sc.OK).send(success(sc.OK, rm.READ_ALL_RATING_SUCCESS, data))
};

const contentController = {
    createContentRating,
    getContentById,
    getContentRating,
    updateContentRating,
    deleteContentRating,
    getAllRating
};
  
export default contentController;