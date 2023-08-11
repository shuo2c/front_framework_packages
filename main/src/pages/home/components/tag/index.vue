<template>
  <div class="tag_line">
    <!--操作项导航-->
    <div class="operation">
      <span class="el_so_title">导航</span>
      <i
        v-if="Object.keys(currentTagObj).length > 0"
        class="el-icon-edit el_so_icon"
        @click="tagInputAction(false)"
      ></i>
      <i v-if="Object.keys(currentTagObj).length > 0" class="el-icon-close el_so_icon" @click="delTag"></i>
      <i class="el-icon-plus el_so_icon" @click="tagInputAction(true)"></i>

      <el-input
        v-if="showAddTagInput"
        v-model="tagName"
        :autofocus="true"
        class="tag_add_name"
        maxlength="30"
        placeholder="请输入导航名称"
      >
        <template slot="suffix">
          <i v-if="isAddButtonShow" class="el-icon-check el_so_icon" @click="addTag"></i>
          <i v-else class="el-icon-check el_so_icon" @click="editTag"></i>
          <i class="el-icon-close el_so_icon" @click="revertInput"></i>
        </template>
      </el-input>
    </div>
    <!--展示列表数据-->
    <div v-if="tagLine.length <= 0" class="hass_no_navigation_tag">您还没有创建导航标签，抓紧时间创建吧！</div>

    <!--标签区域-->
    <div class="tags_line">
      <div
        v-for="tag in tagLine"
        :key="tag.id"
        class="so_tag"
        :class="activeTagId === tag.id ? 'is_active' : ''"
        @click="selectNavTag(tag.id)"
      >
        <span>{{ tag.tag_name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { tagCreate, getUserTagLine, tagEdit, tagDelete } from '../../request'
import { mapGetters } from 'vuex'
export default {
  props: {},
  data() {
    return {
      // 标签名称
      tagName: '',
      // 标签列表
      tagLine: [],
      // 展示创建标签输入框
      showAddTagInput: false,
      // 被选中的标签
      activeTagId: 0,
      // 默认展示创建按钮
      isAddButtonShow: true,
    }
  },
  computed: {
    ...mapGetters('account', {
      user: 'getUserInfo',
    }),
    currentTagObj() {
      const tagData = this.tagLine.filter(item => {
        return item.id === this.activeTagId
      })
      return tagData[0] || {}
    },
  },
  watch: {
    activeTagId: {
      handler() {
        // 抛出选中的标签
        this.$emit('tagChange', this.currentTagObj)
      },
    },
  },
  created() {
    this.getTags()
  },
  methods: {
    // 选中导航变更
    selectNavTag(tagId) {
      this.activeTagId = tagId
    },
    // 展示创建标签的弹窗
    tagInputAction(isAdd) {
      this.isAddButtonShow = isAdd
      this.tagName = isAdd ? '' : this.currentTagObj.tag_name
      this.showAddTagInput = true
    },
    // 还原input的初始状态
    revertInput() {
      this.showAddTagInput = false
      this.tagName = ''
    },
    // 添加标签
    addTag() {
      tagCreate({ tagName: this.tagName, userId: this.user.uuid })
        .then(data => {
          this.tagLine.push({ id: data.data.id, tag_name: this.tagName })
          this.$message.success(data.message)
          this.revertInput()
          this.activeTagId = data.data.id
        })
        .catch(err => {
          this.$message.warning(err.message)
        })
    },
    // 编辑标签
    editTag() {
      tagEdit({ tagName: this.tagName, userId: this.user.uuid, tagId: this.currentTagObj.id })
        .then(data => {
          this.tagLine = this.tagLine.map(item => {
            if (item.id === this.currentTagObj.id) {
              item.tag_name = this.tagName
              return item
            }
            return item
          })
          this.$message.success(data.message)
          this.revertInput()
        })
        .catch(err => {
          this.$message.warning(err.message)
        })
    },
    // 删除标签
    delTag() {
      this.$confirm('确认删除？ 删除后内部链接将会迁移到未定义标签中。', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          tagDelete({ userId: this.user.uuid, tagId: this.currentTagObj.id })
            .then(() => {
              this.getTags() // 重新请求数据
            })
            .catch(err => {
              this.$message.warning(err.message)
            })
        })
        .catch(() => {})
    },
    // 获取用户下的当前导航标签列表
    getTags() {
      getUserTagLine({ userId: this.user.uuid })
        .then(({ data }) => {
          this.tagLine = data
          this.activeTagId = (data[0] && data[0].id) || 0
        })
        .catch(err => {
          this.$message.warning(err.message)
        })
    },
  },
}
</script>

<style lang="less" scoped>
.tag_line {
  .operation {
    box-sizing: border-box;
    border-bottom: 1px solid #ddd;
    margin-bottom: 12px;
    height: 32px;
    line-height: 32px;
    .el_so_title {
      font-size: 16px;
      font-weight: bold;
      margin-right: 8px;
    }
    .el_so_icon {
      font-size: 14px;
      font-weight: bold;
      margin-right: 8px;
      cursor: pointer;
      color: #909399;
      &:hover {
        color: #409eff;
      }
    }
    .tag_add_name {
      position: relative;
      top: -2px;
      width: 225px;
      /deep/ .el-input__inner {
        padding-right: 62px;
        border: none;
        height: 28px;
        line-height: 28px;
      }
      /deep/ .el-input__suffix-inner {
        height: 28px;
        box-sizing: border-box;
        line-height: 28px;
        font-size: 14px;
        .i {
          margin-right: 12px;
        }
      }
    }
  }
  .hass_no_navigation_tag {
    font-size: 13px;
    color: #a1a7b7;
  }
}
.so_tag {
  font-weight: bold;
  position: relative;
  box-sizing: border-box;
  padding: 4px 6px;
  border-radius: 4px;
  cursor: pointer;
  background: #fff;
  text-align: center;
  font-size: 12px;
  color: #6b7184;
  transition: all 300ms ease;
  display: inline-block;
  margin-right: 12px;
  margin-bottom: 8px;
  box-shadow: 0px 0px 4px 1px #ddd;
  &:hover {
    background: #6b7184;
    color: #fff;
    font-weight: bold;
    font-size: 12px;
  }
}
.is_active {
  background: #6b7184;
  color: #fff;
  font-weight: bold;
  font-size: 12px;
}
</style>
