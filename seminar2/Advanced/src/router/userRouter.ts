
import express, { Router } from "express";
import getUser from "../api/user"; // 모듈 import해서 깔꼼하게 사용하기

const router: Router = express.Router();

router.get("/", getUser); //가져온 getUser의 로직을 수행한다.

export default router;