const fs = require("fs")
const path = require('path')
let formatJson = require('format-json-pretty')

let readImgPath2 = function(dir) {
  imgList=[]
  var files = fs.readdirSync(dir)
  source = './source/img'
  files.forEach(function (filename) {
    let fPath = path.join(dir,filename)
    let fRPath = path.join(source,filename)
    let stats = fs.statSync(fPath)
    if (stats.isFile()) {
      //stat 状态中有两个函数一个是stat中有isFile ,isisDirectory等函数进行判断是文件还是文件夹
      imgList.push(fRPath)
    }
  })
  return imgList
}

let arryAdd = function(imgList) {

  let tmpArr = []
  num = 1
  imgList.forEach(function (img) {
    let item = {}
    item.id=num
    item.imageUrl=img
    tmpArr.push(item)
    num ++
  })
  // console.log(tmpArr)
  return tmpArr
}

let jsonEdit = function(randomList,imgList) {
  let backData = {}
  let tmpArr = []
  num = 1
  randomList.forEach(function (num) {
    let item = {
      "id": 0,
      "imageUrl": "",
      "plateNum": "",
      "checkPlate": "",
      "checkVehicle": ""
    }
    item.id=imgList[num].id
    item.imageUrl=imgList[num].imageUrl
    tmpArr.push(item)
  })
  // console.log(tmpArr)
  backData.data = tmpArr
  backData.total = tmpArr.length
  backData.todo = tmpArr.length
  return backData
}

var randomList = function(maxNum, listNum) {  
  var random
  var list =[]
  for (i=0;i<listNum;i++){
    random = Math.random()
    let tmpNum = Math.round(random * maxNum)
    list.push(tmpNum) 
  }
   //小于1的随机数
  
  return list
  }

/**
 * Module writeJson.
 * Json to file
 */
let writeJson = function(data, fileName) {  
  const baseDir = __dirname + '/data/';
  const opts = {
    cwd: baseDir,
    encoding: 'utf8',
    stdio: [process.stdin, process.stdout, process.stderr]
  }
  fileName = baseDir + fileName;

  fs.writeFileSync(fileName, `${formatJson(data)}`, opts);
}


let plateArr =  readImgPath2('../source/img')
let plateList = arryAdd(plateArr)
// console.log(plateList)
// console.log(plateData)
// backData.data = plateData
// backData.total = plateData.length
// backData.todo = plateData.length
// console.log(backData2)
const list = randomList(6481,375)
const jsonList = jsonEdit(list,plateList)
console.log(jsonList)
writeJson(jsonList,'plateAll.json')