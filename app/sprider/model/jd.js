const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const jdSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    summary: String,
    url: {
        type:String,
        default: ''},
    company: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Company'},
    postDate: { 
        type: Date,
        default: Date.now},
    salary: {
        type:String,
        default: ''},
    isEasyApply: {
        type:String,
        default: ''},
    content: {
        type:String,
        default: ''},
    jobTitle:{
        type:String,
        default: ''},
    hash:{
        type:String,
        unique: true}
})

// 以url为索引
jdSchema.index({ hash: 1 }, { unique: true, background: true, dropDups: true })
jdSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Jds', jdSchema)