import { BaseDataDisplayStatus } from './RemoteData'
import { UserInfoModel } from './UserData'
export interface ExposeNQsNComplaintCommon {
    // 问答投诉曝光共用字段模型
    statusText: string
    // 状态

    productType: number
    // 产品类型，具体以接口【/api/Common/GetProductType】为准

    productTypeText: string
    // 产品类型

    language: BaseLang
    // 语言类别（0、全部，1、简体，2、繁体）

    twDisplay: BaseTwDisplayStatus
    // 是否繁体显示（-1、不选择，0、不显示，1、显示）

    ip: string
    // 用户IP

    countryCode: number
    // 国家地区代码

    countryName: string
    // 国家地区

    provinceCode: number
    // 省份代码

    provinceName: string
    // 省份

    cityCode: number
    // 城市代码

    cityName: string
    // 城市

    location: string
    // 地址

    clickCount: number
    // 点击量

    weekClickCount: number
    // 周点击量

    monthClickCount: number
    // 月点击量

    virtualClickCount: number
    // 虚拟点击量

    answerCount: number
    // 回答量

    commentCount: number
    // 评论量

    forwardCount: number
    // 转发量

    virtualForwardCount: number
    // 虚拟转发量

    attentionCount: number
    // 关注量

    userId: number
    // 用户Id

    userName: string
    // 用户账号

    userNickName: string
    // 用户昵称

    userFxCode: number
    // 汇聊账号

    entId: number
    // 交易商Id

    entName: string
    // 交易商名称

    entLogo: string
    // 交易商logo

    title: string
    // 维权标题

    keywords: string
    // 维权关键字

    content: string
    // 维权内容

    isHots: boolean
    // 热点

    processState: number
    // 处理状态

    processStateText: string
    // 处理状态

    exposureType: SelectModel[]
    userCallName: string
    // 用户称呼

    userMobile: string
    // 用户Mobile

    userEmail: string
    // 用户Email（扩展保留）

    userQQ: string
    // 用户QQ（扩展保留）

    fileSet: FileSetModel
    userInfo: UserInfoModel
    remark: string
    // 备注

    summary: string
    // 摘要
    mongoObjId: string
    recordTicks: number
}
export interface ComplaintModel extends BaseAdminInfo, ExposeNQsNComplaintCommon {
    // 投诉mongo模型

    amount: number
    // 金额（整型，保留到元）

    amountUnit: string
    // 金额单位（美元、元）

    complaintsType: SelectModel[]
    rightsOfAppeal: SelectModel[]
    tradingAccount: string
    // 交易账号

    userIdCard: string
    // 用户身份证号

    cashDeposit: string
    // 资金存放地

    progress: number
    // 处理进度，整数百分比

    progressState: number
    // 处理进度状态

    progressStateTime: string
    // 处理进度状态（最新状态）最新更新时间

    progressStateText: string
    // 处理进度状态（最新状态）

    userViewState: number
    // 用户呈现的投诉状态

    userViewStateText: string
    // 用户呈现的投诉状态

    isEntShow: boolean
    // 交易商回复（表示在交易商后台显示）

    recoverFunds: number
    // 追回资金

    recoverDate: string
    // 追回日期

    recoverDesc: string
    // 追回资金说明

    replenishTip: boolean
    // 补充提醒（用户补充材料）

    autoId: number
    // 主键

    status: BaseDataDisplayStatus
    // 数据显示状态（0、全部，1、显示，2、不显示，3、回收站，4、仅用户可见，5、仅同城可见）

    createTime: string
    // 创建日期

    lastUpdateTime: string
    // 最后修改日期
}

export interface ComplaintProgressModel {
    // 投诉进度模型

    status: BaseDataDisplayStatus
    // 数据显示状态（0、全部，1、显示，2、不显示，3、回收站，4、仅用户可见，5、仅同城可见）

    statusText: string
    // 状态

    complaintsId: number
    // 投诉主键Id

    content: string
    // 回答内容

    fileSet: FileSetModel
    progressState: number
    // 处理进度状态
    progressStateText: string
    // 处理进度

    fromUser: UserInfoModel
    userGradeService: number
    // 用户评级（服务质量）

    userGradeEfficiency: number
    // 用户评级（处理效率）

    userGradeDispute: number
    // 用户评级（纠纷满意度）

    userGradeDesc: string
    // 用户评级（发表打分说明）

    userGradeDate: string
    // 用户评级（打分时间）

    createTime: string
    // 创建日期

    id: number
    // 主键
}
