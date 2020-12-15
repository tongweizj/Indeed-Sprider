'use strict'

module.exports = {
  database: {
    url: 'mongodb://ggfadmin:12345678@192.168.0.100:27017/ggf',
    testUrl: 'mongodb://admin:admin123456@192.168.0.100:27017/zhaowork'
  },
  api: {
    db: 'http://192.168.0.100:2000/graphql',
    testDb: 'http://127.0.0.1:4000/graphql'
  },
  titleList: ['machine+learning+engineer']
}

// 'full stack developer',
// 'data scientist',
// 'back end developer'
