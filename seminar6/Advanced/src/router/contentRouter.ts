import { Router } from "express";
import { contentController } from "../controller";

const router: Router = Router();

//* 컨텐츠 평가 생성 POST /content/rating/:contentId
router.post("/rating/:contentId", contentController.createContentRating);

//* 컨텐츠 내용 조회 GET /content/:contentId
router.get("/:contentId", contentController.getContentById);

//* 컨텐츠 평가 조회 GET /content/rating
router.get("/rating/:contentId", contentController.getContentRating);

//* 컨텐츠 평가 업데이트 PATCH /content/rating
router.patch("/rating", contentController.updateContentRating);

//* 컨텐츠 평가 삭제 DELETE /content/rating
router.delete("/rating", contentController.deleteContentRating);

export default router;