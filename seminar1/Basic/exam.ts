
interface soptInfo {
    name: string;
    age: number;
    address: string;
    favorite: string;
    mbti: string;
    school: string;
}

const members : soptInfo[] = [
    {
        name: '정준서',
        age: 23,
        address: '잠실새내역',
        favorite: '쌀국수',
        mbti: 'ENFP',
        school: '성신여대'
    },
    {
        name: '박수린',
        age: 21,
        address: '방배역',
        favorite: '떡볶이',
        mbti: 'ISTJ',
        school: '숭실대'
    },
    {
        name: '유수화',
        age: 23,
        address: '공덕역',
        favorite: '강아지',
        mbti: 'ENFP',
        school: '숙명여대'
    }
]

console.log('\n#저희 파트원들을 소개합니다 ~~~!!');

members.map((member) => console.log(`
    ----------------------
    이름은 ${member.name} 이고요.
    나이는 ${member.age} 입니다.
    ${member.address} 에 거주하고 있고,
    ${member.favorite}를 좋아해요 !
    제 MBTI는 ${member.mbti} 에요.
    학교는 ${member.school} 다니고 있습니다.
    잘 부탁드려요 :)
`)); //map: array 안에 요소 하나하나씩 순회