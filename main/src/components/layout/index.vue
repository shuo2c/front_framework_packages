<template>
  <div class="pedestal">
    <!--这是布局的模板, 用于基座之间的布局-->
    <div class="cus-layout">
      <header class="header">
        <span class="title">Tadpoles</span>
        <span class="userinfo">
          <el-dropdown class="operation" trigger="click" @command="menuClick">
            <span class="el-dropdown-link">{{ user.nickname }}<i class="el-icon-arrow-down el-icon--right"></i> </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="login_out" icon="el-icon-edit-outline">退出登录</el-dropdown-item>
              <el-dropdown-item command="user_info" icon="el-icon-user-solid">个人信息</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </header>
      <section class="container">
        <div class="left-menu">
          <el-menu class="el-menu-vertical" default-active="/qiankun" router>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-monitor"></i>
                <span>主体应用</span>
              </template>
              <el-menu-item index="/home">书签</el-menu-item>
              <el-menu-item index="/qiankun">乾坤</el-menu-item>
              <el-menu-item index="/prompt">兼容界面</el-menu-item>
            </el-submenu>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-reading"></i>
                <span>Vue</span>
              </template>
              <el-menu-item index="/sub-vue">Vuer2.6</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-reading"></i>
                <span>React</span>
              </template>
              <el-menu-item index="2-1">React</el-menu-item>
            </el-submenu>
            <el-menu-item index="3">
              <i class="el-icon-menu"></i>
              <span slot="title">Sub-Html</span>
            </el-menu-item>
          </el-menu>
        </div>
        <div class="content"><router-view /></div>
      </section>
    </div>
  </div>
</template>

<script>
import { removeLocalStorageValue } from '@/common/utils/localStorage'
import { mapGetters } from 'vuex'
export default {
  name: 'layout',
  computed: {
    ...mapGetters('account', {
      user: 'getUserInfo',
    }),
  },
  methods: {
    menuClick(command) {
      switch (command) {
        case 'login_out':
          // 删除掉token并跳转到登录界面
          removeLocalStorageValue('AuthToken')
          this.$router.push({ name: 'login' })
          break
        case 'user_info':
          break
        default:
          break
      }
    },
  },
}
</script>
<!--全局样式部分-->
<style lang="less">
/** element_ui css 部分 **/
.el-popper[x-placement^='bottom'] {
  margin-top: 6px !important;
}
</style>

<style lang="less" scoped>
.cus-layout {
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  .header {
    z-index: 99;
    position: fixed;
    box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    min-width: 1280px;
    height: 48px;
    padding: 0px 64px 0px 20px;
    line-height: 48px;
    background-color: #fdfdfd;
    box-shadow: 0 1px 4px 0 rgba(158, 154, 154, 0.3);
    .userinfo {
      float: right;
      .operation {
        cursor: pointer;
      }
    }
  }
  .container {
    padding-top: 50px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    width: 100%;
    height: calc(100% - 50px);
    .left-menu {
      box-sizing: border-box;
      position: fixed;
      width: 150px;
      border-right: 1px solid #ecf5ff;

      /deep/ .el-submenu__title {
        line-height: 50px;
        height: 50px;
      }
      /deep/ .el-submenu .el-menu-item {
        height: 40px;
        line-height: 40px;
        padding: 0 45px;
        min-width: 150px;
      }
    }
    .content {
      height: 100%;
      width: calc(100% - 150px);
      padding-left: 150px;
    }

    .el-menu {
      border-right: none;
    }
  }
}
</style>
