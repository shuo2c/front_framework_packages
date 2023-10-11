<template>
  <div class="pedestal">
    <!--这是布局的模板, 用于基座之间的布局-->
    <div class="cus-layout">
      <div class="left-menu">
        <TelescopeMenu :menu="menuConfig"></TelescopeMenu>
      </div>

      <section class="container">
        <header class="header">
          <span class="title">Tadpoles</span>
          <span class="userinfo">
            <el-dropdown class="operation" trigger="click" @command="menuClick">
              <span class="el-dropdown-link"
                >{{ user.nickname }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="login_out" icon="el-icon-edit-outline">退出登录</el-dropdown-item>
                <el-dropdown-item command="user_info" icon="el-icon-user-solid">个人信息</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </header>

        <div class="content">
          <router-view />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { removeLocalStorageValue } from '@/common/utils/localStorage'
import TelescopeMenu from '@/components/menu/telescop-menu'
import { mapGetters } from 'vuex'
import { menuConfig } from './menu-config'
export default {
  name: 'layout',
  components: {
    TelescopeMenu,
  },
  data() {
    return {
      menuConfig: menuConfig(),
    }
  },
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
  display: flex;
  flex-direction: row;

  .container {
    width: 100%;
    height: 100%;
    min-width: 1280px;
    overflow-y: hidden;

    .header {
      box-sizing: border-box;
      width: 100%;
      min-width: 1280px;
      height: 48px;
      padding: 0px 64px 0px 20px;
      line-height: 48px;
      background: rgba(255, 255, 255, 0.6);
      box-shadow: 0 1px 4px 0 rgba(158, 154, 154, 0.2);
      .title {
        font-size: 22px;
        font-weight: 600;
        letter-spacing: 1px;
        color: rgba(30, 36, 51, 0.8);
      }
      .userinfo {
        float: right;
        .operation {
          cursor: pointer;
        }
      }
    }

    .content {
      height: calc(100% - 50px);
      width: 100%;
    }
  }
}
</style>
