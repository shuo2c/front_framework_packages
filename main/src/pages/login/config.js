// form表格的验证
export const formCheck = that => {
  return {
    phone: (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else {
        const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
        if (!reg.test(value)) {
          callback(new Error('请输入正确的手机号'))
        }
        callback()
      }
    },
    email: (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱地址'))
      } else {
        const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        if (!reg.test(value)) {
          callback(new Error('请输入正确的邮箱'))
        }
        callback()
      }
    },
    verCode: (rule, value, callback) => {
      if (that.isLogin) {
        callback()
        return
      }
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else {
        const reg = /^[0-9]\d{5}$/
        if (!reg.test(value)) {
          callback(new Error('验证码格式无效'))
        }
        callback()
      }
    },
    password: (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/
        if (!reg.test(value)) {
          callback(new Error('必须包含大小写字母和数字的组合, 长度在8-12之间'))
        }
        callback()
      }
    },
    confirmPasswd: (rule, value, callback) => {
      if (that.isLogin) {
        callback()
        return
      }
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== that.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    },
  }
}
