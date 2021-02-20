/*
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-07-10 13:55:08
 * @LastEditTime: 2020-11-10 19:32:30
 */
import HttpService from '@stl/request'
import { Message } from 'element-ui'
import { power } from '@/router'
import { sign } from '@/utils'
import { UPLOAD_VIDEO_SUBCODE } from '@/common/services/RemoteService'
const BASE_API = new Map<string, string>([
    ['dev', 'http://localhost:9003'],
    // ['test', 'http://localhost:9003'],
    ['tests', 'http://120.77.212.58:31521'],
    ['pre', 'http://120.77.212.58:31522'],
    ['prod', 'http://spadminnssrights.wbp5.com'],
])
const BASE_URL = (<any>window).__SINGLE_SPA_MFE__ ? BASE_API.get(process.env.VUE_APP_SSO_MODE) : ''
const headerAdminInfo = {
    operateUid: (power?.userInfo as any)?.id || 0,
    operateName: encodeURIComponent((power?.userInfo as any)?.realName || ''),
}
export function setHeaderAdminInfo(uid, name) {
    Reflect.set(headerAdminInfo, 'operateUid', uid)
    Reflect.set(headerAdminInfo, 'operateName', name)
}
const http = new HttpService(BASE_URL, {
    msgUI: Message,
    logout: () => power.logout(),
    getToken: () => power.token,
    signHeaders: sign,
    headers: headerAdminInfo,
    codes: {
        sures: [
            // 维权徐毅公共
            'C600000',
            // 星博评论公共
            'C800200',
            'C800100',
            // 喻星视频分片文件上传公共
            UPLOAD_VIDEO_SUBCODE,
            '30E00000',
            // 瑶哥交易商
            'C101D00',
            // 未设置
            '0000000',
        ],
        err: ['C600001'],
    },
})

export default http
