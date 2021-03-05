import {loginByCode} from '@/api/user'
import {getUserInfo} from '../../api'
import {
  saveToken,
  saveLoginStatus,
  saveUserInfo,
  removeToken,
  removeUserInfo,
  removeLoginStatus,
  loadLoginStatus,
  loadToken,
  loadUserInfo
} from '@/utils/cache'
const state = {
  loginStatus: loadLoginStatus(), // 登录状态
  token: loadToken(), // token
  userInfo: loadUserInfo() // 用户登录信息
}

const mutations = {
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_LOGIN_STATUS: (state, loginStatus) => {
    state.loginStatus = loginStatus
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

const actions = {
  // 登录相关，通过code获取token和用户信息，用户根据自己的需求对接后台
  loginWechatAuth({commit}, code) {
    const appid=process.env.VUE_APP_WECHAT_APPID
    const data = {
      code: code
    }
    return new Promise((resolve, reject) => {
      loginByCode(data,appid)
        .then(res => {
          const {token,...userInfo}=res;
          // 存用户信息，token
          commit('SET_USERINFO', saveUserInfo(userInfo))
          commit('SET_TOKEN', saveToken(token))
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo().then(res => {
        const {token,...userInfo}=res;
        commit('SET_USERINFO', saveUserInfo(userInfo))
        commit('SET_TOKEN', saveToken(token))
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 设置状态
  setLoginStatus({commit}, query) {
    if (query === 0 || query === 1) {
      // 上线打开注释，本地调试注释掉，保持信息最新
      removeToken()
      removeUserInfo()
    }
    // 设置不同的登录状态
    commit('SET_LOGIN_STATUS', saveLoginStatus(query))
  },
  // 登出
  fedLogOut() {
    // 删除token，用户信息，登陆状态
    removeToken()
    removeUserInfo()
    removeLoginStatus()
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
