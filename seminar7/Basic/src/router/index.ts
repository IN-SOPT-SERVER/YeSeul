import { Router } from "express";
import imageRouter from "./imageRouter";
import userRouter from "./userRouter";

const router: Router = Router();

router.use("/image", imageRouter);
router.use("/user", userRouter);

export default router;
