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
    // 0、不限，1、回答，2、投诉、3、曝光，4、维权E时间
    All,
    Answer,
    Complaint,
    Expose,
    ETime,
}
// 评论类型文字
export enum CommentTypeText {
    // 0、不限，1、回答，2、投诉、3、曝光，4、维权E时间
    All = '不限',
    Answer = '回答',
    Complaint = '投诉',
    Expose = '曝光',
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
