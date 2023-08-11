<template>
  <div class="list_crad">
    <div class="list_block_title">
      <div class="left">
        <span class="title">{{ block.title }}</span>
        <span class="description">{{ block.description }}</span>
      </div>
      <div class="right">
        <el-dropdown trigger="click" @command="menuClick">
          <span class="el-dropdown-link">更多<i class="el-icon-arrow-down el-icon--right"></i> </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="add" icon="el-icon-plus">新增书签</el-dropdown-item>
            <el-dropdown-item command="updateBlock" icon="el-icon-edit">更新块信息</el-dropdown-item>
            <el-dropdown-item command="delBlock" icon="el-icon-delete">删除块信息</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="list_block_content">
      <template v-if="links.length > 0">
        <template v-for="(item, index) in links">
          <card :key="index" :cardInfo="item" @deleteLink="deleteLink" @editCardLink="editCardLink"></card>
        </template>
      </template>
      <div v-else>
        <p class="empty_desc">
          快来添加个书签吧，<span class="create_button" @click="menuClick('add')">点击创建</span>
        </p>
      </div>
    </div>
    <!--创建书签的弹窗-->
    <diaCradLink
      v-if="dialogCeateLinkObj.show"
      :block="block"
      :card="dialogCeateLinkObj.card"
      :visiable.sync="dialogCeateLinkObj.show"
      @observeLink="observeLink"
    ></diaCradLink>
  </div>
</template>

<script>
import diaCradLink from './create_card.vue'
import card from './card.vue'
import { getBlockLink, deleteCard } from '../../request.js'
import { mapGetters } from 'vuex'
export default {
  components: {
    card,
    diaCradLink,
  },
  props: {
    // 块信息
    block: {
      default() {
        return {}
      },
      type: Object,
    },
  },
  data() {
    return {
      // 创建link的弹窗字段
      dialogCeateLinkObj: { show: false, card: {} },
      // links
      links: [],
    }
  },
  computed: {
    ...mapGetters('account', {
      user: 'getUserInfo',
    }),
  },
  watch: {
    block: {
      handler(n) {
        this.links = n.links
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    // 按钮点击
    menuClick(actions) {
      const funcMap = {
        add: () => {
          this.dialogCeateLinkObj.show = true
          this.dialogCeateLinkObj.card = {}
        },
        updateBlock: () => {
          this.$emit('updateBlock', this.block)
        },
        delBlock: () => {
          this.$emit('delteBlock', this.block)
        },
      }
      funcMap[actions]()
    },
    // 更新link
    observeLink() {
      getBlockLink({ id: this.block.id, userId: this.user.uuid })
        .then(({ data }) => {
          this.links = data
        })
        .catch(err => {
          this.$message.error(err.message)
        })
    },
    // 更新link
    editCardLink(cardInfo) {
      this.dialogCeateLinkObj.show = true
      this.dialogCeateLinkObj.card = cardInfo
    },
    // 删除link
    deleteLink(cardInfo) {
      this.$confirm('删除的链接不可恢复，是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          deleteCard({ userId: this.user.uuid, id: cardInfo.id })
            .then(data => {
              this.$message.success(data.message)
              this.observeLink()
            })
            .catch(err => {
              this.$message.warning(err.message)
            })
        })
        .catch(() => {})
    },
  },
}
</script>

<style lang="less" scoped>
.list_crad {
  padding: 12px 14px;
  border-radius: 4px;
  background: #fff;
  margin-bottom: 25px;
  .list_block_title {
    display: flex;
    justify-content: space-between;
    padding-bottom: 8px;
    border-bottom: 1px solid #ddd;
    .left span {
      display: inline-block;
      margin-right: 25px;
    }
    .left .title {
      font-size: 16px;
      font-weight: bold;
    }
    .left .description {
      color: #a1a7b7;
    }
    .right {
      width: 60px;
      flex-shrink: 0;
      /deep/ .el-dropdown-link {
        color: #909399;
        cursor: pointer;
        font-size: 13px;
        font-weight: bold;
      }
    }
  }
  .list_block_content {
    display: flex;
    flex-flow: wrap;
  }
  .empty_desc {
    color: #a1a7b7;
    .create_button {
      color: #409eff;
      cursor: pointer;
    }
  }
}
</style>
