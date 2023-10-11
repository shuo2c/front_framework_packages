// 获取当前menu菜单配置
export function menuConfig() {
  return [
    {
      title: '每日常用',
      groups: [
        {
          prefixIcon: 'el-icon-paperclip',
          toPath: '/home',
          toName: 'home',
          title: '书签管理',
          suffixIcon: 'el-icon-s-operation',
        },
        {
          prefixIcon: 'el-icon-s-marketing',
          toPath: '/knowledgeBase',
          toName: 'knowledgeBase',
          title: '知识库',
          suffixIcon: 'el-icon-s-operation',
        },
      ],
      darkColor: false,
    },
    {
      title: '前端框架',
      groups: [
        { prefixIcon: 'el-icon-paperclip', toPath: '', title: 'Vue', suffixIcon: 'el-icon-s-operation' },
        { prefixIcon: 'el-icon-s-marketing', toPath: '', title: 'React', suffixIcon: 'el-icon-s-operation' },
        { prefixIcon: 'el-icon-user', toPath: '', title: 'Bootstrap', suffixIcon: 'el-icon-s-operation' },
      ],
      darkColor: false,
    },
  ]
}
