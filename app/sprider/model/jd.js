

/**
 * 文章相关
 * @type {*}
 */
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const config = require('../config/dbconf');
mongoose.Promise = global.Promise;

var db=mongoose.connect(`mongodb://cnbetaAdmin:123456@${config.originIp}:${config.localPort}/${config.db.cnbeta}`);
// var db = mongoose.connect(`mongodb://${config.localUrl}:${config.localPort}/${config.db.articlelist}`);

mongoose.connection.on("error", function (error) {
    console.log("database connnecting failed：" + error);
});

mongoose.connection.on("open", function () {
    console.log("database connnecting succeeded");
});

const jdModel = {
    id: String,
    title: String,
    summary: String,
    url: String,
    company: String,
    location: String,
    postDate: String,
    salary: String,
    isEasyApply: String,
    content: String
};

let schema = mongoose.Schema;
let jdMap = new schema(jdModel);
// 以url为索引
jdMap.index({ url: 1 }, { unique: true, background: true, dropDups: true })
jdMap.plugin(mongoosePaginate);
let jdDbModel = mongoose.model('Jds', jdMap);

module.exports = { jdModel, jdDbModel };