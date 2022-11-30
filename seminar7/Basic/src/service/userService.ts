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
// page: 페이지 넘버, limit : 페이지당 몇개씩 보여줄건지
const getAllUser = async (page: number, limit : number): Promise<UserResDTO[]> => {
  const data = await prisma.user.findMany({ // 페이지네이션 !
    skip : (page - 1) * limit, // 2페이지면 앞에 limit 개수 건너뛰어야하기 때문이다 !
    take : limit
  });
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

//* 이름으로 유저 검색
const searchUserByName = async (keyword: string, option: string) => {

  // 유저 최신순
  if ( option == 'desc' ) {
    const user = await prisma.user.findMany({
      where : {
        userName : {
          contains: keyword // 키워드가 포함되어 있는 이름을 가진 유저만 추출
        }
      },
      orderBy : { // 정렬 알고리즘을 우리가 interface로 만들어서 해보는거 내가 실습으로 해보자 !
        createdAt : "desc"
      }
    });

    return user;
  }

  //유저 오래된순
  if ( option == 'asc') {
    const user = await prisma.user.findMany({
      where : {
        userName : {
          contains: keyword // 키워드가 포함되어 있는 이름을 가진 유저만 추출
        }
      },
      orderBy : { // 정렬 알고리즘을 우리가 interface로 만들어서 해보는거 내가 실습으로 해보자 !
        createdAt : "asc"
      }
    });

    return user;
  }

  if ( option == "nameDesc") {
    const user = await prisma.user.findMany({
      where : {
        userName : {
          contains : keyword
        },
      },
      orderBy : {
        userName : "desc"
      }
    })

    return user;
  }

}


const userService = {
  getUserById,
  createUser,
  getAllUser,
  updateUser,
  deleteUser,
  signIn,
  searchUserByName
};

export default userService;
