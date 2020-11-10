import { ExposeNQsNComplaintCommon } from './ComplaintData'
import { BaseDataDisplayStatus } from './RemoteData'

export interface QsModel extends BaseAdminInfo, ExposeNQsNComplaintCommon {
    // 问答数据模型

    isEntShow: boolean
    // 交易商回复（表示在交易商后台显示）

    isReplyTemp: boolean
    // 是否回复模板

    userAnswerCount: number
    // 普通用户回答量

    adminAnswerCount: number
    // 运营回答量

    entAnswerCount: number
    // 平台回答量

    autoId: number
    // 主键

    status: BaseDataDisplayStatus
    // 数据显示状态（0、全部，1、显示，2、不显示，3、回收站，4、仅用户可见，5、仅同城可见）
    createTime: string
    // 创建日期

    lastUpdateTime: string
    // 最后修改日期
}
