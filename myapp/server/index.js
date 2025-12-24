import express from 'express'
import cors from 'cors'
const app = express()

app.use(cors()).use(express.json()) // 让 express 能解析 JSON 请求体

// 定义一个接口：POST /api/login
app.post('/data/login', (req, res) => {
  const { user, password } = req.body

  if (user === 'admin123' && password === 'admin123') {
    res.json({
      code: 200,
      message: '登录成功',
      token: 'abc.def.ghi'
    })
  } else {
    res.json({
      code: 401,
      message: '用户名或密码错误'
    })
  }
})

// 启动服务器
app.listen(8080, () => {
  console.log('✅ 后端服务器已启动: http://localhost:8080')
})