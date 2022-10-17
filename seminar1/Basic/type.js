
//원시 타입: 메모리에 고정 크기로 값을 저장하고, 해당 저장 값을 변수가 직접 가지고 있음

//* Number
//숫자 타입으로 64비트 실수
const num = 106;
console.log(typeof num); //변수의 타입을 출력함. 출력값 "number"

//* String
//백틱(``)은 ES6부터 지원하는 Template literal!
const my_name = "예슬";
console.log(`안녕하세요. ${my_name}입니다.`); //${변수명}. 출력값 "안녕하세요. 예슬입니다."

//Boolean
//논리 요소를 나타내는 타입. True/False.
const bool = true;
console.log(typeof bool); //출력값 "boolean"

//Symbol
//고유하고 변경이 불가능한 원시 값
const sym1 = Symbol();
const sym2 = Symbol();
const sym3 = Symbol('foo');
const sym4 = Symbol('foo');

console.log(sym1==sym1); //출력값 "true"

console.log(sym1==sym2); //출력값 "false"
console.log(sym3==sym4); //출력값 "false"

//*Null과 Undefined
//Null은 정해지지 않은 값. Undefined는 정해지지 않은 타입, 초기화 되지 않은 변수, 존재하지 않는 값

//객체 타입: 크기가 정해져있지 않고 변수 할당 시 데이터 주소만 저장

//* Object
//javascript의 기본 타입.

const user = {
    email: "cho898989@naver.com",
    name: "조예슬",
    favorite: ["회", "떡볶이", "마라샹궈"],
    introduce: function() {
        console.log(`${this.name}입니다. ${this.favorite} 좋아 :)`);
    },
    getFavoriteFoods: function() {
        this.favorite.forEach((food) => { //favorite 배열에 있는 요소 하나씩 food라는 변수로.
            console.log(`${food} 맛 있 어 !!!`); 
        });
    },
};
user.introduce();
user.getFavoriteFoods();

//* Array
const arr1 = ['조예슬', '떡볶이', 24, true]; 
const arr2 = Array(false, 'cute', 2022, { sopt: "Server" }); //이렇게도 선언 가능.

arr1.map((item) => console.log(`${item} 야호`)); //map: array 안에 요소 하나하나씩 순회
arr2.map((thing) => console.log("배열 요소:", thing));

//함수 선언식
function hello(name) {
    console.log(`안녕 ${name} !`);
}

//함수 표현식 (ES6부터 등장)
const sum = (num1, num2) => {
    const result = num1 + num2;
    console.log(result);
}

//한줄로 쓸 수 있음. but 협업에서는 지양하는게 좋음
const add = (a, b) => a + b; //return 생략 가능.
const hello2 = name => console.log(`${name}, hello!`); //파라미터가 하나인 경우 괄호 생략 가능 => name 괄호 생략.
const info = (name, age) => ({name, age});

sum(5,6);
hello2('예슬');




