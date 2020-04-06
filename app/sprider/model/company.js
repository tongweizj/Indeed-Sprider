const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        unique: true},
    indeed_url: {
        type:String,
        default: ''},
    web_url: {
        type:String,
        default: ''},
    location: {
        type:String,
        default: ''},
    logoUrl: {
        type:String,
        default: ''},
    hash:{
        type:String,
        unique: true}
})

companySchema.index({ hash: 1 }, { unique: true, background: true, dropDups: true })

module.exports = mongoose.model('Company', companySchema)