<template>
  <div class="link_card">
    <div class="lk_head">
      <div class="card_head">
        <img :src="getPreviewImage()" @error="errorImage" />
        <span class="title" :title="cardInfo.title" @click="goBlankUrl">{{ cardInfo.title }}</span>
      </div>
      <div class="opeation">
        <el-dropdown placement="bottom-start" trigger="click" @command="menuClick">
          <span class="el-dropdown-link"><i class="el-icon-arrow-down el-icon--right"></i> </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="newOpen"><i class="el-icon-lollipop"></i>全屏</el-dropdown-item>
            <el-dropdown-item command="edit"><i class="el-icon-edit"></i>编辑</el-dropdown-item>
            <el-dropdown-item command="delete"><i class="el-icon-delete"></i>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="lk_content">
      <div class="desc">{{ cardInfo.description }}</div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    cardInfo: {
      default() {
        return {}
      },
      type: Object,
    },
  },
  data() {
    return {
      noCardImg: require('@/pages/home/images/card_empty.png'),
    }
  },
  methods: {
    ...mapMutations('home', ['setPreviewUrl']),
    // 裂图，图片加载失败
    errorImage(event) {
      event.target.src = this.noCardImg
    },
    // 跳转到新的页签
    goBlankUrl() {
      this.setPreviewUrl(this.cardInfo.link_url)
    },
    // 加载link的预览图片
    getPreviewImage() {
      if (this.cardInfo.img_url) {
        return this.cardInfo.img_url
      } else {
        return `https://favicon.cccyun.cc/${this.cardInfo.link_url}`
      }
    },
    // card 菜单项操作
    menuClick(actions) {
      const funcMap = {
        newOpen: () => {
          window.open(this.cardInfo.link_url)
        },
        edit: () => {
          this.$emit('editCardLink', this.cardInfo)
        },
        delete: () => {
          this.$emit('deleteLink', this.cardInfo)
        },
      }
      funcMap[actions]()
    },
  },
}
</script>

<style lang="less" scoped>
.link_card {
  box-sizing: border-box;
  width: 100%;
  background: #f5f7fa;
  margin: 2px 0px;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 8px;
  &:hover {
    background: #6b7184;
    .lk_head .card_head .title {
      color: #fff;
    }
    .lk_content {
      color: #c0c8dc;
    }
    /deep/ .el-icon-arrow-down {
      color: #fff;
    }
  }
  .lk_head {
    display: flex;
    justify-content: space-between;
    .card_head {
      height: 30px;
      img {
        display: inline-block;
        box-sizing: border-box;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .title {
        color: #30333c;
        font-weight: bold;
        font-size: 14px;
        line-height: 30px;
        width: 150px;
        overflow: hidden; //溢出内容隐藏
        text-overflow: ellipsis; //文本溢出部分用省略号表示
        white-space: nowrap;
        display: inline-block;
      }
    }
    .opeation {
      box-sizing: border-box;
      padding-top: 7px;

      .el-dropdown-link {
        cursor: pointer;
        font-size: 12px;
      }
    }
  }
  .lk_content {
    font-size: 12px;
    color: #a1a7b7;
    margin-top: 4px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden; //溢出内容隐藏
    text-overflow: ellipsis; //文本溢出部分用省略号表示
    display: -webkit-box; //特别显示模式
    -webkit-line-clamp: 2; //行数
    line-clamp: 2;
    -webkit-box-orient: vertical; //盒子中内容竖直排列
  }
}
</style>
