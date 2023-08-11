// node作为代理服务器
const http = require('http') // http请求函数
const querystring = require('querystring') // url地址解析函数
const url = require('url') // url辅助函数

// port代理端口
const port = 10101

// 创建服务器实例
const server = http.createServer()

// 监听客户端请求事件
// req 是此次请求，res 则是此次请求的结果
server.on('request', onRequest)
// 启动服务器
server.listen(port, () => {
  // 8080 是服务开启在本机的 8080 端口
  console.log('服务器启动成功！')
})

// 请求调用的方法
function onRequest(req, res) {
  const originUrl = url.parse(req.url)
  const qs = querystring.parse(originUrl.query)
  const targetUrl = qs['target']
  const target = url.parse(targetUrl)

  const options = {
    hostname: target.hostname,
    port: 80,
    path: url.format(target),
    method: 'GET',
  }

  // 2.代发请求
  const proxy = http.request(options, _res => {
    // 3.修改响应头
    const fieldsToRemove = ['x-frame-options', 'content-security-policy', 'frame-ancestors']
    Object.keys(_res.headers).forEach(field => {
      if (!fieldsToRemove.includes(field.toLocaleLowerCase())) {
        res.setHeader(field, _res.headers[field])
      }
    })
    _res.pipe(res, {
      end: true,
    })
  })
  req.pipe(proxy, {
    end: true,
  })
}
