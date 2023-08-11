import axios from 'axios'
import { getLocalStorageValue, removeLocalStorageValue } from '@/common/utils/localStorage'
// import qs from 'qs'

// 环境切换设置
let baseURL = ''
if (process.env.NODE_ENV === 'development') {
  baseURL = ''
} else if (process.env.NODE_ENV === 'production') {
  baseURL = ''
}

// 创建一个axios的实例
const request = axios.create({
  baseURL,
  withCredentials: true, //跨域请求开启认证
  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求超过 `timeout` 的时间，请求将被中断
  timeout: 10000,
  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  // transformRequest: [
  //   function (data) {
  //     // 对 data 进行任意转换处理
  //     return qs.stringify(data)
  //   },
  // ],
  // paramsSerializer(params) {
  //   return qs.stringify(params, { arrayFormat: 'brackets' })
  // },
})

// request拦截器 request interceptor
request.interceptors.request.use(
  config => {
    // 带着 token发送给后端
    config.headers['Authorization'] = `Bearer ${getLocalStorageValue('AuthToken')}`
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    const { code } = response.data
    if (code !== 200 && code !== 201) {
      return Promise.reject(response.data)
    } else {
      return Promise.resolve(response.data)
    }
  },
  error => {
    // 用于处理快速刷新界面的情况，请求会被cancel跑到error上
    if (!error.response) {
      return Promise.resolve()
    }
    if (error.response.status === 401) {
      // 重置掉token
      removeLocalStorageValue('AuthToken')
      setTimeout(() => {
        window.location.href = `http://${window.location.host}/login`
      }, 1000)
      return Promise.reject({ code: 401, message: '登陆失效，请重新登录...' })
    } else {
      return Promise.reject(error.response.data)
    }
  },
)

// 获取cancelToken, 仅适用于当前实例
function getCancelTokenSource() {
  return request.CancelToken.source()
}
// 抛出axios请求对象
export { request, getCancelTokenSource }
