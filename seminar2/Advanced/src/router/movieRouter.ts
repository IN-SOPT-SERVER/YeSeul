
import express, { Router } from "express";
import getMovie from "../api/movie"; 

const router: Router = express.Router();

router.get("/", getMovie); //가져온 getMovie 로직을 수행한다.

export default router;