const Indeed = require('./utils/getindeed')
const jsonUtils = require('./utils/jsonUtils')
const axios = require('axios')


async function getJds2 (jdList) {
  let jdArr = []
  num = 1
  
  await jdList.forEach( function (url) {
    indeed.getJdPage(url,function (jddata) {
      console.log('2-4')
      jddata.id=num
      // console.log(jddata)
      jdArr.push(jddata)
      // console.log(jdArr)
      num ++ 
  })

  })
  console.log('3')
  console.log(jdArr)
  jdData = {}
  jdData.data = jdArr
  jdData.total = jdArr.length
 
  jsonUtils.writeJson(jdData,'test2.json')
}

const getJds = async (jdList) => {
  let jdArr = []
  num = 1
  
  await jdList.forEach( async function (url) {
    const html = await axios.get(url)
    item = indeed.getJdPage(html.data)
    item.id=num
    console.log(item)
    jdArr.push(item)
    console.log(jdArr)
    num ++
  })
  console.log('3')
  console.log(jdArr)
  jdData = {}
  jdData.data = jdArr
  jdData.total = jdArr.length
 
  jsonUtils.writeJson(jdData,'test2.json')
}

const getJd = async (url) => {
  jdInfo = await indeed.getJdPage(url)
  // console.log(jdInfo)
  jsonUtils.writeJson(jdInfo,'test.json')
  return jdInfo
}

// getJd('https://www.indeed.ca/viewjob?jk=4b17f48a4a886bf3')
// jdList = ['https://www.indeed.ca/viewjob?jk=4b17f48a4a886bf3','https://www.indeed.ca/viewjob?cmp=Nutrition-Hacks&t=Full+Stack+Web+Developer&jk=092445ae0e9b1ccf&sjdu=vQIlM60yK_PwYat7ToXhk7CMTN6TBlbqwSiHGWKXUH33jxFVPFnsrKENKXHcxUhVDBDso4u0UypkcJaj0RXYQ8rQjnZq4bWMnpvu1RAoEAA&tk=1e3fn2vf434pi000&adid=259230501&pub=4a1b367933fd867b19b072952f68dceb&vjs=3']
jdList = ['https://www.indeed.ca/viewjob?jk=4b17f48a4a886bf3']
Indeed.getJdsAll(jdList,jdArr => {
  console.log(jdArr)
})