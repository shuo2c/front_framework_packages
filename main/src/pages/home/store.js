// 全局通用的store, 不会自动挂载, 根据需要手动挂载
export default {
  namespaced: true,
  // state需要返回一个函数, 原理与data类似, 创建多个实例防止state共享一份数据
  state: () => ({
    previewUrl: '',
  }),
  mutations: {
    /**
     *@param {Object} state 本空间下的state
     *@param {Object} payload 传递的参数对象
     */
    setPreviewUrl(state, payload) {
      const re = new RegExp('^(http|https)://', 'i')
      if (!re.test(payload)) {
        state.previewUrl = `https://${payload}`
      } else {
        state.previewUrl = payload
      }
    },
  },
  actions: {},
  getters: {
    // 获取用户姓名
    getPreviewUrl(state) {
      return state.previewUrl
    },
  },
}
