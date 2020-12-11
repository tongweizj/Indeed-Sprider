var kvArray = [{key: 1, value: 10}, 
    {key: 2, value: 20}, 
    {key: 3, value: 30}];
// var reformattedArray = kvArray.map(function(obj,index) { 
// console.log(index)
// var rObj = {};
// rObj.id=index;//添加id属性
// rObj[obj.key] = obj.value;//修改属性
// return rObj;
// });
// console.log(reformattedArray);

var reformattedArray2 = kvArray.map(function(obj,index) { 
obj.id=index;//添加id属性
return obj;//如果不返回则输出： Array [undefined, undefined, undefined]
});
console.log(reformattedArray2);