import { Request, Response } from "express";
import { contentService } from "../service";


//* 컨텐츠 평가 생성
// POST /content/rating/:contentId
const createContentRating = async (req: Request, res: Response) => {
    const { contentId } = req.params;

    //0: 맘에 안들어요, 1: 좋아요, 2: 최고에요
    const { rating, profileId } = req.body;

    const data = await contentService.createContentRating(+contentId, +profileId, +rating); 

    if (!data) {
        return res.status(404).json({ status: 404, message: "컨텐츠 평가 생성 실패" });
    }
    return res.status(200).json({ status: 200, message: "컨텐츠 평가 생성 성공", data }); 
};

//* 콘텐츠 내용 조회
// GET contents/:contentId
const getContentById = async (req: Request, res: Response) => {
    const { contentId } = req.params;

    const data = await contentService.getContentById(+contentId); 

    if (!data) {
        return res.status(404).json({ status: 404, message: "해당 컨텐츠 조회 실패" });
    }
    return res.status(200).json({ status: 200, message: "해당 컨텐츠 조회 성공", data }); 
};

//* 콘텐츠 평가 조회
const getContentRating = async (req: Request, res: Response) => {
    const { contentId } = req.params;
    const { profileId } = req.body;

    const data = await contentService.getContentRating(+contentId, +profileId);

    if (!data) {
        return res.status(404).json({ status: 404, message: "해당 컨텐츠 평가 조회 실패" });
    }
    return res.status(200).json({ status: 200, message: "해당 컨텐츠 평가 조회 성공", data }); 
};

//* 컨텐츠 평가 업데이트
// PATHCH /contents/rating
const updateContentRating = async (req: Request, res: Response) => {
    const { contentId, profileId, rating } = req.body;

    const data = await contentService.updateContentRating(+contentId, +profileId, +rating); 
    
    if (!data) {
        return res.status(404).json({ status: 404, message: "컨텐츠 평가 업데이트 실패" });
    }
    return res.status(200).json({ status: 200, message: "컨텐츠 평가 업데이트 성공", data }); 

};

//* 컨텐츠 평가 삭제
const deleteContentRating = async (req: Request, res: Response) => {
    const { contentId, profileId } = req.body;

    const data = await contentService.deleteContentRating(+contentId, +profileId); 
    
    return res.status(200).json({ status: 200, message: "컨텐츠 평가 삭제 성공", data }); 
};

//* 평가 전체 조회
const getAllRating = async (req: Request, res: Response) => {
    const data = await contentService.getAllRating();

  return res.status(200).json({ status: 200, message: "평가 전체 조회 성공", data });
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