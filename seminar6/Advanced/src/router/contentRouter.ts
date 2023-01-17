import { Router } from "express";
import { body } from "express-validator";
import { contentController } from "../controller";
import { auth } from "../middlewares";

const router: Router = Router();

//* 컨텐츠 평가 생성 POST /content/rating/:contentId
router.post("/rating/:contentId", auth, contentController.createContentRating);

//* 컨텐츠 내용 조회 GET /content/:contentId
router.get("/:contentId", auth, contentController.getContentById);

//* 컨텐츠 평가 조회 GET /content/rating
router.get("/rating", auth, contentController.getContentRating);

//* 컨텐츠 평가 업데이트 PATCH /content/rating
//router.patch("/rating", [body("rating").notEmpty(), body("contentId").notEmpty(), body("profileId").notEmpty()], auth, contentController.updateContentRating);

//* 컨텐츠 평가 삭제 DELETE /content/rating
//router.delete("/rating", [body("contentId").notEmpty(), body("profileId").notEmpty()], auth, contentController.deleteContentRating);

//* 컨텐츠 평가 전체 조회 GET /content/rating/all
//router.get("/rating/all", auth, contentController.getAllRating);

export default router;