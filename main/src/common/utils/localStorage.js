// 封装的带有超时时间验证的localStorage

/**
 * 封装存储
 * @param {*} key
 * @param {*} value
 */
function setLocalStorageValue(key, value) {
  // 获取当前时间
  const curTime = new Date().getTime()
  // 转化为json存储数据
  localStorage.setItem(key, JSON.stringify({ value, time: curTime }))
}

/**
 * 获取值
 * @param {*} key
 * @param {*} exp
 * @param {*} callBack
 * @returns
 */
function getLocalStorageValue(key, exp, callBack) {
  if (!localStorage.getItem(key)) {
    return undefined
  }
  const dataObj = JSON.parse(localStorage.getItem(key))
  if (new Date().getTime() - dataObj.time > exp) {
    if (typeof callBack === 'function') {
      callBack()
    }
  }
  return dataObj.value
}

/**
 * 删除value
 */
function removeLocalStorageValue(key) {
  localStorage.removeItem(key)
}

// 抛出
export { setLocalStorageValue, getLocalStorageValue, removeLocalStorageValue }
