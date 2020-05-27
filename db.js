// 导出函数，作用是完成mysql操作（增删改查）
// @param sql SQL语句
// @param params 为SQL语句中的占位符传递的值，默认是null
// @returns Promise对象

module.exports = (sql, params = null) => {
  const mysql = require('mysql');
  const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bigevent', // 数据库一会创建 
  });

  return new Promise((resolve, reject) => {
    conn.connect();
    conn.query(sql, params, (err, result) => {
      err ? reject(err) : resolve(result);
    });
    conn.end();
  }).catch(err => {
    console.log(err.sqlMessage);
    //这里输出 err.message 也可以
  });
}
