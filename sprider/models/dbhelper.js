const mongoose = require('mongoose')
const jdDbModel = require('./jd')
const companyDbModel = require('./company')
const hash = require('object-hash')
// const logger = require('../config/log');

class dbHelper {
  static async emptyCollection(Model) {
    let flag = true
    let res = await Model.collection.remove()
    if (!res) {
      flag = false
    }
    return flag
  }
  /* emptyCollection end */

  /**
   * saveOneJd(jdInfo, callback)
   * 输入：
   * 1. jdInfo 住去简历的json
   * 2. callback insertJd()
   *
   * 处理：
   * 1. 检查这个jd是否已经存在，存在就忽略
   * 2. 检查公司是否存在，如果没有就创建，有就获得公司的id
   * 3. 存储jd item信息
   */

  static saveJd(jdInfo, callback) {
    let jdCount = dbHelper.checkJd(jdInfo)
    let err = true
    if (jdCount !== 0) {
      err = false
    }
    let companyModel = dbHelper.insertCompany(jdInfo)
    callback(err, jdInfo, companyModel)
  }
  /**
   * insertOneJd
   * 输入：一个jd item的json文件
   * 处理：
   * 1. 检查这个jd是否已经存在，存在就忽略
   * 2. 检查公司是否存在，如果没有就创建，有就获得公司的id
   * 3. 存储jd item信息
   */

  static async insertOneJd(err, jdInfo, companyModel) {
    if (err) return console.error(err)
    // console.log("line:29");
    console.log(jdInfo)
    // if (!dbHelper.checkJd(item.hash)) {
    //   return false
    // }
    // console.log("line:33");
    // let companyID = await dbHelper.insertCompany(item)
    // console.log("line:35");
    // console.log(companyID);
    let flag = true
    let oneJd = new jdDbModel({
      _id: new mongoose.Types.ObjectId(),
      url: item.url,
      company: companyModel._id,
      postDate: item.postDate,
      salary: item.salary,
      isEasyApply: item.isEasyApply,
      jobTitle: item.jobTitle,
      hash: item.hash
    })
    oneJd.save(function (err) {
      if (err) return console.error(err)
      // if (err) {
      //   console.log(err);
      //   return
      // }
      console.log('line:48')
      console.log(oneJd.company)
      flag = false
    })
    return flag
  }

  /**
   * insertOneCompany
   * 输入：一个jd item的json文件
   * 处理：
   * 1. 检查这个jd是否已经存在，存在就忽略
   * 2. 检查公司是否存在，如果没有就创建，有就获得公司的id
   * 3. 存储jd item信息
   */

  static insertCompany(jdInfo) {
    console.log('line:82')
    let company_hash = hash(jdInfo.company)
    companyDbModel.find(
      {
        hash: company_hash
      },
      function (err, docs) {
        if (err) {
          console.log(err)
          return {}
        }
        // console.log(docs)
        if (docs.length === 0) {
          console.log('no company,now insert')
          let oneCompany = new companyDbModel({
            _id: new mongoose.Types.ObjectId(),
            name: item.company,
            hash: company_hash
          })
          oneCompany.save(function (err) {
            if (err) {
              console.log(err)
              return dbHelper.checkCompany(item.company)
            }
            // console.log(oneCompany._id);
            return oneCompany
          })
        }
        return docs
      }
    )
  }
  /**
   * checkJd
   * 输入：一个jd item的参数
   * 处理：
   * 1. 检查相同hash值的jd文档数量
   * 返回：
   * jd数量
   */
  static checkJd(item) {
    // console.log(item)

    jdDbModel.find(
      {
        hash: item.hash
      },
      function (err, docs) {
        if (err) {
          console.log(err)
          return false
        }
        return docs.length
      }
    )
  }

  /**
   * checkCompany 检查公司是否存在
   * 输入：一个Company name的参数
   * 处理：
   * 1. 根据参数，生成hash值
   * 2. 检查是否存在相同hash值的jd
   * 返回：
   * Ture ： 没有相同jd
   * False： 存在相同jd
   */
  static async checkCompany(comName) {
    companyDbModel.find(
      {
        name: comName
      },
      function (err, docs) {
        if (err) {
          console.log(err)
          return {}
        }
        if (docs.length === 0) {
          return {}
        }
        return docs._id
      }
    )
  }
  /**
   * insertCollection
   * 输入：一组 jd item的参数
   * 处理：
   *
   * 返回：
   */
  static async insertCollection(Model, insertList) {
    let flag = true
    // let res = await Model.collection.insert(insertList);
    // if (!res) {
    //     flag = false;
    // }
    await Model.collection
      .insertMany(insertList, {
        ordered: false
      })
      .then()
      .catch(err => {
        //捕捉插入重复抛出的异常
        console.log(err.toString())
        flag = false
      })
    return flag
  }

  /**
   * updateCollection
   * 输入：一组 jd item的参数
   * 处理：
   *
   * 返回：
   */
  static async updateCollection(Modle, doc) {
    let flag = true
    let updateRes = await Modle.update(
      {
        sid: doc.sid
      },
      doc
    )
    if (!updateRes) {
      logger.error('保存文章内容出错，文章sid：' + doc.sid)
      flag = false
    }
    return flag
  }

  /**
   * queryDocList
   * 输入：一组 jd item的参数
   * 处理：
   *
   * 返回：
   */
  static async queryDocList(Model) {
    const list = await Model.find({
      content: {
        $exists: false
      }
    }).catch(err => {
      logger.error('查询文章列表出错')
      logger.error(err)
    })
    return list
  }

  /**
   * queryArticleList
   * 输入：一组 jd item的参数
   * 处理：
   *
   * 返回：
   */
  static async queryArticleList(params) {
    const { select, size, page } = params
    let res = null
    await jdDbModel.paginate(
      {},
      {
        select: select,
        page: page,
        limit: size,
        sort: {
          sid: -1
        }
      },
      (err, result) => {
        if (!err) {
          let resClone = JSON.parse(JSON.stringify(result))
          res = {
            pagination: {
              total: resClone.total,
              current_page: resClone.page,
              total_page: resClone.pages,
              page_size: resClone.limit
            },
            list: resClone.docs
          }
        } else {
          console.log(err)
        }
      }
    )
    return res
  }

  /**
   * queryArticleList
   * 输入：一组 jd item的参数
   * 处理：
   *
   * 返回：
   */
  static async queryArticle(params) {
    const { sid } = params
    let res = await jdDbModel.find(
      {
        sid: sid
      },
      (err, doc) => {
        if (err) {
          console.log(err)
        }
      }
    )
    if (!res[0].sid) res = null
    return res
  }
}

module.exports = dbHelper
