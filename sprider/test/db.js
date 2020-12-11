var db=require('../model/mysql.js');
// 查询实例
// db.dbTest()

// 查询实例
db.query('select * from jd', [],function(result,fields){
    console.log('查询结果：');
    console.log(result);
});
//添加实例
// var  addSql = 'INSERT INTO websites(username,password) VALUES(?,?)';
// var  addSqlParams =['咕噜先森', '666'];
// db.query(addSql,addSqlParams,function(result,fields){
//     console.log('添加成功')
// })