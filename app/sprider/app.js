const scrapList = require('./indeed/scrapList')

const mongoose = require('mongoose');
const dbHelper = require('./utils/dbhelper')
const jdModel = require('./model/jd');
const url  = 'mongodb://cnbetaAdmin:123456@mongo:27017/cnbeta'
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


const queryOptions = {
  host: 'ca.indeed.com',
  query: 'Machine Learning Engineer',
  city: 'Toronto, ON',
  radius: '30',
  level: '',
  jobType: 'fulltime',
  maxAge: '7',
  sort: 'date',
  limit: 100
};

scrapList.query(queryOptions).then(res => {
    console.log(res.length); // An array of Job objects
    saveDB(res)
});


/**
 * 将文章列表存入数据库
 * @param result
 * @param callback
 * @returns {Promise.<void>}
 */
const saveDB = async(result) => {
  //console.log(result);
  let flag = await dbHelper.insertCollection(jdModel, result).catch(function (err){
    console.log('data insert falied');
  });
  if (!flag) {
    console.log('news list save failed');
  } else {
    console.log('list saved！total：' + result.length);
  }
};