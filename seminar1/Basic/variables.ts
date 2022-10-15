
//*typescript는 변수 타입 지정
const isLiked: boolean = true; //const 변수명:T = 초기값;

const a: string = 'hello';
console.log(typeof a, a); // 출력값 "string hello"

let num_ts: number = 16
console.log(`${typeof num_ts}, ${num_ts}`) // 출력값 "number, 31"

//const sum: number = 'sum number' // Type 'string' is not assignable to type 'number'

//*Array 타입
//const 변수명: T[] = 초기값;
let aaa: number[] = [1,2,3];
//let aab: number[] = [1,2,'hi']; // array 타입이 number이므로 string은 못 들어감.

const arr3 :Array<string> = ['a','b','c'];

//Object는 자바스크립트 객체와 완전히 동일
const foo1 = (a: Object) => { //대문자 주의
    console.log(a)
}

//object는 typescript에서 추가된 객체 타입으로, 원시 타입이 아닌 타입만 할당 가능
const foo2 = (a: object) => { //소문자 주의
    console.log(a)
}

foo1('hello')
// foo2('hello') //원시 타입이 아닌 타입들만 할당 할 수 있음

//* 함수 타입도 명시
const hello_name = (name: string): void => { //return 값의 타입도 명시
    console.log(`${name}아 안녕`)
}

const sum_ts = (a:number, b:number): number => {
    return a+b;
}

const result = sum_ts(10,20)
console.log(result)

//null과 undefined는 이름 그대로 타입
const b: null = null;
//let oops: null = 2; //Type '2' is not assignable to type 'null'
let c: undefined = undefined;
//let d: undefined = null; //Type 'null' is not assignable to type 'undefined'

//* 타입 선언
//as, 오픈 api를 사용할 때 타입 단언 많이 사용
const sopt: any = '이종현' //any는 모든 타입이 들어갈 수 있음
const nameLength = (sopt as string).length
console.log(nameLength); //3

//angle-bracket
const test11 : any = '나나나나나'
const nameLength2 = (<string>test11).length
console.log(nameLength2) //5

//*any는 어떤 타입이던 가능, 하지만 지양하는게 좋음.
const hmmm: any = {
    name: 'yeseul',
    age: 24
}
console.log(hmmm) // { name: 'yeseul', age: 24 }

//*interface, 클라이언트와 변수 값을 주고 받을 때 타입 지정이 중요함 => 그래서 object 지양?,,,
interface Sopt {
    name: string;
    age: number;
    isSOPT: boolean;
}

const introduce: Sopt = {
    name: 'yeseul',
    age: 24,
    isSOPT: true
}

//array에서도 마찬가지로 인터페이스 사용
const introduces: Sopt[] = [
    {
        name: 'yeseul',
        age: 24,
        isSOPT: true
    },
    {
        name: 'jina',
        age: 2,
        isSOPT: true
    },
    {
        name: 'iiiii',
        age: 18,
        isSOPT: false
    },
    {
       name: 'meme',
       age: 3,
       isSOPT: true,
       //money: null //Object literal may only specify
                     //know properties, and 'money'
                     //does not exist in type 'SOPT'. 
    }
]

//*선택적 프로퍼티
//인터페이스 프로퍼티 중 필수적으로 필요하지 않은 프로퍼티를 표시하고 싶으면
interface soptType {
    name: string;
    age: number;
    isSOPT?: boolean;
}

const info2: soptType = {
    name: "예슬",
    age: 24,
    //isSOPT 프로퍼티 안 가져도 에러 안남.
};



