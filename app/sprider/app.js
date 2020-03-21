const scrapList = require('./indeed/scrapList')
const hash = require('object-hash');
const mongoose = require('mongoose');
const dbHelper = require('./utils/dbhelper')
const jdModel = require('./model/jd');
const url = 'mongodb://cnbetaAdmin:123456@mongo:27017/cnbeta'
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


roleList = ['Machine Learning Engineer', 'Full Stack Developer']
roleList.forEach(job => {
  console.log(job)
  getJds(job)
});

function getJds(job) {
  scrapList.query(getQuery(job)).then(res => {
    res = res.map(item => {
      item.jobTitle = job; 
      item.hash = hash( item.company + item.title + item.summary )
      return item
    })
    console.log(res.length);
    saveDB(res)
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
    radius: '30',
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
  //console.log(result);
  let flag = await dbHelper.insertCollection(jdModel, result).catch(function (err) {
    console.log('data insert falied');
  });
  if (!flag) {
    console.log('news list save failed');
  } else {
    console.log('list saved！total：' + result.length);
  }
};