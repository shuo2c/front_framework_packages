// path和name命名规则，以文件夹名称为主，防止在加载的时候name冲突
export default [
  {
    path: '/login',
    name: 'login',
    // 元信息
    meta: {
      title: '登录',
    },
    // 添加根层级,字段默认false,处理全屏error等
    isRoot: true,
    // route level code-splitting 代码切割
    // this generates a separate chunk (vant-case.[hash].js) for this route 切割文件hash
    // which is lazy-loaded when the route is visited. 懒加载
    component: () => import(/* webpackChunkName: "login" */ '@/pages/login/login.vue'),
  },
]
