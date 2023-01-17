export interface ContentResDTO {
    class : string;
    title : string;
    character : string;
    genre : string;
    description : string|null; //해당 컬럼은 null값을 허용했기 때문에
    episodeNum : number;
    age : number;
    image : string;
}