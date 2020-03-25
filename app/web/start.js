require('./models/Registration');
require('./models/jd');
const app = require('./app');
const mongoose = require('mongoose');
const url = 'mongodb://admin:123456@mongo:27017/db_jds'
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

mongoose.connection
.on('open', () => {
console.log('Mongoose connection open');
})
.on('error', (err) => {
console.log(`Connection error: ${err.message}`);
});


const server = app.listen(3000, () => {
  console.log(`Express is running on port ${server.address().port}`);
});