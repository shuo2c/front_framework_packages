import Vue from 'vue'
import App from './App.vue'
// 引入封装侯的router, vuex, i18b
import router from '@/router'
import store from '@/store'
import { i18n } from '@/common/i18n/index'
// 引入底层样式
import 'normalize.css'
import '@/assets/css/custom.css'
//引入进度条
import 'nprogress/nprogress.css'
// 引入乾坤主框架, 和微应用路径
import microApps from './config/micro-apps'
// eslint-disable-next-line
import { registerMicroApps, start, setDefaultMountApp } from 'qiankun'
// 初始化gloState
import gloState from '@/common/qiankun/global-state'
window.$gloState = gloState
// 取消console内的提示信息
Vue.config.productionTip = false

// markdown代码高亮
import hljs from 'highlight.js'
Vue.prototype.$hljs = hljs
// 有多种样式可选，也可以到对应文件中定制化
import 'highlight.js/styles/atom-one-dark.css'

// 自定义命令v-highlight
Vue.directive('highlight', function (el) {
  const blocks = el.querySelectorAll('pre code')
  blocks.forEach(block => {
    if (!block.dataset.highlighted) {
      hljs.highlightElement(block)
    }
  })
})
//复制组件引用
import clipboard from 'clipboard'
Vue.prototype.clipboard = clipboard

// 按需加载常用的EElement组件
// Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }
import elComponents from './config/uiframe.js'
elComponents.forEach(item => {
  Vue.use(item)
})

// 渲染主应用
const instance = new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')

// 定义loader方法，loading改变时，将变量赋值给App.vue的data中的isLoading
function loader(loading) {
  if (instance && instance.$children) {
    // instance.$children[0] 是App.vue，此时直接改动App.vue的isLoading
    instance.$children[0].isLoading = loading
  }
}

// 给子应用配置加上loader方法
const apps = microApps.map(item => {
  return {
    ...item,
    loader,
  }
})

// 注册微应用, 并展示各个阶段的生命周期(该生命周期是基于single-spa的)
registerMicroApps(apps, {
  beforeLoad: app => {
    console.log('before load app.name====>>>>>', app.name)
  },
  beforeMount: [
    app => {
      console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name)
    },
  ],
  afterMount: [
    app => {
      console.log('[LifeCycle] after mount %c%s', 'color: green;', app.name)
    },
  ],
  beforeUnmount: [
    app => {
      console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name)
    },
  ],
  afterUnmount: [
    app => {
      console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name)
    },
  ],
})

// 设置主应用启动后默认进入的微应用。(使用自己的跳转)
// setDefaultMountApp('/sub-vue')
// 开启qiankun
start()
