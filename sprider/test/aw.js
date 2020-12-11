function resolveAfter2Seconds(x) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, 2000);
    });
  }
  
//   async function f1() {
//     console.log('start'); 
//     var x = await resolveAfter2Seconds(10);
//     console.log(x); // 10
//     return 'end'
//   }
  
//   // let text = f1();
//   console.log(f1())
//   // console.log(text)



  // async function forDemo() {
  //     let arr = [1, 2, 3, 4, 5];
  //     for (let i = 0; i < arr.length; i ++) {
  //         console.log(await arr[i])
  //         resolveAfter2Seconds(10)
  //     }
  //     console.log('end')
  // }
  // forDemo();//正常输出


// function forDemo2() {
//   let arr = [1, 2, 3, 4, 5];
//   for (let i = 0; i < arr.length; i ++) {
//       console.log(arr[i])
//       resolveAfter2Seconds(10)
//   }
//   console.log('end')
// }
// forDemo2();//正常输出



var fs = require("fs");
var data = fs.readFileSync('input.txt');
console.log(data.toString());
console.log("程序执行结束!");