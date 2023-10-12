<template>
  <div class="knowledge_base">
    <div class="operation">
      <el-button size="small" type="default" @click="showEventDialog">添加</el-button>
      <EventDialog
        :eventDatas="eventDialog.data"
        :is-show.sync="eventDialog.isShow"
        @saveCallback="selectEventList"
      ></EventDialog>
    </div>
    <div class="content">
      <el-pagination
        class="pagination_css"
        :current-page.sync="searchParams.pageNum"
        layout="total, prev, pager, next"
        :page-size="searchParams.pageSize"
        :total="searchParams.total"
        @current-change="handleCurrentChange"
      >
      </el-pagination>

      <div class="event_show_list">
        <div v-for="(item, index) in eventList" :key="item.id" class="event_item">
          <div class="event_title">
            {{ `${searchParams.pageNum * searchParams.pageSize - (index + 1)}${item.title}` }}
          </div>
          <div class="event_content">
            <VueMarkdown
              v-highlight
              :breaks="true"
              class="preview_markdown markdown-body"
              :highlight="false"
              :linkify="true"
              :source="item.content"
              :typographer="true"
            >
            </VueMarkdown>
          </div>
          <div class="event_footer">
            <div class="operation_icon">
              <i class="el-icon-edit" @click="editEvent(item.id)"></i>
              <i class="el-icon-delete" @click="removeEvent(item.id)"></i>
            </div>
            <div class="event_time">更新时间: {{ item.update_time }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { getRecordList, removeRecord, getRecordInfo } from './request'
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
        data: {},
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
      this.eventDialog.data = {}
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
          this.searchParams.total = data.total
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 删除事件
    removeEvent(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          removeRecord({ id }).then(() => {
            this.$message({ type: 'success', message: '删除成功!' })
            this.selectEventList()
          })
        })
        .catch(() => {})
    },
    // 编辑事件
    editEvent(id) {
      getRecordInfo({ id }).then(({ data }) => {
        this.eventDialog.data = data[0]
        this.eventDialog.isShow = true
      })
    },
    handleCurrentChange(page) {
      this.searchParams.pageNum = page
      this.selectEventList()
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
    .pagination_css {
      padding-left: 12px;
      margin-top: 12px;
    }
    .event_show_list {
      width: 100%;
      .event_item {
        padding: 0px 12px;
        margin: 32px 0px;
        .event_title {
          font-size: 22px;
          font-weight: bold;
        }
        .event_content {
          padding: 6px;
        }
        .event_footer {
          margin-top: 12px;
          padding: 6px 0px;
          display: flex;
          justify-content: right;
          font-size: 14px;
          .operation_icon {
            font-weight: bold;
            i {
              margin-right: 12px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>
