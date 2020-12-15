const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const mongoosePaginate = require('mongoose-paginate')

const jdSchema = new Schema({
  title: String,
  summary: String,
  url: {
    type: String,
    default: ''
  },
  company: {
    hash: String,
    name: String
  },
  postDate: {
    type: Date,
    default: Date.now
  },
  salary: {
    type: String,
    default: ''
  },
  isEasyApply: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  jobTitle: {
    type: String,
    default: ''
  },
  hash: {
    type: String,
    unique: true
  }
})

// 以url为索引
jdSchema.index({ hash: 1 }, { unique: true, background: true, dropDups: true })
// jdSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Jd', jdSchema)
