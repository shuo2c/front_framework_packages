<template>
  <div class="login">
    <!--登录内容区域-->
    <div class="content">
      <div class="left">
        <div class="buttons-group">
          <el-button :class="{ no_active: !isLogin }" type="text" @click="switchLoginMethod(true)">密码登录</el-button>
          <el-button :class="{ no_active: isLogin }" type="text" @click="switchLoginMethod(false)">注册账户</el-button>
        </div>
        <el-form ref="loreg" label-width="0px" :model="form" :rules="rules">
          <el-form-item label="" prop="phone">
            <el-input v-model="form.phone" placeholder="手机号" />
          </el-form-item>
          <el-form-item v-if="!isLogin" label="" prop="verCode">
            <el-input v-model="form.verCode" placeholder="请输入6位数验证码">
              <template slot="append"
                ><span @click="getCode">{{
                  vertCode.setIntervalCode ? `${vertCode.wait} 可重新发送` : '获取验证码'
                }}</span></template
              >
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input v-model="form.password" placeholder="密码" :type="ciphertext ? 'password' : 'text'">
              <i
                slot="suffix"
                class="el-input__icon el-icon-view"
                @mousedown="ciphertext = false"
                @mouseup="ciphertext = true"
              ></i>
            </el-input>
          </el-form-item>
          <el-form-item v-if="!isLogin" label="" prop="confirmPasswd">
            <el-input v-model="form.confirmPasswd" placeholder="确认密码" :type="ciphertext ? 'password' : 'text'">
              <i
                slot="suffix"
                class="el-input__icon el-icon-view"
                @mousedown="ciphertext = false"
                @mouseup="ciphertext = true"
              ></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="margin-right: 16px" type="primary" @click="loginRegister">{{
              isLogin ? '登录' : '登录/注册'
            }}</el-button>
            <!-- <el-checkbox v-model="form.remberMe">
              记住我<span class="remember-me">不是自己的电脑不要勾选此项</span>
            </el-checkbox> -->
          </el-form-item>
        </el-form>
      </div>
      <div class="right"></div>
    </div>

    <!--隐藏备案号-->
    <!-- <div class="footer">
      <div style="text-align: center; margin-bottom: 10px">
        <a href="https://beian.miit.gov.cn">备案号: 津ICP备2021008626号-1</a>
      </div>
    </div> -->
  </div>
</template>

<script>
import { loginUser, registryUser } from './request'
import { formCheck } from './config.js'
import { mapMutations } from 'vuex'
import { setLocalStorageValue } from '@/common/utils/localStorage'
export default {
  name: 'login',
  data() {
    const { phone, verCode, password, confirmPasswd } = formCheck(this)
    return {
      // 登录注册form
      form: {
        phone: '',
        verCode: '',
        password: '',
        confirmPasswd: '',
        remberMe: false,
      },
      // 是否是登录
      isLogin: true,
      // 密码铭文
      ciphertext: true,
      // 60s发送验证码, 刷新不做验证，可继续调用接口
      vertCode: {
        wait: 60,
        setIntervalCode: '',
      },
      rules: {
        phone: [{ validator: phone, trigger: 'blur' }],
        verCode: [{ validator: verCode, trigger: 'blur' }],
        password: [{ validator: password, trigger: 'blur' }],
        confirmPasswd: [{ validator: confirmPasswd, trigger: 'blur' }],
      },
    }
  },
  methods: {
    switchLoginMethod(isLogin) {
      this.isLogin = isLogin
      this.$refs['loreg'].resetFields() // 重置掉之前的验证
    },
    // 登录或注册
    loginRegister() {
      this.$refs['loreg'].validate(valid => {
        if (valid) {
          const functionName = this.isLogin ? loginUser : registryUser
          functionName(Object.assign({}, this.form))
            .then(({ data: { user, token } }) => {
              // 添加token到localStorage中
              setLocalStorageValue('AuthToken', token)
              this.setUserInfo(user)
              this.$router.push({ path: 'home' })
            })
            .catch(err => {
              this.$message.warning(err.message)
            })
        }
      })
    },
    // 获取验证码
    getCode() {
      if (this.vertCode.setIntervalCode) {
        return false
      }
      this.vertCode.setIntervalCode = setInterval(() => {
        if (this.vertCode.wait === 0) {
          clearInterval(this.vertCode.setIntervalCode)
          this.vertCode.setIntervalCode = ''
          this.vertCode.wait = 60
        } else {
          this.vertCode.wait = this.vertCode.wait - 1
        }
      }, 1000)
    },
    ...mapMutations('account', ['setUserInfo']),
  },
}
</script>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100vh;
  background: url(./source/bgc.png) no-repeat;
  background-size: cover;
  background-color: #e0e3ed;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 24px;
    display: flex;
    width: calc(100% - 360px);
    height: calc(100% - 160px);

    .right {
      height: 100%;
      background: url(./source/bgc2.png) no-repeat;
      background-color: #c0c4cc;
      background-size: cover;
      border-right: 1px solid #ddd;
      border-top-right-radius: 24px;
      border-bottom-right-radius: 24px;
    }

    .left {
      width: calc(100% / 2);
      flex-shrink: 0;
      flex: 0.8;
      height: 100%;
      padding-left: 24px;

      .buttons-group {
        margin-bottom: 15px;

        .no_active {
          color: #c0c4cc;
        }
      }

      .remember-me {
        display: inline-block;
        margin-left: 12px;
        color: #bbb;
      }

      /deep/ .el-input__icon {
        cursor: pointer;
      }

      /deep/ .el-input-group__append {
        cursor: pointer;
      }
    }
  }
}
</style>
