
import { defineStore } from 'pinia'
import { httpRequest } from '@/utils/httpRequest'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
        userName: '',
        token: ''
     }
  },
  actions: {
    async initToken(token) {
        const data = await httpRequest('/checkToken', 'get', false)
        if(data && data.state && '0' === data.state) {
            localStorage.setItem('clock_token', token)
            this.userName = data.userInfo.userName
            this.token = token
        }
    },
  },
})