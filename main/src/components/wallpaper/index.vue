<template>
  <section class="home_wallpaper h-full w-full">
    <video
      :autoplay="true"
      class="h-full w-full video-define"
      :loop="true"
      muted
      :poster="sourceList[0].poster"
      :src="sourceList[0].url"
    ></video>
    <div class="mask transition-colors"></div>
  </section>
</template>

<script>
export default {
  name: 'wallpaper',
  props: {
    sourceList: {
      default: () => {
        return []
      },
      type: Array,
    },
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style scoped lang="less">
.home_wallpaper {
  position: absolute;
  overflow: hidden;
  z-index: -1;
  .video-define {
    object-fit: cover;
    position: absolute;
  }
  .transition-colors {
    transition-duration: 0.15s;
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.24);
    backdrop-filter: blur(0.6px);
  }
}
</style>
