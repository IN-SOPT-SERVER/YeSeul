import { PrismaClient } from "@prisma/client";
import { UserCreateDTO } from "../interfaces/user/UserCreateDTO";
import bcrypt from "bcryptjs"
import { UserSignInDTO } from "../interfaces/user/UserSignInDTO";
import { UserResDTO } from "../interfaces/user/UserResDTO";
import { UserUpdateDTO } from "../interfaces/user/UserUpdateDTO";
import { sc } from "../constants";
const prisma = new PrismaClient();

//* 유저 생성
const createUser = async (userCreateDto: UserCreateDTO) => {
  //? 넘겨받은 password를 bcrypt의 도움을 받아 암호화
  const salt = await bcrypt.genSalt(10); //^ 매우 작은 임의의 랜덤 텍스트 salt
  const password = await bcrypt.hash(userCreateDto.password, salt); //^ 위에서 랜덤을 생성한 salt를 이용해 암호화
  const data = await prisma.user.create({
    data: {
      userName: userCreateDto?.name,
      age: userCreateDto?.age,
      email: userCreateDto.email,
      password,
    },
  });

  return data;
};

//* 유저 전체 조회
const getAllUser = async (): Promise<UserResDTO[]> => {
  const data = await prisma.user.findMany();
  return data;
};

//* 유저 정보 업데이트
const updateUser = async (userId: number, userUpdateDto: UserUpdateDTO) => {

  // 비밀번호 변경하려면 다시 암호화 해줘야함 !
  const userUpdate : UserUpdateDTO = {
    name : userUpdateDto.name,
    age : userUpdateDto.age,
    email : userUpdateDto.email
  }

  if(userUpdateDto.password){
  //? 넘겨받은 password를 bcrypt의 도움을 받아 암호화
  const salt = await bcrypt.genSalt(10); //^ 매우 작은 임의의 랜덤 텍스트 salt
  const password = await bcrypt.hash(userUpdateDto.password, salt); //^ 위에서 랜덤을 생성한 salt를 이용해 암호화
  userUpdate.password = password
  }

  const data = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      userName : userUpdate.name,
      age : userUpdate.age,
      email : userUpdate.email,
      password : userUpdate.password
    },
  });

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
const getUserById = async (userId: number): Promise<UserResDTO | null> => { //없을 수도 있으니까 null 케이스 생각
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
  });
  
  return user;
};

//* 로그인
const signIn = async (userSignInDto: UserSignInDTO) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: userSignInDto.email,
      },
    });
    if (!user) return null;

    //? bcrypt가 DB에 저장된 기존 password와 넘겨 받은 password를 대조하고,
    //? match false시 401을 리턴
    const isMatch = await bcrypt.compare(userSignInDto.password, user.password);
    if (!isMatch) return sc.UNAUTHORIZED;

    return user.id;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const userService = {
  getUserById,
  createUser,
  getAllUser,
  updateUser,
  deleteUser,
  signIn
};

export default userService;
