<template>
  <div v-if="showBlock" class="create_tag_block">
    <el-dialog center :close-on-click-modal="false" :title="title" :visible.sync="showBlock" width="480px">
      <el-form ref="ruleForm" label-width="80px" :model="form" :rules="rules">
        <el-form-item label="所属导航" prop="tagName">
          <el-input v-model="form.tagName" disabled></el-input>
        </el-form-item>
        <el-form-item label="块名称" prop="title">
          <el-input v-model="form.title" autocomplete="off" placeholder="请输入导航块名称"></el-input>
        </el-form-item>
        <el-form-item label="块描述">
          <el-input
            v-model="form.description"
            maxlength="60"
            placeholder="请输入块描述"
            :rows="2"
            :show-word-limit="true"
            type="textarea"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirmCreate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { blockCreate, blockEdit } from '../../request'
import { mapGetters } from 'vuex'
export default {
  props: {
    visiable: {
      default: false,
      type: Boolean,
    },
    // 当前选中的tag
    tagInfo: {
      default() {
        return {}
      },
      type: Object,
    },
    isAdd: {
      default: true,
      type: Boolean,
    },
    block: {
      default() {
        return {}
      },
      type: Object,
    },
  },
  data() {
    return {
      showBlock: this.visiable,
      form: { tagName: '', tagId: undefined, title: '', description: '' },
      rules: {
        title: [{ required: true, message: '块名称不能为空', trigger: 'blur' }],
      },
    }
  },
  computed: {
    ...mapGetters('account', {
      user: 'getUserInfo',
    }),
    title() {
      return this.isAdd ? '创建导航块' : '编辑导航块'
    },
  },
  watch: {
    visiable: {
      handler(n) {
        this.showBlock = n
      },
    },
    showBlock: {
      handler(n) {
        this.$emit('update:visiable', n)
        this.form = Object.assign({}, this.form, { title: '', description: '' })
      },
    },
  },
  mounted() {
    if (!this.isAdd) {
      this.form.title = this.block.title
      this.form.description = this.block.description
      this.form.id = this.block.id
    }
    this.form.tagId = this.tagInfo.id
    this.form.tagName = this.tagInfo.tag_name
  },
  methods: {
    confirmCreate() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          const params = Object.assign({}, { userId: this.user.uuid }, this.form)
          const functionName = this.isAdd ? blockCreate : blockEdit
          functionName(params)
            .then(data => {
              this.$emit('confirmCallBack', data)
              this.showBlock = false
            })
            .catch(err => {
              this.$message.error(err.message)
            })
        }
      })
    },
    cancel() {
      this.showBlock = false
    },
  },
}
</script>

<style lang="less" scoped>
.create_tag_block {
  /deep/ .el-input.is-disabled .el-input__inner {
    color: #303133;
  }
}
</style>
