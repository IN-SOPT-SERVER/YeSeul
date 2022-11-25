import { Router } from "express";
import contentRouter from "./contentRouter"

const router : Router = Router();

router.use("/content", contentRouter);

export default router;