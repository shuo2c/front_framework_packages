// 全局业务store, 不同全局业务之间store用不同文件区分 example: [account.js, team.js] ...
import { request } from '@/request'
import { Message } from 'element-ui'
const linkApi = process.env.VUE_APP_LINKAPI

export default {
  namespaced: true,
  state: () => ({
    nickname: '',
    phone: '',
    userInfo: {},
  }),
  mutations: {
    /**
     *@param {Object} state 本空间下的state
     *@param {Object} payload 传递的参数对象
     */
    setUserInfo(state, payload) {
      state.userInfo = payload
      state.phone = payload.phone
      state.nickname = payload.nickname
    },
  },
  actions: {
    getUserAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        request({
          url: `/${linkApi}/user/getUser`,
          method: 'get',
          params: payload,
        })
          .then(({ data }) => {
            commit('setUserInfo', data)
            resolve()
          })
          .catch(err => {
            Message.warning(err.message)
            reject()
          })
      })
    },
  },
  getters: {
    // 获取用户姓名
    getUserInfo(state) {
      return state.userInfo
    },
  },
}
