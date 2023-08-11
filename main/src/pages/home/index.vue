<template>
  <div class="so_home">
    <div class="left_links_list">
      <!--搜索模块-->
      <div class="quick_search">
        <el-input
          v-model="searchContext"
          class="input-with-select"
          placeholder="请输入关键字，按回车/Enter搜索"
          size="medium "
        >
          <el-select slot="prepend" v-model="searchSite" placeholder="请选择">
            <el-option label="百度" value="1"></el-option>
            <el-option label="本站" value="2"></el-option>
          </el-select>
          <i slot="suffix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>

      <!--c分类区域-->
      <div class="custom_category">
        <div class="quick_menu">
          <tag @tagChange="tagChange" />
        </div>
      </div>

      <!--内容展示区域-->
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

      <!--回到顶部-->
      <i class="el-icon-top back_to_top"></i>
    </div>
    <div class="right_link_show">
      <div class="web_site_operation">
        <el-button size="mini" type="default" @click="openInTag(1)">全屏</el-button>
        <el-button plain size="mini" type="primary" @click="openInTag(2)">页签</el-button>
        <el-button plain size="mini" type="primary" @click="openInTag(3)">iframe</el-button>
        <!-- <el-button plain size="mini" type="primary" @click="moreOperation">编辑</el-button> -->
        <span style="color: #a1a7b7; font-size: 12px; margin-left: 12px">当前加载链接：</span>
        <span style="color: #3a8ee6; font-size: 12px">{{ this.previewUrl || '无连接' }}</span>
      </div>

      <iframe v-show="showIframe" id="browser_view" class="browser_view" frameborder="0" :src="previewUrl"></iframe>
      <div v-show="!showIframe" class="more_link_operation browser_view">期待</div>
    </div>
  </div>
</template>

<script>
import cardList from './components/card_list/index.vue'
import tag from './components/tag/index.vue'
import { mapGetters } from 'vuex'
export default {
  components: { cardList, tag },
  data() {
    return {
      // 查询网站
      searchSite: '1',
      // 查询内容
      searchContext: '',
      // 当前选中的标签
      selectTag: {},
      noTagImg: require('@/pages/home/images/no_tags.png'),
      myWindow: undefined,
      showIframe: true,
    }
  },
  computed: {
    ...mapGetters('home', {
      previewUrl: 'getPreviewUrl',
    }),
  },
  watch: {
    previewUrl: {
      handler() {
        this.showIframe = true
      },
    },
  },
  mounted() {
    //1、获取header和goTop元素
    const linkList = document.querySelector('.left_links_list')
    const goTop = document.querySelector('.back_to_top')
    //2、绑定事件
    linkList.onscroll = function () {
      //获取当前浏览器的高度
      const height = linkList.scrollTop
      //判断浏览器卷去的高度是否大于我们的临界点来决定我们要做那些事情
      if (height >= 300) {
        goTop.style.display = 'block'
      } else {
        goTop.style.display = 'none'
      }
    }
    //   3、给回到顶部绑定点击事件，使点击回到顶部的时候滚动回到顶部
    goTop.onclick = function () {
      linkList.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  },
  destroyed() {
    if (this.myWindow) {
      this.myWindow.close()
    }
  },
  methods: {
    // 导航标签改变触发的事件
    tagChange(tagInfo) {
      this.selectTag = tagInfo
    },
    // 点击网站web标签的形式预览
    openInTag(openMthod) {
      if (openMthod === 1) {
        window.open(this.previewUrl)
      } else if (openMthod === 2) {
        const browserViewDom = document.getElementById('browser_view')
        const { width, height, top, left } = browserViewDom.getBoundingClientRect()
        if (this.myWindow) {
          this.myWindow.close()
        }
        // 重新打开新的窗口
        this.myWindow = window.open(
          this.previewUrl,
          '',
          `width=${width - 14}, height=${height - 72}, top=${
            top + 100
          }, left=${left},titlebar=no,resizable=no,status=no,toolbar=no`,
          true,
        )
      } else if (openMthod === 3) {
        this.showIframe = true
      }
    },
    // 更多选项
    moreOperation() {
      this.showIframe = false
    },
  },
}
</script>

<style lang="less" scoped>
.so_home {
  height: 100%;
  background: #f5f7fa;
  box-sizing: border-box;
  padding: 0px;
  width: 100%;
  display: flex;
  .left_links_list {
    position: relative;
    width: 420px;
    flex-shrink: 0;
    background: #f6f5f4;
    border-right: 1px solid #c0c4cc;
    border-left: 1px solid #c0c4cc;
    box-sizing: border-box;
    padding: 12px 12px;
    overflow: auto;
    .quick_search {
      text-align: center;
      /deep/ .el-select .el-input {
        width: 80px;
      }
      /deep/ .input-with-select {
        width: 395px;
        .el-input-group__prepend {
          background-color: #fff;
        }
      }
      /deep/ .el-input__suffix {
        right: 8px;
      }
    }

    .custom_category {
      background: #f6f5f4;
      padding: 15px 0px 0px;
      margin-bottom: 15px;
    }

    .back_to_top {
      font-size: 32px;
      font-weight: bold;
      position: fixed;
      bottom: 20px;
      left: 460px;
      width: 33px;
      height: 33px;
      border-radius: 50%;
      border: 2px solid #303133;
      color: #fff;
      background: #303133;
      cursor: pointer;
      display: none;
    }
    .no_tag_images {
      margin-top: 100px;
    }
  }
  .right_link_show {
    height: 100%;
    width: calc(100% - 420px);
    .web_site_operation {
      width: 100%;
      height: 32px;
      background: #fff;
      border-bottom: 1px solid #ddd;
      line-height: 32px;
      padding: 0px 12px;
      box-sizing: border-box;
    }
    .browser_view {
      width: 100%;
      height: calc(100% - 38px);
    }
  }
}
</style>
