import { AnswerUserInfo } from './RemoteData'

// 评论数据来源
export enum CommentSource {
    // 0、不限，1、移动IOS端，2、移动安卓端，3、电脑桌面，4、web网站，5、服务端，6、EA，7、移动H5
    All,
    IOS,
    Android,
    PC,
    Web,
    Server,
    EA,
    H5,
}
// 评论产品类型
export enum CommentProductType {
    // 0、不限，2、fx110，17、fx110繁体，10、汇查查
    All,
    Master,
    MasterTW,
    ChaCha,
}
// 评论类型
export enum CommentType {
    /*
    /// <summary>
        /// 不限
        /// </summary>
        None = 0,
        /// <summary>
        /// 回答
        /// </summary>
        Answer = 1,
        /// <summary>
        /// 投诉
        /// </summary>
        Complaints = 2,
        /// <summary>
        /// 曝光
        /// </summary>
        Exposure = 3,
        /// <summary>
        /// 专题
        /// </summary>
        Special = 4,
        /// <summary>
        /// 外汇书籍
        /// </summary>
        Book = 5,
        /// <summary>
        /// 交易商
        /// </summary>
        Enterprise = 6,
        /// <summary>
        /// 交易排行
        /// </summary>
        TransactionList = 7,
        /// <summary>
        /// 女神大赛
        /// </summary>
        Goddess = 8,
        /// <summary>
        /// BrokersShow展会新闻
        /// </summary>
        BrokersShowNew = 9,
        /// <summary>
        /// BrokersShow展会EN新闻
        /// </summary>
        BrokersShowENNew = 10,
        /// <summary>
        /// BrokersShow展会专题
        /// </summary>
        BrokersShowSpecial = 11,
        /// <summary>
        /// 文件集
        /// </summary>
        Files = 12,
        /// <summary>
        /// 代理商
        /// </summary>
        EnterpriseAgent = 13,
        /// <summary>
        /// 虚价交易商
        /// </summary>
        EnterpriseFalse = 14,
        /// <summary>
        /// 云评测
        /// </summary>
        Cloud = 15,
        /// <summary>
        /// 交易商口碑
        /// </summary>
        EntReputation = 16,
        /// <summary>
        /// 原油
        /// </summary>
        EnterpriseOil = 17,
        /// <summary>
        /// 黄金
        /// </summary>
        EnterpriseGold = 18,
        /// <summary>
        /// 维权E时间
        /// </summary>
        ETime = 28,
        /// <summary>
        /// 其他交易商
        /// </summary>
        OtherEnt = 30,
        /// <summary>
        /// 汇查查口碑打分评论
        /// </summary>
        HCCReputation = 31
    */
    All,
    Answer,
    Complaint,
    Expose,
    Special,
    Book,
    Enterprise,
    BrokersShowNew = 9,
    BrokersShowENNew,
    BrokersShowSpecial,
    EnterpriseAgent = 13,
    EnterpriseFalse,
    Cloud,
    EntReputation,
    EnterpriseOil,
    EnterpriseGold,
    ETime = 28,
}
// 评论类型文字
export enum CommentTypeText {
    // 0、不限，1、回答，2、投诉、3、曝光，4、维权E时间
    All = '不限',
    Answer = '回答',
    Complaint = '投诉',
    Expose = '曝光',
    Special = '专题',
    Book = '外汇书籍',
    Enterprise = '交易商',
    BrokersShowNew = 'BrokersShow展会新闻',
    BrokersShowENNew = 'BrokersShow展会EN新闻',
    BrokersShowSpecial = 'BrokersShow展会专题',
    EnterpriseAgent = '代理商',
    EnterpriseFalse = '虚假交易商',
    Cloud = '云评测',
    EntReputation = '交易商口碑',
    EnterpriseOil = '原油',
    EnterpriseGold = '黄金',
    ETime = '维权E时间',
}
// 评论显示状态
export enum CommentDisplayType {
    // 0、不限，1、显示，2、不显示，3、违规
    All,
    Show,
    Hide,
    Violate,
}
export enum CommentDisplayText {
    // 0、不限，1、显示，2、不显示，3、违规
    All = '全部',
    Show = '显示',
    Hide = '不显示',
    Violate = '违规',
}
// 评论审核状态
export enum CommentStatusType {
    // 审核状态（0、不限，1、已审核，2、待审核，3、审核不通过，4、回收站）
    All,
    Pass,
    Wait,
    Obsolete,
    Recycle,
}
export enum CommentStatusText {
    // 审核状态（0、不限，1、已审核，2、待审核，3、审核不通过，4、回收站）
    All = '全部',
    Pass = '已审核',
    Wait = '待审核',
    Obsolete = '审核不通过',
    Recycle = '回收站',
}

export interface ReplyUserInfoModel {
    // 回答官方和平台回复模型

    userId: number
    // 用户Id

    nickName: string
    // 用户昵称

    headImg_48: string
    // 用户头像

    content: string
    // 回复内容

    fileSet: FileSetModel
    // 文件集

    time: string
    // 回复时间

    timeText: string
    // 回复时间（中文）
}
// 评论数据模型
export interface CommentModel {
    source: CommentSource
    productType: CommentProductType
    commentType: CommentType
    // 评论的类型，用于区分来源自哪个业务（0、不限，1、回答，2、投诉、3、曝光，4、维权E时间）可扩展
    themeId: number
    // 评论主题Id（根据CommentType而定，有可能是回答的主键，有可能是提问的主键） 根据主题类型而定，存放主题的主键Id。用主题类型+主题Id区分唯一

    originalId: number
    themeTitle: string
    // 评论主题的标题（用于记录和消息）

    fromUser: AnswerUserInfo
    toUser: AnswerUserInfo
    fileSet: FileSetModel
    content: string
    // 评论内容

    childCommentCount: number
    // 跟评数

    thumbUpCount: number
    // 被点赞的数量

    status: CommentStatusType
    display: CommentDisplayType

    createTime: string
    // 创建日期

    createTimeText: string
    // 日期文案

    isThumbUp: boolean
    // 检测当前用户的点赞状态（true：已经点赞，false：没有点赞）

    adminReplay: ReplyUserInfoModel
    entReplay: ReplyUserInfoModel
    id: number
    // 主键
}
