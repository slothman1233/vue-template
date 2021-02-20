export enum UserInfoType {
    // 用户类型（0、普通用户，1、平台，2、运营）
    Normal,
    Platform,
    Admin,
}
export interface UserInfoModel {
    // 用户基础信息

    userType: UserInfoType
    // 用户类型（0、普通用户，1、平台，2、运营）

    userId: number
    // 用户Id

    userName: string
    // 用户名

    nickName: string
    // 用户昵称

    headImg_48: string
    // 用户头像

    fxCode: number
    // 汇聊号
}
export interface BrokerInfoModel {
    // 交易商信息

    id: number
    // 交易商Id ,

    name: string
    // 名称

    logo3: string
    // Logo

    uid: number
    // 用户Id

    brokerTypeId: number
    // 交易商类型
}
export interface UserCollectInfo {
    // 用户信息以及提问、曝光、投诉收集汇总---用户信息
    uid: number
    // 用户id

    userName: string
    // 用户名(可以用于登录),唯一索引字段

    nickName: string
    // 昵称

    phoneNumber: string
    // 手机号码

    email: string
    // 邮箱

    registerType: number
    // 注册类型 = ['1', '2', '100', '110', '111', '120', '121', '130', '131', '141', '150', '151', '160', '161', '170', '181']

    userType: number
    // 用户类型 = ['1', '2', '3', '4', '5'],

    signature: string
    // 个性签名,后台有专门匹配的个性签名的历史记录 ,

    tradingMaxims: string
    // 交易格言

    fxCode: string
    // 汇聊号(唯一,索引) ,

    userHeadImage: string
    // 小尺寸图

    userHeadImg_48: string
    // 小尺寸图

    userHeadImg_80: string
    // 中尺寸图

    userHeadImg_120: string
    // 大尺寸图 ,

    userHeadImg_400: string
    // 400尺寸图

    userCenterImg: string
    // 用户中心背景图(移动端)

    isNiuAuth: number
    // 是否牛人榜认证(1为已认证，0为未认证) ,

    addFriendSetting: number
    // 添加好友设置 = ['0', '1', '2', '3', '4'],

    isAllowAddFriend: boolean
    // 是否允许用户添加好友

    version: number
    // 数据版本号

    brokerInfo: BrokerInfoModel
    phoneRegionCode: string
    // 手机号归属地 ,

    phoneCountryCode: string
    // 手机号国家编号

    isDefaultPassword: boolean
    // 是否初始密码

    isIdentity: number
    // 是否实名认证

    kouBeiAuth: number
    // 口碑认证(0为未认证，1为已认证)
}
export interface UserDetailModel {
    // 用户详情字段表 不要问我每个字段什么意思  后端(徐毅)说他也不知道
    id: number
    uid: number
    registerTime: string
    registerTimeTickets: number
    sex: number
    idCard: string
    trueName: string
    qq: string
    registerIP: string
    remark: string
    countryCode: string
    provinceCode: string
    cityCode: string
    regionCode: string
    location: string
    occupation: string
    occupationValue: string
    tradingType: string
    tradeTypeValue: string
    tradingTechnique: string
    tradingTechniqueValue: string
    brokerValue: number
    brokerValueName: string
    userInfoComplete: number
    tradeAge: number
    birthday: string
    companyInfo: string
    jobTitle: string
}
