// src/middlewares/upload.ts
import multer from "multer";
import multerS3 from "multer-s3";
import config from "../config";
import s3 from "../config/s3Config";

//? 미들웨어로 사용할 multer 모듈
const upload = multer({ //multer 모듈에는 많은 설정값 존재 ! 찾아보면서 커스텀 하는거 추천
  //? 실질적인 storage 는 multerS3 이용해 aws s3 로 설정
  storage: multerS3({
    s3: s3,
    bucket: config.bucketName, //? s3 bucket name 지정
    contentType: multerS3.AUTO_CONTENT_TYPE, //? 중요 ! mimetype 은 자동으로 설정 (jpg나 png 타입을 자동으로 타입 맞춰준다는 의미)
    acl: "public-read", // Access control for the file

    //? key는 파일 이름을 지정. 버킷 내 같은 이름의 파일은 같은 파일로 인식하기 때문에 Unique하도록!
    key: function (req: Express.Request, file: Express.MulterS3.File, cb) {
      cb(null, `${Date.now()}_${file.originalname}`); //멀터는 이미지 객체 url 던져 준다 !
    },
  }),
});

export default upload;