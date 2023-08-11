import { request } from '@/request/index'
const linkApi = process.env.VUE_APP_LINKAPI

// 登录接口
export function loginUser(data) {
  return request({
    url: `/${linkApi}/user/login`,
    method: 'post',
    data,
  })
}

// 注册接口
export function registryUser(data) {
  return request({
    url: `/${linkApi}/user/registry`,
    method: 'post',
    data,
  })
}
