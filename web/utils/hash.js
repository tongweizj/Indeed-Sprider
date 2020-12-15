const crypto = require('crypto')
exports.make = function (str) {
  var hash = crypto.createHash('md5').update(str).digest('hex')
  //   console.log(hash) // 9b74c9897bac770ffc029102a200c5de
  return hash
}
