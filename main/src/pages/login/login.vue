<template>
  <div class="login h-full w-full">
    <wallpaper :sourceList="sourceList"></wallpaper>
    <!--登录内容区域-->
    <div class="container h-full w-full">
      <div class="content">
        <div class="login-registry-buttons">
          <lightButton style="margin-right: 6px" @click.native="switchLoginMethod(true)">密码登录</lightButton>
          <lightButton @click.native="switchLoginMethod(false)">注册账户</lightButton>
        </div>
        <div class="login-registry-form">
          <el-form ref="loreg" label-width="0px" :model="form" :rules="rules">
            <!--没有本质作用近作用域隐藏自动带入-->
            <input autocomplete="new-password" name="password" style="display: none" type="password" />

            <el-form-item key="phone" label="" prop="phone">
              <el-input v-model="form.phone" autocomplete="off" placeholder="手机号" />
            </el-form-item>
            <el-form-item v-if="!isLogin" key="verCode" label="" prop="verCode">
              <el-input v-model="form.verCode" autocomplete="off" placeholder="请输入6位数验证码">
                <template slot="append"
                  ><span @click="getCode">{{
                    vertCode.setIntervalCode ? `${vertCode.wait} 可重新发送` : '获取验证码'
                  }}</span></template
                >
              </el-input>
            </el-form-item>
            <el-form-item key="password" label="" prop="password">
              <el-input v-model="form.password" placeholder="密码" :type="ciphertext ? 'password' : 'text'">
                <i
                  slot="suffix"
                  class="el-input__icon el-icon-view"
                  @mousedown="ciphertext = false"
                  @mouseup="ciphertext = true"
                ></i>
              </el-input>
            </el-form-item>
            <el-form-item v-if="!isLogin" key="conformPasswd" label="" prop="confirmPasswd">
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
              <lightButton class="cus-login-button" @click.native="loginRegister">{{
                isLogin ? '登录' : '登录/注册'
              }}</lightButton>
            </el-form-item>
          </el-form>
        </div>
      </div>
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
import wallpaper from '@/components/wallpaper'
import lightButton from '@/components/buttons/light-button'
export default {
  name: 'login',
  components: {
    wallpaper,
    lightButton,
  },
  data() {
    const { phone, verCode, password, confirmPasswd } = formCheck(this)
    return {
      sourceList: [
        {
          url: '/video/dol.mp4',
          poster: '/video/dol_img.jpg',
        },
        {
          url: 'https://video.wetab.link/wallpaper-dynamic/v1gtq6eschkd9lx7mdtcoz6gvflb.mp4',
          poster:
            'https://video.wetab.link/wallpaper-dynamic/v1gtq6eschkd9lx7mdtcoz6gvflb.mp4?x-oss-process=video/snapshot,t_0,f_jpg,w_0,h_0,m_fast',
        },
      ],
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
  .container {
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    .content {
      width: 450px;
      height: 360px;
      .login-registry-buttons {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 12px;
      }

      .login-registry-form {
        ::v-deep .el-input__inner {
          background: rgba(0, 0, 0, 0.43) !important;
          color: #dbe0e1 !important;
          border: 1px solid rgba(138, 138, 138, 0.24);
        }

        ::v-deep .el-input-group__append {
          background: none;
          border: 1px solid rgba(138, 138, 138, 0.24);
        }

        box-sizing: border-box;
        padding: 32px;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.24);
        border-radius: 25px;
        box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.3);
        .cus-login-button {
          box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.3);
        }
      }
    }
  }
}
</style>
