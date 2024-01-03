// stores/counter.js
import { defineStore } from 'pinia'
import { httpRequest } from '@/utils/httpRequest'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
        userName: ''
     }
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })
  actions: {
    async initToken(token) {
        const data = await httpRequest('/checkToken', 'get', false)
        if(data && data.state && '0' === data.state) {
            localStorage.setItem('clock_token', token)
            this.userName = data.userName
        }
    },
  },
})