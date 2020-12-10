import { ExposeNQsNComplaintCommon } from './ComplaintData'
import { BaseDataDisplayStatus } from './RemoteData'
import { UserInfoModel } from './UserData'

export interface ExposureModel extends BaseAdminInfo, ExposeNQsNComplaintCommon {
    // 曝光数据模型

    userIdCard: string
    // 用户身份证号

    cashDeposit: string
    // 资金存放地

    recoverFunds: number
    // 追回资金

    recoverDate: string
    // 追回日期

    recoverDesc: string
    // 追回资金说明

    autoId: number
    // 主键

    status: BaseDataDisplayStatus
    // 数据显示状态（0、全部，1、显示，2、不显示，3、回收站，4、仅用户可见，5、仅同城可见）

    createTime: string
    // 创建日期

    lastUpdateTime: string
    // 最后修改日期
}
