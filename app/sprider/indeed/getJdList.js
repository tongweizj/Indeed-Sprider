const hash = require('object-hash');
const mongoose = require('mongoose');
const logger = require('../config/log');
const scrapList = require('./getJdListPage')
const dbHelper = require('../utils/dbhelper')
const forEachAsync = require('../utils/forEachAsync').forEachAsync
const jdModel = require('../model/jd');
const companyDbModel = require('../model/company');

const {
    dbUrl,
    indeedQuery,
    titleList
} = require('../config/originconf');

let tmpArr = []

/**
 * 初始化方法 抓取文章列表
 * @returns {Promise.<*>}
 */
const jdListInit = async () => {
    mongoose.Promise = global.Promise;
    mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, function (err) {
        if (err) throw err;
        console.log('Successfully connected');
        logger.info('grabbing jd list starts...');
        getJdListPage()
        logger.info('grabbing jd list end...');
    })
}


const getJdListPage = () => {
    logger.info('getJdListPage starts...');
    // tmptitleList = ['data scientist'] //test
    titleList.forEach(job => {
        // getJds(job,function(res){
        //     saveDB(list, resolve)
        // })
        getJds(job)


    });
    
};



async function getJds(job) {
    indeedQuery.query = job
    logger.info('function getJds starts...');
    // logger.info(indeedQuery);

    
    scrapList.query(indeedQuery).then( (res) => {
        logger.info('getJds: %s:', res.length);

        forEachAsync(res,  async (item) =>{
            item.jobTitle = job;
            item.hash = hash(item.company + item.title + item.summary)
            // console.log(item)

            // 取发布职位的公司信息
            const filter = {
                hash: hash(item.company)
            };
            
            const update = {
                name: item.company,
                location:item.location
            };
            logger.info(filter);
            logger.info(update);
            let tempItem = await queryCompany(item, filter, update)
            tmpArr.push(tempItem)
            // companyDbModel.findOneAndUpdate(filter, update, {upsert: true,new: true}, function(err, doc) {
            //     logger.info('findOneAndUpdate starts...');
            //     if (err) return logger.err('find err');
            //     item.company = doc._id
            //     tmpArr.push(item)
            //     // logger.info(doc);
            //     // logger.info(item);
            //     logger.info('findOneAndUpdate end...');
            //     // logger.info(tmpArr);
            // });
            logger.info('findOneAndUpdate end...');
            console.log(tmpArr.length)
            
        }).then(function () {
            // then after all of the elements have been handled
            // the final callback fires to let you know it's all done
            logger.info(tmpArr)
            logger.info(tmpArr.length)
            saveDB(tmpArr)
            // console.log('All requests have finished');
        });
        
        // callback
    });
    // logger.info('function getJds end...');
    // logger.info(res);
    // logger.info('tmpArr getJds end:');
    // logger.info(tmpArr);
    
    // callback
}



const queryCompany = async (item, filter, update) => {
    let tmp = await companyDbModel.findOneAndUpdate(filter, update, {upsert: true,new: true});
    item.company = tmp._id
    return item
}
/**
 * 将文章列表存入数据库
 * @param result
 * @param callback
 * @returns {Promise.<void>}
 */
const saveDB = async(result, callback) => {
    //console.log(result);
    let flag = await dbHelper.insertCollection(jdModel, result).catch(function (err){
        logger.error('data insert falied');
    });
    if (!flag) {
        logger.error('news list save failed');
    } else {
        logger.info('list saved！total：' + result.length);
    }
    if (typeof callback === 'function') {
        callback(true);
    }
};

module.exports = jdListInit;