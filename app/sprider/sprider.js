const jdListInit = require('./indeed/getJdList');
const logger = require('./config/log');
const start = async() => {
  logger.warn('start ');
  let jdListRes = await jdListInit();
  if (!jdListRes) {
      logger.warn('news list update failed...');
  } else {
      logger.info('news list update succeed！');
  }
};
start();
// if (typeof articleListInit === 'function') {
//   start();
// }
// setInterval(start, 600000); // 每十分钟运行一次