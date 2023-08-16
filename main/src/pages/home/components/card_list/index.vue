<template>
  <div v-if="showCreateBlockOperation" class="custom_block">
    <!--块下按钮组-->
    <div class="block_operation">
      <i class="el-icon-folder-add el_icon" @click="showBlockDialog(true)"></i>
      <i class="el-icon-share el_icon"></i>
      <!--所有块的锚点-->
      <div class="anchor_pointer">
        <template v-for="(item, index) in personalityBlock">
          <a :key="index" class="block_anchor" :href="`#${item.id}`">{{ item.title }}</a>
        </template>
      </div>
    </div>

    <!--personalityBlock区域-->
    <div class="card_list">
      <cardList
        v-for="(item, index) in personalityBlock"
        :id="item.id"
        :key="index"
        :block="item"
        @delteBlock="delteBlock"
        @updateBlock="
          data => {
            showBlockDialog(false, data)
          }
        "
      ></cardList>
    </div>

    <!--无block块数据-->
    <div v-if="personalityBlock.length === 0" class="nothing_block_list">
      <el-empty :image-size="120">
        <span>您还没有创建导航块，</span><el-button type="text" @click="showBlockDialog(true)">点击创建</el-button>
      </el-empty>
    </div>
    <!--创建/编辑标签区域块的弹窗-->
    <diablock
      v-if="dialogCreateBlockObj.show"
      :block="dialogCreateBlockObj.blockData"
      :isAdd="dialogCreateBlockObj.isAdd"
      :tagInfo="tag"
      :visiable.sync="dialogCreateBlockObj.show"
      @confirmCallBack="oBserverBlockList"
    ></diablock>
  </div>
</template>

<script>
import { getBlockList, getTagLinks, blockDelete } from '../../request'
import cardList from '@/pages/home/components/card_list/cardList'
import diablock from '@/pages/home/components/card_list/create_block'
import { mapGetters } from 'vuex'
export default {
  components: { cardList, diablock },
  props: {
    tag: {
      default() {
        return {}
      },
      type: Object,
    },
    showCreateBlockOperation: {
      default: true,
      type: Boolean,
    },
  },
  data() {
    return {
      // 个性块
      personalityBlock: [],
      // 导航标签下block块的操作对象
      dialogCreateBlockObj: { show: false, isAdd: true, blockData: {} },
    }
  },
  computed: {
    ...mapGetters('account', {
      user: 'getUserInfo',
    }),
  },
  watch: {
    tag: {
      handler(n) {
        this.getTagBlockList(n.id)
      },
    },
  },
  methods: {
    // 创建新的block
    showBlockDialog(action, data) {
      this.dialogCreateBlockObj.isAdd = action
      this.dialogCreateBlockObj.show = true
      if (!action) {
        this.dialogCreateBlockObj.blockData = data
      }
    },
    // 响应刷线Block数据
    oBserverBlockList() {
      this.getTagBlockList(this.tag.id)
    },
    // 获取当前标签下的所有Block
    getTagBlockList(tagId) {
      if (!tagId) {
        return false
      }
      getBlockList({ userId: this.user.uuid, tagId })
        .then(({ data: blocks }) => {
          getTagLinks({ tagId, userId: this.user.uuid })
            .then(({ data: links }) => {
              this.personalityBlock = blocks.map(item => {
                item.links = links.filter(it => {
                  return it.block_id === item.id
                })
                return item
              })
            })
            .catch(err => {
              this.$message.error(err.message)
            })
        })
        .catch(err => {
          this.$message.error(err.message)
        })
    },
    // 删除块
    delteBlock(block) {
      this.$confirm('确认删除？ 删除后内部链接将会迁移到未定义标签中。', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          blockDelete({ userId: this.user.uuid, id: block.id })
            .then(data => {
              this.$message.success(data.message)
              this.oBserverBlockList()
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
.custom_block {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #f5f7fa;
  // box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.2);
  .block_operation {
    font-size: 20px;
    padding: 12px;

    .el_icon {
      margin-right: 8px;
      color: #909399;
      cursor: pointer;
      &:hover {
        color: #409eff;
      }
    }
    .block_anchor {
      white-space: nowrap;
      text-decoration-line: none;
      font-size: 12px;
      padding: 2px 6px;
      border-radius: 4px;
      margin-right: 2px;
      cursor: pointer;
      background: #6b7184;
      font-weight: bold;
      color: #fff;
    }
  }

  .card_list {
    display: flex;
    flex-direction: row;
    padding: 12px;
    overflow-x: scroll;
  }
}
.custom_block .nothing_block_list {
  background: #fff;
  min-height: 380px;
  /deep/ .el-empty__description {
    display: none;
  }
  /deep/ .el-empty__bottom {
    margin-top: 0px;
    font-size: 13px;
    color: #6b7184;
  }
}
</style>
