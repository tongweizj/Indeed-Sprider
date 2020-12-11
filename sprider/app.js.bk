
const hash = require('object-hash');
const mongoose = require('mongoose');
const dbHelper = require('./utils/dbhelper')
const jdModel = require('./model/jd');
const url = 'mongodb://admin:123456@mongo:27017/db_jds'
mongoose.Promise = global.Promise;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection
  .on('open', () => {
    console.log('Mongoose connection open');
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });


// ------- start --------
const jdListInit = require('./indeed/getJdList');

const start = async() => {
  let jdListRes = await jdListInit();
  if (!jdListRes) {
      logger.warn('news list update failed...');
  } else {
      logger.info('news list update succeed！');
  }

  // let articleContentRes = await articleContentInit();
  // if (!articleContentRes) {
  //     logger.warn('article content grab error...');
  // } else {
  //     logger.info('article content grab succeed！');
  // }
};

if (typeof articleListInit === 'function') {
  start();
}
setInterval(start, 600000); // 每十分钟运行一次

// ------- end --------

// roleList = ['machine learning engineer', 'full stack developer', 'data scientist', 'back end developer']
roleList = ['data scientist']
roleList.forEach(job => {
  console.log(job)
  getJds(job)

});



async function getJds(job) {
  scrapList.query(getQuery(job)).then(async res => {
    console.log(res.length)
    res.forEach(function(item){
      if(dbHelper.checkJd(item)){
        item.jobTitle = job; 
        item.hash = hash( item.company + item.title + item.summary )
        // console.log(item)
        if(dbHelper.insertOneJd(item)){
          console.log('list saved')
        } 
      }
  })

    // res = res.map(item => {
    //   item.jobTitle = job; 
    //   item.hash = hash( item.company + item.title + item.summary )
    //   return item
    // })
    // console.log(res);
    // console.log(res.length);
    // saveDB(res)
    // let flag = await dbHelper.insertCollection(jdModel, res).catch(function (err) {
    //   console.log('data insert falied');
    // });
    // if (!flag) {
    //   console.log('news list save failed');
      
    // } else {
    //   console.log('list saved！total：' + res.length);
      
    // }
  });

}
/**
 * indeed 查询
 * @param query  职位
 * @returns queryOptions
 */
function getQuery(job) {
  const queryOptions = {
    host: 'ca.indeed.com',
    query: `${job}`, //'Machine Learning Engineer',
    city: 'Toronto, ON',
    radius: '50',
    level: '',
    jobType: 'fulltime',
    maxAge: '7',
    sort: 'date',
    limit: 100
  };
  return queryOptions;
}

/**
 * 将文章列表存入数据库
 * @param result
 * @param callback
 * @returns {Promise.<void>}
 */
const saveDB = async (result) => {
  // console.log(result);
  let flag = await dbHelper.insertCollection(jdModel, result).catch(function (err) {
    console.log('data insert falied');
  });
  if (!flag) {
    console.log('news list save failed');
    
  } else {
    console.log('list saved！total：' + result.length);
    
  }
  return flag
};