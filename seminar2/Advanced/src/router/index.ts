// router/index.ts
import express, { Router } from "express";

//여기서 이제 각 라우터를 연결
import userRouter from "./userRouter";
import blogRouter from "./blogRouter";
import commentRouter from "./commentRouter";
import movieRouter from "./movieRouter";
import membersRouter from "./membersRouter";

const router: Router = express.Router();

router.use('/user', userRouter);
router.use('/blog', blogRouter);
router.use('/comment', commentRouter);
router.use('/movie', movieRouter);
router.use('/members', membersRouter);

export default router;