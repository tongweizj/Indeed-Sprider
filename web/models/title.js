const mongoose = require('mongoose');

const titleSchema = new mongoose.Schema({
  id: String,
  title: String,
});

module.exports = mongoose.model('Jds', jsSchema);