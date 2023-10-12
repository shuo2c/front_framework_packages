<template>
  <div class="event_dialog">
    <el-dialog
      :close-on-click-modal="false"
      :fullscreen="fullscreen"
      :title="title"
      :visible.sync="dialogVisible"
      width="820px"
      @closed="dialogColsed"
    >
      <div class="dialog_content">
        <el-input v-model="eventTitle" placeholder="请输入内容标题"></el-input>
        <div class="markdown_simple">
          <el-input
            v-model="textVaue"
            :autosize="{ minRows: 18 }"
            class="textInput"
            placeholder="请输入内容"
            type="textarea"
          >
          </el-input>
          <VueMarkdown v-highlight class="preview_markdown markdown-body" :highlight="false" :source="textVaue">
          </VueMarkdown>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeDilogSize">{{ fullscreen ? '还原' : '全屏' }}</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addEventContent, editEventContent } from '../request.js'
import VueMarkdown from 'vue-markdown'
export default {
  components: {
    VueMarkdown,
  },
  props: {
    isShow: {
      default: false,
      type: Boolean,
    },
    eventDatas: {
      default() {
        return {}
      },
      type: Object,
    },
  },
  data() {
    return {
      dialogVisible: false,
      textVaue: '',
      eventTitle: '',
      title: '新增数据',
      fullscreen: false,
    }
  },
  watch: {
    isShow: {
      handler(newValue) {
        this.dialogVisible = newValue
      },
    },
    eventDatas: {
      handler(newValue) {
        if (Object.keys(newValue).length > 0) {
          this.title = '编辑数据'
          this.eventTitle = newValue.title
          this.textVaue = newValue.content
        } else {
          this.title = '新增数据'
        }
      },
      deep: true,
    },
  },
  mounted() {},
  methods: {
    // 关闭动画结束时的回调
    dialogColsed() {
      // 清空原有数据
      this.textVaue = ''
      this.eventTitle = ''
      this.$emit('update:isShow', false)
    },
    // 存储数据
    confirmSave() {
      const func = Object.keys(this.eventDatas).length <= 0 ? addEventContent : editEventContent
      func({ title: this.eventTitle, content: this.textVaue, id: this.eventDatas.id || '' })
        .then(() => {
          this.$emit('saveCallback')
          this.$emit('update:isShow', false)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 更改尺寸
    changeDilogSize() {
      this.fullscreen = !this.fullscreen
    },
  },
}
</script>

<style scoped>
@import '../github-markdown-css/github-markdown.css';
</style>
<style lang="less">
.event_dialog {
  .dialog_content {
    .markdown_simple {
      margin-top: 8px;
      display: flex;
      .textInput {
        width: 50%;
        flex-shrink: 0;
      }
      .preview_markdown {
        width: 50%;
        flex-shrink: 0;
        border: 1px solid #dcdfe6;
        padding: 0px 12px;
        box-sizing: border-box;
        border-radius: 4px;
        border-left: 0px;
      }
    }
  }
}
</style>
