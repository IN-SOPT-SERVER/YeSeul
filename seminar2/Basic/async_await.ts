//* 이전에 치카치카 코드와 비슷한 Promise를 이용한 비동기 처리 코드
// 보기에 복잡해보이는 코드,,

let asyncFunc1 = (something: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`resolved ${something} from func1 ...`);
        }, 1000);
    });
};

let asyncFunc2 = (something: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`resolved ${something} from func2 ...`);
        }, 1500);
    });
};

const promiseMain = (): void => {
    asyncFunc1("test")
        .then((resolveData: string) => {
            console.log(resolveData);
            return asyncFunc2("testttt")
        })
        .then((resolveData: string) => {
            console.log(resolveData);
        });
};

promiseMain(); 
//resolved test from func1 ...
//resolved testttt from func2 ...

//이렇게 복잡하고 헷갈리는 promiseMain을 async/await로 간단하게 바꿀 수 있다 !
//* async - await
//------------------------------
//함수 선언식
async function foo1() {
  
}

//함수 표현식
const foo2 = async () => {
//------------------------------

}
const main = async (): Promise<void> => {
    let result = await asyncFunc1("wow!");
    console.log(result);
    result = await asyncFunc2("holy moly");
    console.log(result);
};

main();
//resolved wow! from func1 ...
//resolved holy moly from func2 ...