const moment = require('moment')

a = 'Just posted'.replace(/[^0-9]/ig,"") * 1
let today = moment().subtract(a, 'days').format('L');

console.log(today)
// console.log(moment().format('L'))
