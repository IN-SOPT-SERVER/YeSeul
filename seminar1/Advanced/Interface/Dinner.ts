import {Member} from "./Member"; //interface import

export interface Dinner {
    member: Member[];
    menu: string[];
    shuffle(members: Member[]): Member[]; //멤버 섞는 함수
    organize(members: Member[], menu: string[]): void; //콘솔 출력으로 return값 없음.
}
