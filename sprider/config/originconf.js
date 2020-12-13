// const dbUrl = 'mongodb://admin:123456@mongo:27017/db_jds';
const dbUrl = 'mongodb://admin:admin123456@192.168.0.100:27017/zhaowork';
const indeedQuery = {
  host: 'ca.indeed.com',
  query: `Machine Learning Engineer`, //'Machine Learning Engineer',
  city: 'Toronto, ON',
  radius: '50',
  level: '',
  jobType: 'fulltime',
  maxAge: '7',
  sort: 'date',
  limit: 100,
};
titleList = ['machine learning engineer', 'full stack developer', 'data scientist', 'back end developer'];
module.exports = {
  dbUrl,
  indeedQuery,
  titleList,
};
