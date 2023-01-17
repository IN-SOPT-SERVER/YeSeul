import { Router } from "express";
import contentRouter from "./contentRouter"
import userRouter from "./userRouter"

const router : Router = Router();

router.use("/content", contentRouter);
router.use("/user", userRouter);

export default router;