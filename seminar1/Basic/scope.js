
//* var type
if (true) { //block scope (if의 {})
    var test = 'var !';
    console.log(test);
}
console.log(test); //Success. var은 Function Scope

//* let type
if (true) { //block scope
    let test2 = 'let !';
    console.log(test2);
}
console.log(test2); //안됨. let과 const는 Block scope, 블록 안에서만 생존 => 접근가능 

//* var가 function scope 를 벗어났을 때!
function func() {
    if (true) {
      var test3 = "var";
      console.log("test: ", test3);
    }
    console.log("test: ", test3);
  }
  
  func();
  console.log("test: ", test3); //ReferenceError: test3 is not defined. Function Scope를 벗어난 곳에서는 var도 접근 불가.