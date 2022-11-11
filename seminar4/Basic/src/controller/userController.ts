import { Request, Response } from "express";
import { userService } from "../service";

const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;

  //params는 string으로 넘어오기 때문에 string -> number로 바꿔주기 위해 +를 써줌 (형변환 대신 하는거에오)
  const data = await userService.getUserById(+userId); 

  if (!data) {
    return res.status(404).json({ status: 404, message: "NOT_FOUND" });
  }
  return res.status(200).json({ status: 200, message: "유저 조회 성공", data });
};

//* 유저 생성
const createUser = async (req: Request, res: Response) => {
  //const name = req.body.name;
  //const email = req.body.email;
  //만약 req에 20개의 데이터가 있으면 위에처럼 일일이 받기,,,좀 ,,, 그렇자나여,,

  //선언하는 변수명과 json에서 꺼내오는 key값이 같으면 아래와 같이 선언 가능 ! => 비구조할당
  //params 도 가능하다 ! 그냥 다 비구조할당 가능 !
  const { userName, email, age } = req.body;

  if (!userName || !email || !age) { 
    return res.status(400).json({ status: 400, message: "유저 생성 실패" });
  }

  // 디비 통신하도록 넘겨주기 (controller의 역할)
  const data = await userService.createUser(userName, email, age);

  if (!data) {
    return res.status(400).json({ status: 400, message: "유저 생성 실패" });
  }

  return res.status(200).json({ status: 200, message: "유저 생성 성공", data });

};

//* 유저 전체 조회
const getAllUser = async (req: Request, res: Response) => {
  const data = await userService.getAllUser();

  //데이터가 없다면 ? 204를 보내서 noContent를 보낼 수도 있다 !
  //근데 400은 아님,,, 왜냐면 진짜로 유저가 없을 수도 있좌나여,,
  return res.status(200).json({ status: 200, message: "유저 전체 조회 성공", data });
};

//* 유저 정보 업데이트
const updateUser = async (req: Request, res: Response) => {
  const { name } = req.body; // 업데이트 할 값
  const { userId } = req.params; // 업데이트 할 데이터를 식별할 값

  if (!name) return res.status(404).json({ status: 404, message: "유저 업데이트 실패" });

  const updateUser = await userService.updateUser(name, +userId);

  return res.status(200).json({ status: 200, message: "유저 업데이트 성공", updateUser });
};

//* 유저 삭제
const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  await userService.deleteUser(+userId);
  return res.status(200).json({ status: 200, message: "유저 삭제 성공" });
};

const userController = {
  getUserById,
  createUser,
  getAllUser,
  updateUser,
  deleteUser
};

export default userController; //각 함수들을 userController 로 묶어서 한번에 내보내기
