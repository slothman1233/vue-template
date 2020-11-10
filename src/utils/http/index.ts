/*
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-07-10 13:55:08
 * @LastEditTime: 2020-10-26 17:18:44
 */
import HttpService from '@stl/request'
import { Message } from 'element-ui'
import { power } from '@/router'
import { sign } from '@/utils'

export default new HttpService('', {
    msgUI: Message,
    logout: () => power.logout(),
    getToken: () => power.token,
    signHeaders: sign,
    headers: {
        operateUid: (power?.userInfo as any)?.id || 0,
        operateName: encodeURIComponent((power?.userInfo as any)?.realName || ''),
    },
})
