<template>
  <div id="bli_banner" class="banner">
    <div><img src="./source/bilibili-autumn-1.png" /></div>
    <div><img src="./source/bilibili-autumn-2.png" /></div>
    <div><img src="./source/bilibili-autumn-3.png" /></div>
    <div><img src="./source/bilibili-autumn-4.png" /></div>
    <div><img src="./source/bilibili-autumn-5.png" /></div>
    <div><img src="./source/bilibili-autumn-6.png" /></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startX: 0,
      images: [],
    }
  },
  mounted() {
    this.$nextTick(() => {
      // 定义初始化的位置
      this.startX = 0
      // 获取相关图片的元素
      this.images = document.querySelectorAll('#bli_banner>div>img')

      // 添加一个监听事件(鼠标移动事件，移动至少一个像素就会触发)
      document.querySelector('#bli_banner').addEventListener('mousemove', e => {
        const offsetX = e.clientX - this.startX + 482
        const grayScale = ((this.startX + 482) / e.clientX) * 100 + '%'
        this.originState(false, offsetX, grayScale)
      })
      // 鼠标经过事件
      document.querySelector('#bli_banner').addEventListener('mouseover', e => {
        this.startX = e.clientX
        // for (const [image] of this.images.entries()) {
        //   image.style.transition = 'none'
        // }
      })

      // 鼠标离开事件
      document.querySelector('#bli_banner').addEventListener('mouseout', () => {
        this.originState(false)
      })
      // 界面加载事件
      window.addEventListener('load', () => {
        this.originState()
      })
    })
  },
  methods: {
    // 原始状态
    originState(isInit = true, offsetX = 482, grayscale = '100%') {
      const blur = 20 // 模糊度的百分比
      const percentage = offsetX / window.outerWidth // 鼠标移动的百分比
      let offset = 15 * percentage
      for (const [index, image] of this.images.entries()) {
        offset *= 1.3
        const blurValue = Math.pow(index / this.images.length - percentage, 2) * blur
        image.style.setProperty('--offset', `${offset}px`)
        image.style.setProperty('--blur', `${blurValue}px`)
        image.style.setProperty('--grayscale', `${grayscale}`)
        if (!isInit) {
          image.style.transition = 'all .3s ease'
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
body {
  margin: 0; //经典margin0
}
#bli_banner {
  position: relative; //开定位,六个图层需要以容器为坐标进行左右移动
  width: 100%;
  height: 100%; //给容器一个高度,防止高度坍塌
  overflow: hidden; //因为图层需要移动,所以图层要略大于容器,容器要做溢出隐藏
}
#bli_banner > div {
  position: absolute;
  top: 0;
  left: 0;
  display: flex; //直接flex居中,太美了这东西
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  --offset: 0; //这里定义css的变量方便后面js的处理
  --blur: 2px;
  --grayscale: 100%;
}
#bli_banner > div > img {
  display: block;
  width: 110%; //放大点,移动的时候不会有空白溢出
  height: 100%;
  filter: blur(var(--blur)) grayscale(var(--grayscale));
  transform: translateX(var(--offset)); //变量的使用
  object-fit: cover;
}
</style>
