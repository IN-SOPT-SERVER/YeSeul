import { Response, Request } from "express";
import { rm, sc } from "../constants";
import { fail, success } from "../constants/response";
import imageService from "../service/imageService";

//* 이미지 업로드 API
const uploadImage = async (req: Request, res : Response) => {
    //console.log(req)
    const image: Express.MulterS3.File = req.file as Express.MulterS3.File;
    //console.log(image)
    const { location } = image;
    //image.filename 도 있고,, multer가 제공하는 내장 함수값 많음.

    // 파일 위치 무조건 보내주셔야해요 !
    if (!location) {
        return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NO_IMAGE));
    }

    const data = await imageService.uploadImage(location);

    if (!data) {
        return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.CREATE_IMAGE_FAIL));
    }
    return res.status(sc.CREATED).send(success(sc.CREATED, rm.CREATE_IMAGE_SUCCESS, data));

}

const imageController = {
    uploadImage
};

export default imageController;
