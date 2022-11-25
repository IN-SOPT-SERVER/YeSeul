import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//* 컨텐츠 평가 생성
const createContentRating = async (contentId: number, profileId: number, rating: number) => {
    const data = await prisma.rating.create({
      data: {
        Content : {
            connect : {
                    id : contentId
            }
        },
        Profile : {
            connect : {
                    id : profileId
            }
        },
        rating
      }
    });
    return data;
};

//* 컨텐츠 내용 조회
const getContentById = async (contentId : number) => {
    const data = await prisma.content.findUnique({
        where : {
            id : contentId
        }
    });
    return data;
};

//* 컨텐츠 평가 내용 조회
const getContentRating = async (contentId: number, profileId: number) => {
    const data = await prisma.rating.findMany({
        where : {
            Content : {
                id : contentId
            },
            Profile : {
                id: profileId
            }
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
const updateContentRating = async (contentId: number, profileId: number, rating: number) => {
    const data = await prisma.rating.updateMany({
        where :{
            contentId,
            profileId
        },
        data: {
            rating
        }
    });
    return data;
};

//* 컨텐츠 평가 삭제
const deleteContentRating = async (contentId: number, profileId: number) => {
    await prisma.rating.deleteMany({
        where : {
            contentId,
            profileId
        }
    });
};

//* 평가 전체 조회
const getAllRating = async () => {
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