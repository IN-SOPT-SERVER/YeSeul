const condition : boolean = false; // true면 resolve, false면 reject

//* 최초 생성 시점
const promise = new Promise((resolve, reject) => {
    if (condition) {
        resolve("우와 Promise다 !");
    } else {
        reject(new Error("비동기 처리 도중 실패!"));
    }
});

/*
다른 코드 들어갈 수 있다
!
!
!
*/

//* 비동기 처리 성공(then), 비동기 처리 실패(catch)
//resolve와 reject에 넣어준 인수는 각각 then과 catch의 매개변수에서 받을 수 있다.
promise
.then((resolveData): void => console.log(resolveData))
.catch((error): void => console.log(error)); //현재 condition 의 값이 false 이므로, error("비동기 처리 도중 실패!")를 출력
