const scrapList = require('./indeed/scrapList')
const dbHelper = require('./utils/dbHelper')
const { jdModel, jdDbModel } = require('./model/jd');
const logger = require('./config/log');
// var express = require('express')
// var app = express()

const queryOptions = {
  host: 'ca.indeed.com',
  query: 'Machine Learning Engineer',
  city: 'Toronto, ON',
  radius: '25',
  level: 'entry_level',
  jobType: 'fulltime',
  maxAge: '7',
  sort: 'date',
  limit: 10
};

scrapList.query(queryOptions).then(res => {
    console.log(res); // An array of Job objects
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
  let flag = await dbHelper.insertCollection(jdDbModel, result).catch(function (err){
      logger.error('data insert falied');
  });
  if (!flag) {
      logger.error('news list save failed');
  } else {
      logger.info('list saved！total：' + result.length);
  }
};



// function getQuery(query) {
//   const queryOptions = {
//     host: 'ca.indeed.com',
//     query: `${query}`,
//     city: 'Toronto, ON',
//     radius: '25',
//     level: '',
//     jobType: 'fulltime',
//     maxAge: '7',
//     sort: 'relevance',
//     limit: 100
//   };
//   return queryOptions;
// }
// app.get('/:query', async function (req, res) {
//   try {
//     let {
//       query
//     } = req.params;
//     query = query.replace(/\-/g, " ");
//     console.log("buscando categoria:", query);
//     const queryOptions = await (getQuery(query))
//     const lol = await scrapList.query(queryOptions);
//     res.json(lol);
//   } catch (e) {
//     console.log(e)
//   }

// })

// const port = process.env.PORT || 3000;
// const ip = process.env.IP;

// app.listen(port, ip, function () {
//   console.log('Example app listening on port 3000!');
// });