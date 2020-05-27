const path = require('path');
const cors = require('cors');
const express = require('express');
const app = express();
const jwt = require('express-jwt');
app.listen(3007, () => console.log('大事件服务器启动了'));


// ----------  加载路由模块之前，设置应用级别的中间件 --------
// 解决跨域
app.use(cors());
// 接收 urlencoded 类型的请求体
app.use(express.urlencoded({ extended: false }));
// 解析token字符串，控制哪些接口必须登录才能访问
// 把用户保存的数据，放到 req.user 的变量上  //解密；控制api接口不需要权限就可以访问
app.use(jwt({ secret: 'bigevent' }).unless({ path: /^\/api/ }));

// 加载路由模块，并注册成中间件
app.use('/api', require(path.join(__dirname, 'routers', 'login')));
app.use('/my/article', require(path.join(__dirname, 'routers', 'category')));
app.use('/my/article', require(path.join(__dirname, 'routers', 'article')));
app.use('/my', require(path.join(__dirname, 'routers', 'user')));

// 错误处理中间件，必须是4个参数
app.use(function (err, req, res, next) {
  // console.log(err.name); // 错误的名字
  // console.log(err.message); // 错误的提示
  if (err.name === 'UnauthorizedError') {
    console.log(err.message); // 错误的提示
    // 如果错误的名字是 UnauthorizedError，则表示是token相关的错误
    res.status(401).send({ status: 1, message: '身份认证失败！' });
  }
});