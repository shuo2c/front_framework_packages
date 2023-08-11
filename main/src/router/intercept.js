import store from '@/store'
import { getLocalStorageValue } from '@/common/utils/localStorage'

// 创建白名单
const whiteList = ['/login']

const routeInterceptor = router => {
  // 定义路由导航守卫(全局, 慎重加逻辑和同步请求数据, 会导致页面响应速度变慢)
  // https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%89%8D%E7%BD%AE%E5%AE%88%E5%8D%AB
  router.beforeEach((to, from, next) => {
    const title = to.meta && to.meta.title
    title ? (document.title = title) : ''
    // 判断用户是否登录含有AuthToken
    const hasToken = getLocalStorageValue('AuthToken')
    if (hasToken) {
      // token存在，如果当前跳转的路由是登录界面
      if (to.path === '/login') {
        next({ path: '/home' })
      } else {
        // 权限判定和用户信息获取
        if (Object.keys(store.getters['account/getUserInfo']).length <= 0) {
          const requests = [store.dispatch('account/getUserAction')]
          Promise.all(requests)
            .then(() => {
              next()
            })
            .catch(() => {})
        } else {
          next()
        }
      }
    } else {
      //token不存在
      if (whiteList.indexOf(to.path) !== -1) {
        // 白名单部分直接跳转
        next()
      } else {
        //否则跳转到登录页面, 并添加回调地址
        next(`/login?redirect=${to.path}`)
      }
    }
  })
}

export { routeInterceptor }
