import { Router } from "express";
import { body } from "express-validator";
import userController from "../controller/userController";
import { auth } from "../middlewares"

const router: Router = Router();

//* 회원가입 - POST api/user
router.post(
    "/",
    [body("userLoginId").notEmpty(), body("email").notEmpty(), body("password").isLength({ min: 6 })], //express-validator도 미들웨어이기 때문에 배열의 형태로 추가
    userController.createUser
  );

//* 로그인 - POST api/user/signin
router.post(
  "/signin",
  [
    body("userLoginId").notEmpty(),
    body("password").notEmpty(),
    body("password").isLength({ min: 6 }),
  ],
  userController.signInUser
);

export default router;
