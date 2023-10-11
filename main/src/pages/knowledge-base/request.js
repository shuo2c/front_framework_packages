import { request } from '@/request/index'
const linkApi = process.env.VUE_APP_LINKAPI

// 调用数据存储接口
export function addEventContent(data) {
  return request({
    url: `/${linkApi}/record/create`,
    method: 'post',
    data,
  })
}

// 调用存储数据列表接口
export function getRecordList(data) {
  return request({
    url: `/${linkApi}/record/getEventList`,
    method: 'post',
    data,
  })
}
