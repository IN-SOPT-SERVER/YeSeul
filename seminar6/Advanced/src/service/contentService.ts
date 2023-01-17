import { PrismaClient } from "@prisma/client";
import { ContentResDTO } from "../interfaces/content/ContentResDTO";
import { ContentRatingDeleteDTO } from "../interfaces/contentRating/ContentRatingDeleteDTO";
import { ContentRatingDTO } from "../interfaces/contentRating/ContentRatingDTO";
const prisma = new PrismaClient();

//* 컨텐츠 평가 생성
const createContentRating = async (contentId : number, ContentRatingDto : ContentRatingDTO) => {
    const data = await prisma.rating.create({
      data: {
        contentId,
        profileId : ContentRatingDto.profileId,
        rating : ContentRatingDto.rating
      }
    });
    return data;
};

//* 컨텐츠 내용 조회
const getContentById = async (contentId : number) : Promise<ContentResDTO | null>=> {
    const data = await prisma.content.findUnique({
        where : {
            id : contentId
        }
    });
    return data;
};

//* 컨텐츠 평가 내용 조회
const getContentRating = async (ContentRatingDto : ContentRatingDTO)=> {
    const data = await prisma.rating.findMany({
        where : {
            contentId : ContentRatingDto.contentId,
            profileId : ContentRatingDto.profileId
        },
        select : {
            Content : {
                select : {
                    title : true
                }
            },
            Profile : {
                select : {
                    name : true
                }
            }
        }
    });
    return data;
};

//* 컨텐츠 평가 업데이트
const updateContentRating = async (ContentRatingDto : ContentRatingDTO) => {
    const data = await prisma.rating.updateMany({
        where : {
            contentId : ContentRatingDto.contentId,
            profileId : ContentRatingDto.profileId
        },
        data: {
            rating : ContentRatingDto.rating
        }
    });
    return data;
};

//* 컨텐츠 평가 삭제
const deleteContentRating = async (ContentRatingDeleteDto : ContentRatingDeleteDTO) => {
    await prisma.rating.deleteMany({
        where : {
            contentId : ContentRatingDeleteDto.contentId,
            profileId : ContentRatingDeleteDto.profileId
        }
    });
};

//* 평가 전체 조회
const getAllRating = async () : Promise<ContentRatingDTO[]> => {
    const data = await prisma.rating.findMany();
    return data;
};

const contentService = {
    createContentRating,
    getContentById,
    getContentRating,
    updateContentRating,
    deleteContentRating,
    getAllRating
};

export default contentService;