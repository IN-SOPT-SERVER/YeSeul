import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { sc, rm } from "../constants";
import { fail, success } from "../constants/response";

import { UserCreateDTO } from "../interfaces/user/UserCreateDTO";
import { UserSignInDTO } from "../interfaces/user/UserSignInDTO";
import { UserResDTO } from "../interfaces/user/UserResDTO";
import { UserUpdateDTO } from "../interfaces/user/UserUpdateDTO";

import jwtHandler from "../modules/jwtHandler";
import { userService } from "../service";

//* 유저 생성 - 회원가입
const createUser = async (req: Request, res: Response) => {
  //? validation의 결과를 바탕으로 분기 처리
  const error = validationResult(req);
  if(!error.isEmpty()) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.BAD_REQUEST))
  }

  //? 기존 비구조화 할당 방식 -> DTO의 형태
  const userCreateDto: UserCreateDTO = req.body;
  const data = await userService.createUser(userCreateDto);

  if (!data) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.SIGNUP_FAIL))
  }

  //? 아까 만든 jwtHandler 내 sign 함수를 이용해 accessToken 생성
  const accessToken = jwtHandler.sign(data.id);

  const result = {
    id: data.id,
    name: data.userName,
    accessToken,
  };

  return res.status(sc.CREATED).send(success(sc.CREATED, rm.SIGNUP_SUCCESS, result));
};

// src/controller/userController.ts
//* 로그인
const signInUser = async (req: Request, res: Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.BAD_REQUEST));
  }

  const userSignInDto: UserSignInDTO = req.body;

  try {
    const data = await userService.signIn(userSignInDto);

    if (!data) return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.NOT_FOUND));
    else if (data === sc.UNAUTHORIZED)
      return res.status(sc.UNAUTHORIZED).send(fail(sc.UNAUTHORIZED, rm.INVALID_PASSWORD));

    const accessToken = jwtHandler.sign(data);

    const result = {
      id: data,
      accessToken,
    };

    res.status(sc.OK).send(success(sc.OK, rm.SIGNIN_SUCCESS, result));

  } catch (e) {
    console.log(error);
    //? 서버 내부에서 오류 발생
    res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  }
};

//* 유저 아이디로 유저 조회
const getUserById = async (req: Request, res: Response) => {

  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.BAD_REQUEST));
  }

  const { userId } = req.params;

  try {
    const data = await userService.getUserById(+userId); 

    if (!data) {
      return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.READ_USER_FAIL));
    }
    return res.status(sc.OK).send(success(sc.OK, rm.READ_USER_SUCCESS, data));

  } catch (e) {
    console.log(error);
    //? 서버 내부에서 오류 발생
    res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  }

};

//* 유저 전체 조회
const getAllUser = async (req: Request, res: Response) => {

  const { page, limit } = req.params;  

  const data = await userService.getAllUser(+page, +limit);

  if(!data){
    return res.status(sc.NO_CONTENT).send(success(sc.NO_CONTENT, rm.READ_ALL_USERS_SUCCESS, data))
  }
  return res.status(sc.OK).send(success(sc.OK, rm.READ_ALL_USERS_SUCCESS, data))
};

//* 유저 정보 업데이트
const updateUser = async (req: Request, res: Response) => {
  const userUpdateDto: UserUpdateDTO = req.body;
  const { userId } = req.params;

  if (!userUpdateDto) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.UPDATE_USER_FAIL));
  }

  const updatedUser = await userService.updateUser(+userId, userUpdateDto);

  return res.status(sc.OK).send(success(sc.OK, rm.UPDATE_USER_SUCCESS, updatedUser));
};

//* 유저 삭제
const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  await userService.deleteUser(+userId);
  return res.status(sc.OK).send(success(sc.OK, rm.DELETE_USER_SUCCESS));
};

//*이름으로 유저 검색
//* GET ~api/user?keyword=세훈 
const searchUserByName = async (req: Request, res: Response) => {
  const { keyword, option } = req.query; // 세훈

  const data = await userService.searchUserByName(keyword as string, option as string);

  if (!data) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.SEARCH_USER_FAIL));
  }
  return res.status(sc.OK).send(success(sc.OK, rm.SEARCH_USER_SUCCESS, data));
}

const userController = {
  getUserById,
  createUser,
  getAllUser,
  updateUser,
  deleteUser,
  signInUser,
  searchUserByName
};

export default userController; //각 함수들을 userController 로 묶어서 한번에 내보내기
