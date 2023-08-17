// 获取当前menu菜单配置
export function menuConfig() {
  return [
    {
      title: 'DailyApp',
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
          toPath: '',
          toName: 'home',
          title: '资源库',
          suffixIcon: 'el-icon-s-operation',
        },
        {
          prefixIcon: 'el-icon-user',
          toPath: '',
          toName: 'home',
          title: '用户展示',
          suffixIcon: 'el-icon-s-operation',
        },
      ],
      darkColor: false,
    },
    {
      title: 'FrameWork',
      groups: [
        { prefixIcon: 'el-icon-paperclip', toPath: '', title: 'Vue', suffixIcon: 'el-icon-s-operation' },
        { prefixIcon: 'el-icon-s-marketing', toPath: '', title: 'React', suffixIcon: 'el-icon-s-operation' },
        { prefixIcon: 'el-icon-user', toPath: '', title: 'Bootstrap', suffixIcon: 'el-icon-s-operation' },
      ],
      darkColor: false,
    },
  ]
}
