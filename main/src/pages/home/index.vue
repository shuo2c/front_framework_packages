<template>
  <div class="link_home">
    <div class="custom_category">
      <div class="quick_menu">
        <tag @tagChange="tagChange" />
      </div>
    </div>

    <div class="custom_content">
      <cardList :showCreateBlockOperation="Object.keys(selectTag).length > 0" :tag="selectTag"></cardList>
      <el-empty
        v-if="Object.keys(selectTag).length <= 0"
        class="no_tag_images"
        description="还没有要展示的内容"
        :image="noTagImg"
        :image-size="400"
      >
      </el-empty>
    </div>
  </div>
</template>

<script>
import cardList from './components/card_list/index.vue'
import tag from './components/tag/index.vue'
export default {
  components: { cardList, tag },
  data() {
    return {
      // 当前选中的标签
      selectTag: {},
      noTagImg: require('@/pages/home/images/no_tags.png'),
      showIframe: true,
    }
  },
  computed: {},
  watch: {},
  mounted() { },
  destroyed() { },
  methods: {
    // 导航标签改变触发的事件
    tagChange(tagInfo) {
      this.selectTag = tagInfo
    },
  },
}
</script>

<style lang="less" scoped>
.link_home {
  height: 100%;
  background: #f5f7fa;
  box-sizing: border-box;
  padding: 12px;
  width: 100%;

  .custom_category {
    background: #fff;
    padding: 12px;
    margin-bottom: 15px;
    border-radius: 12px;
    // box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.2);
    border: 1px solid #f5f7fa;
  }

  .custom_content {
    height: calc(100% - 120px);
  }

  .no_tag_images {
    margin-top: 100px;
  }
}
</style>
