// src/modules/jwtHandler.ts
import jwt from "jsonwebtoken";
import { tokenType } from "../constants";

//* 받아온 userId를 담는 access token 생성
const sign = (userId: number) => {
  const payload = { //클라이언트 정보를 담는 개미의 가슴..?
    userId,
  };

   //expiresIn : access token 유효기간, 무조건 필요 (보안에 좋음)
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "2h" });
  return accessToken;
};

//* token 검사! 우리가 발행한 토큰 맞음 ?
const verify = (token: string) => {
  let decoded: string | jwt.JwtPayload;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (error: any) {
    if (error.message === "jwt expired") {
      return tokenType.TOKEN_EXPIRED;
    } else if (error.message === "invalid token") {
      return tokenType.TOKEN_INVALID;
    } else {
      return tokenType.TOKEN_INVALID;
    }
  }

  return decoded;
};

export default {
  sign,
  verify,
};