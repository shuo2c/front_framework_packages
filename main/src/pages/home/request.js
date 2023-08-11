import { request } from '@/request/index'
const linkApi = process.env.VUE_APP_LINKAPI

// =====================导航分类相关接口====================================
// 创建导航分类标签
export function tagCreate(data) {
  return request({
    url: `/${linkApi}/tag/add`,
    method: 'post',
    data,
  })
}

// 获取用户下的导航分类
export function getUserTagLine(params) {
  return request({
    url: `/${linkApi}/tag/getUserTag`,
    method: 'get',
    params,
  })
}

// 编辑标签
export function tagEdit(data) {
  return request({
    url: `/${linkApi}/tag/edit`,
    method: 'post',
    data,
  })
}

// 删除标签
export function tagDelete(data) {
  return request({
    url: `/${linkApi}/tag/delete`,
    method: 'delete',
    data,
  })
}

// ======================导航分类块相关接口=====================================
// 创建导航分类块
export function blockCreate(data) {
  return request({
    url: `/${linkApi}/block/add`,
    method: 'post',
    data,
  })
}

// 获取导航分类块
export function getBlockList(params) {
  return request({
    url: `/${linkApi}/block/getBlockList`,
    method: 'get',
    params,
  })
}

// 编辑导航块的接口
export function blockEdit(data) {
  return request({
    url: `/${linkApi}/block/edit`,
    method: 'post',
    data,
  })
}

// 删除导航块部分
export function blockDelete(data) {
  return request({
    url: `/${linkApi}/block/delete`,
    method: 'delete',
    data,
  })
}

// =============================导航分类块下创建书签card=========================

// 创建块下的书签
export function cardLinkCreate(data) {
  return request({
    url: `/${linkApi}/link/add`,
    method: 'post',
    data,
  })
}

// 获取块下的所有link
export function getBlockLink(params) {
  return request({
    url: `/${linkApi}/link/getLinksByBlock`,
    method: 'get',
    params,
  })
}

// 获取标签下的所有link
export function getTagLinks(params) {
  return request({
    url: `/${linkApi}/link/getTagLinks`,
    method: 'get',
    params,
  })
}

// 编辑link
export function cardLinkEdit(data) {
  return request({
    url: `/${linkApi}/link/edit`,
    method: 'post',
    data,
  })
}

// 删除link
export function deleteCard(data) {
  return request({
    url: `/${linkApi}/link/delete`,
    method: 'delete',
    data,
  })
}
