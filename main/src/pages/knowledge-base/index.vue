<template>
  <div class="knowledge_base">
    <div class="operation">
      <el-button size="small" type="default" @click="showEventDialog">添加</el-button>
      <EventDialog :is-show.sync="eventDialog.isShow" title="添加内容" @saveCallback="selectEventList"></EventDialog>
    </div>
    <div class="content">
      <div class="event_show_list">
        <div v-for="(item, index) in eventList" :key="item.id" class="event_item">
          <div class="event_title">{{ `${index + 1}. ${item.title}` }}</div>
          <div class="event_content">
            <VueMarkdown
              v-highlight
              :breaks="true"
              class="preview_markdown markdown-body"
              :linkify="true"
              :source="item.content"
              :typographer="true"
            >
            </VueMarkdown>
          </div>
          <div class="event_footer">
            <div class="event_time">更新时间: {{ item.update_time }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { getRecordList } from './request'
import EventDialog from './components/EventDialog.vue'
import VueMarkdown from 'vue-markdown'
export default {
  components: {
    EventDialog,
    VueMarkdown,
  },
  data() {
    return {
      eventDialog: {
        isShow: false,
      },
      searchParams: {
        total: 0,
        pageNum: 1,
        pageSize: 10,
      },
      eventList: [],
    }
  },
  mounted() {
    this.selectEventList()
  },
  methods: {
    showEventDialog() {
      this.eventDialog.isShow = true
    },
    // 查询数据
    selectEventList() {
      getRecordList(this.searchParams)
        .then(data => {
          this.eventList = data.data.map(item => {
            item.update_time = dayjs(item.update_time).format('YYYY-MM-DD HH:mm:ss')
            return item
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
}
</script>
<style scoped>
@import './github-markdown-css/github-markdown.css';
</style>
<style lang="less" scoped>
.knowledge_base {
  box-sizing: border-box;
  height: 100%;
  .operation {
    height: 56px;
    padding: 12px;
    box-sizing: border-box;
    border-bottom: 1px solid #ebeef5;
  }
  .content {
    overflow-y: scroll;
    box-sizing: border-box;
    margin: 0 auto;
    width: 67%;
    height: calc(100% - 56px);
    padding: 0px 12px 22px;
    .event_show_list {
      width: 100%;
      .event_item {
        padding: 0px 12px;
        margin: 22px 0px;
        .event_title {
          font-size: 22px;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
