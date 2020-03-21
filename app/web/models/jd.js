const mongoose = require('mongoose');

const jsSchema = new mongoose.Schema({
  id: String,
  title: String,
  summary: String,
  url: String,
  company: String,
  location: String,
  postDate: String,
  salary: String,
  isEasyApply: String,
  content: String,
  jobTitle: String
});

module.exports = mongoose.model('Jds', jsSchema);