import { PrismaClient } from "@prisma/client";
import { PrismaClientValidationError } from "@prisma/client/runtime";
import { ImageCreateResponseDTO } from "../interfaces/image/imageCreateResponseDTO";
const prisma = new PrismaClient();

const uploadImage = async (location: string): Promise<ImageCreateResponseDTO> => {

    const data = await prisma.image.create({
        data: {
            image : location
        }
    });

    const result: ImageCreateResponseDTO = {
        id: data.id,
        image: data.image as string //null로 넘어올 수 있다는 에러 뜰 수도 있는데, 타입 단언으로 그냥 string으로 무조건 넘어온다고 가정함
    };

    return result;
};

const imageService = {
    uploadImage
}

export default imageService;