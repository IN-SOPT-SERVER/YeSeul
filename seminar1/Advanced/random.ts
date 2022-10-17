/* 
도전 과제 조건
1. Member, Dinner interface 만들고 타입 지정하기
2. organize 내부 로직 채우기
*/

import {Dinner} from './Interface/Dinner';

const dinner: Dinner = {
    member: [
      {
        name: "권세훈",
        group: "ob",
      },
      {
        name: "조예슬",
        group: "yb",
      },
      {
        name: "최승빈",
        group: "ob",
      },
      {
        name: "소예원",
        group: "yb",
      }
    ],
    menu: ["회", "떡볶이", "마라샹궈", "닭발", "해물파전", "삼겹살", "부대찌개"],
    shuffle(members) { //무작위로 멤버 섞기
        /*
        Math.random()은 0이상 1미만의 숫자 리턴
        즉, Math.random() - 0.5은 음수 또는 양수 리턴 => 음수이면 배열 요소의 위치가 유지, 양수이면 값이 교환
        */
        members.sort(() => Math.random() - 0.5);
        return members;
    },
    organize(members, menu) {
      this.shuffle(members);
      //랜덤으로 메뉴 정해주기 위해 랜덤 인덱스 생성
      //0 <= random <= 6
      const randomIndex: number = Math.floor(Math.random() * 7);

      console.log(`자! 이번 서버 저녁식사는 ${members[0].group}인 ${members[0].name}과 ${members[1].group}인 ${members[1].name}와 함께 합니다.
      메뉴는 ${menu[randomIndex]} 입니다. 즐거운 저녁 시간 되세요 :)`);
    },
  };
  
  dinner.organize(dinner.member, dinner.menu);