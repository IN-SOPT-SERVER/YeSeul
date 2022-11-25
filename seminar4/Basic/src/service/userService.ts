import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//* 유저 생성
const createUser = async (name: string, email: string, age: number) => {
  
  //prisma는 기본으로 프로미스 객체를 return하기 때문에 await
  const data = await prisma.user.create({
    data: {
      userName: name, //스키마의 컬럼값과 변수명이 다르면 이렇게 넣어주기
      email,
      age
    }
  });
  return data;
};

//* 유저 전체 조회
const getAllUser = async () => {
  const data = await prisma.user.findMany();
  return data;
};

//* 유저 정보 업데이트
const updateUser = async (name: string , userId : number) => {
  const data = await prisma.user.update({
    where: { // 해당 아이디의 데이터 변경
      id: userId
    },
    data: {
      userName: name
    }
  })
  return data;
};

//* 유저 삭제
const deleteUser = async( userId: number ) => {
  await prisma.user.delete({
    where: {
      id: userId
    }
  });
};

//* userId로 유저 조회
const getUserById = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { //조건을 거는 where 쿼리 사용
      id: userId,
    },
  });

  return user;
};

const userService = {
  getUserById,
  createUser,
  getAllUser,
  updateUser,
  deleteUser
};

export default userService;
