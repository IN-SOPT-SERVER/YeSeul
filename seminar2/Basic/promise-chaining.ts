//* 아침에 어렵게,, 어렵게,, 일어나는 나를 표현한 함수
const me = (callback: () => void, time: number) => { 
    setTimeout(callback, time);
};

//* 기상
const wakeUp = (): Promise<string> => { //Promise 객체를 반환하는 함수
    return new Promise((resolve, reject) => {
        me(() => {
            console.log("[현재] 일어남");
            resolve("일어남"); 
        }, 1000);
    });
};

//* 화장실 감
const goBathRoom = (now: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        me(() => {
            console.log("[현재] 화장실로 이동함");
            resolve(`${now} -> 화장실로 이동함`);
        }, 1000);
    });
};

//* 칫솔과 치약을 준비함
const ready = (now: string) : Promise<string> => {
    return new Promise((resolve, reject) => {
        me(() => {
            console.log("[현재] 칫솔과 치약을 준비함");
            resolve(`${now} -> 칫솔과 치약을 준비함`)
        }, 1000);
    });
};

//* 양치함
const startChikaChika = (now: string) : Promise<string> => {
    return new Promise((resolve, reject) => {
        me(() => {
            console.log("[현재] 양치함");
            resolve(`${now} -> 양치함`)
        }, 1000);
    });
};

//* 나 자신한테 칭찬함
const goodjob = (now: string) : Promise<string> => {
    return new Promise((resolve, reject) => {
        me(() => {
            console.log("[현재] 나 자신에게 칭찬중");
            resolve(`${now} -> 칭찬중`)
        }, 1000);
    });
};

wakeUp() //resolve가 chaining 되어서 화살표가 이어져서 출력된다. (now 값에 문자열들이 추가되고, 추가되고,,,)
    .then((now) => goBathRoom(now))
    .then((now) => ready(now))
    .then((now) => startChikaChika(now))
    .then((now) => goodjob(now))
    .then((now) => console.log(`\n${now}`)); //출력값: 일어남 -> 화장실로 이동함 -> 칫솔과 치약을 준비함 -> 양치함 -> 칭찬중