
import HttpService from '@stl/request'
import { Message } from 'element-ui'
import { power } from '@/router'
import { sign } from '@/utils'

export default new HttpService('', {
  msgUI: Message,
  logout: power.logout,
  getToken: () => power.token,
  signHeaders: sign
})
