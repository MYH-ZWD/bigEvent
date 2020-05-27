const express = require('express');
const router = express.Router();

// 获取用户信息接口
router.get('/userinfo', async (req, res) => {
  // 当用户请求这个接口的时候，作为服务器，该把获得的信息返回客户端
  // let r = await db('select * from user where id = ?');
  console.log(req.user); // { username: 'laotang', id: 10}
});

module.exports = router;