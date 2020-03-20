/**
 * mongoDB配置信息
 * @type {{localUrl: string, originIp: string, localPort: number, db: {articlelist: string}, options: {server: {poolSize: number}}}}
 */
module.exports = {
    localUrl: 'mongo',
    originIp: 'mongo',
    localPort: 27017,
    db: {
        cnbeta: 'cnbeta'
    },
    options: {
        server: {
            poolSize: 5
        }
    }
}