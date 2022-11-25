
import express, { Router } from "express";
import getMember from "../api/member"; 

const router: Router = express.Router();

router.get("/", getMember); //가져온 getMember 로직을 수행한다.

export default router;