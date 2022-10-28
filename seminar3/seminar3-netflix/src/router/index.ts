import express, { Router } from "express";

import movieRouter from "./movieRouter";

const router : Router = express.Router();

router.use('/media', movieRouter);

export default router;