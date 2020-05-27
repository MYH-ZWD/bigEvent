const path = require('path');
const cors = require('cors');
const express = require('express');
const app = express();
app.listen(3007, () => console.log('大事件服务器启动了'));


// ----------  加载路由模块之前，设置应用级别的中间件 --------
// 解决跨域
app.use(cors());
// 接收 urlencoded 类型的请求体
app.use(express.urlencoded({ extended: false }));


// 加载路由模块，并注册成中间件
app.use('/api', require(path.join(__dirname, 'routers', 'login')));
app.use('/my/article', require(path.join(__dirname, 'routers', 'category')));
app.use('/my/article', require(path.join(__dirname, 'routers', 'article')));
app.use('/my', require(path.join(__dirname, 'routers', 'user')));