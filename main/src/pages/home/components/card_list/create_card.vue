<template>
  <div v-if="showCreateLinkDialog" class="create_card_dialog">
    <el-dialog center :close-on-click-modal="false" title="创建书签" :visible.sync="showCreateLinkDialog" width="520px">
      <el-form ref="ruleForm" label-width="80px" :model="form" :rules="rules">
        <el-form-item label="名称" prop="title">
          <el-input v-model="form.title" autocomplete="off" maxlength="30" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="链接地址" prop="linkUrl">
          <el-input v-model="form.linkUrl" autocomplete="off" placeholder="请输入地址"> </el-input>
        </el-form-item>
        <el-form-item label="logo" prop="imgUrl">
          <el-input v-model="form.imgUrl" autocomplete="off" placeholder="logo地址"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="description">
          <el-input
            v-model="form.description"
            autocomplete="off"
            maxlength="60"
            placeholder="请输入备注描述"
            :rows="2"
            :show-word-limit="true"
            type="textarea"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showCreateLinkDialog = false">取 消</el-button>
        <el-button type="primary" @click="createCard">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { cardLinkCreate, cardLinkEdit } from '../../request'
import { mapGetters } from 'vuex'
export default {
  props: {
    visiable: {
      default: false,
      type: Boolean,
    },
    block: {
      default() {
        return {}
      },
      type: Object,
    },
    card: {
      default() {
        return {}
      },
      type: Object,
    },
  },
  data() {
    return {
      // 显示隐藏弹窗
      showCreateLinkDialog: this.visiable,
      // 字段form
      form: {
        title: '',
        linkUrl: '',
        imgUrl: '',
        description: '',
      },
      rules: {
        title: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
        linkUrl: [
          { required: true, message: '链接地址不能为空', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              const checkState = !!value.match(
                //eslint-disable-next-line
                /^(https:\/\/|http:\/\/|ftp:\/\/|rtsp:\/\/|mms:\/\/)?[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,
              )
              if (checkState) {
                callback()
              } else {
                callback(new Error('URL地址输入异常'))
              }
            },
          },
        ],
        description: [{ required: true, message: '描述不能为空', trigger: 'blur' }],
      },
    }
  },
  computed: {
    ...mapGetters('account', {
      user: 'getUserInfo',
    }),
  },
  watch: {
    visiable: {
      handler(n) {
        this.showCreateLinkDialog = n
      },
      deep: true,
    },
    showCreateLinkDialog: {
      handler(n) {
        this.$emit('update:visiable', n)
      },
      deep: true,
    },
  },
  mounted() {
    if (Object.keys(this.card).length > 0) {
      this.form.title = this.card.title
      this.form.linkUrl = this.card.link_url
      this.form.imgUrl = this.card.img_url
      this.form.description = this.card.description
      this.form.id = this.card.id
    }
  },
  methods: {
    // 创建书签card
    createCard() {
      const params = { ...this.form, ...{ userId: this.user.uuid, blockId: this.block.id, tagId: this.block.tag_id } }
      // 验证
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          const funcName = Object.keys(this.card).length > 0 ? cardLinkEdit : cardLinkCreate
          funcName(params)
            .then(() => {
              this.$refs['ruleForm'].resetFields()
              this.$emit('observeLink')
              this.showCreateLinkDialog = false
            })
            .catch(err => {
              this.$message.error(err.message)
            })
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.create_card_dialog {
}
</style>
