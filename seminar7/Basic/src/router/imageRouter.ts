import { Router } from "express";
import { imageController } from "../controller";
import upload from "../middlewares/upload";

const router : Router = Router();


//* 이미지 업로드
router.post("/", upload.single('file'), imageController.uploadImage); //file 이라는 필드에다가 이미지 전달

export default router;