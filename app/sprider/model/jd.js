const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const jdModel = mongoose.Schema({
    id: String,
    title: String,
    summary: String,
    url: {type:String,unique: true},
    company: String,
    location: String,
    postDate: String,
    salary: String,
    isEasyApply: String,
    content: String
})

// 以url为索引
jdModel.index({ url: 1 }, { unique: true, background: true, dropDups: true })
jdModel.plugin(mongoosePaginate);

module.exports = mongoose.model('Jds', jdModel)