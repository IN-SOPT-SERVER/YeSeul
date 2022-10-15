
import express, { Router } from "express";
import getBlog from "../api/blog"; 

const router: Router = express.Router();

router.get("/", getBlog); //가져온 getBlog 로직을 수행한다.

export default router;