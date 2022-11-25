
import express, { Router } from "express";
import getComment from "../api/comment"; 

const router: Router = express.Router();

router.get("/", getComment); //가져온 getComment 로직을 수행한다.

export default router;