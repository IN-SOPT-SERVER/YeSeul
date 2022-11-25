//* Callback Function

console.log("Ready ...");

setTimeout((): void => { 
    console.log("Set ..."); //3초 뒤에 출력
}, 3000);

console.log("Go !");

//* 출력
//Ready ...
//Go !
//Set ...
