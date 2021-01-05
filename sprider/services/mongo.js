const async = require('async')
const config = require('../config')
const dbURi = config.database.url
const mongoose = require('mongoose')
const JD = require('./update-jd')
const Company = require('./update-company')

mongoose.connect(dbURi, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// for Connected
const startMongo = () => {
  /// 开启 mongon 的联结
  console.log('Mongoose connection')

  mongoose.connection.on(
    'error',
    console.error.bind(console, 'connection error:')
  )
  mongoose.connection.once('open', function () {
    // we're connected!
    console.log('Mongoose connection open')
  })
}

function saveJDs(items) {
  startMongo()
  // 这个循环是,处理
  console.log('保存数据:' + items.length)
  async.mapLimit(
    items,
    1,
    function (item, callback) {
      // 1) 存储职位的基本信息
      JD.createJd(item)
      // 2) 存储公司的基本信息
      // 把 mapLimit 的 callbacl 放到 createCompany 里面去执行,目的是当创建公司全部实行完之后,再进入下一步
      Company.createCompany(item.company, callback)
    },
    function (err, result) {
      console.log('一级页面抓取完成，共有数据：' + result.length)
      // mongoose.disconnect()
      // console.log('MongoClient is closing...')
    }
  )
}
module.exports.saveJDs = saveJDs

function updateJdDes(items) {
  // startMongo()
  // 这个循环是,处理
  console.log('保存职位描述数据:' + items.length)
  async.mapLimit(
    items,
    1,
    function (item, callback) {
      // 1) 存储职位的基本信息
      // 把 mapLimit 的 callbacl 放到 createCompany 里面去执行,目的是当创建公司全部实行完之后,再进入下一步
      JD.updateJdDes(item, callback)
    },
    function (err, result) {
      console.log('一级页面抓取完成，共有数据：' + result.length)
      mongoose.disconnect()
      console.log('MongoClient is closing...')
    }
  )
}
module.exports.updateJdDes = updateJdDes
