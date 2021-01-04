const config = require('../config')
const mongoose = require('mongoose')
mongoose.connect(config.database.testUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// for Connected
const MongoDo = toDo => {
  /// 开启 mongon 的联结
  console.log('TTTTTTTTTTTTTTTTTTT')

  mongoose.connection.on(
    'error',
    console.error.bind(console, 'connection error:')
  )
  mongoose.connection.once('open', function () {
    // we're connected!
    console.log('Mongoose connection open')
  })
  // xxx

  toDo(() => {
    mongoose.disconnect()
    console.log('MongoClient is closing...')
  })
}
module.exports = MongoDo
