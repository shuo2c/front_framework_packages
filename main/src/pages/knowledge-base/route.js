export default [
  {
    path: '/knowledgeBase',
    name: 'knowledgeBase',
    // 元信息
    meta: {
      title: '知识库',
    },
    // 添加根层级,字段默认false,处理全屏error等
    isRoot: false,
    // route level code-splitting 代码切割
    // this generates a separate chunk (vant-case.[hash].js) for this route 切割文件hash
    // which is lazy-loaded when the route is visited. 懒加载
    component: () => import(/* webpackChunkName: "knowledgeBase" */ '@/pages/knowledge-base/index.vue'),
  },
]
