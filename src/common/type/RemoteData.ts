/*
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-11-06 16:06:35
 * @LastEditTime: 2020-11-11 09:48:44
 */
import { UserCollectInfo, UserDetailModel, UserInfoModel } from './UserData'
export interface SumUserInfo {
    // 用户信息汇总数据模型
    userBaseModel: UserCollectInfo
    userDetailsModel: UserDetailModel
}
export enum AnswerType {
    // 回答类型
    All, // 全部
    Qs, // 提问
    Expose, // 曝光
}
export interface AnswerUserInfo extends UserInfoModel {
    // 回答内的用户模型
    ip: string
    // 发表的用户的IP

    location: string
    // 发表的用户所在城市

    isFxCode: boolean
    // 是否显示汇聊号

    isAnonymity: boolean
    // 是否匿名
}
export interface AnswerModel {
    // 回答基础模型

    answerType: AnswerType
    // 回答的类型，用于区分来源自哪个业务（0、全部，1、提问，2、曝光等）

    themeId: number
    // 回答主题Id 根据主题类型而定，存放主题的主键Id。用主题类型+主题Id区分唯一

    themeTitle: string
    // 回答主题的标题（用于记录和消息）

    fromUser: AnswerUserInfo
    fileSet: FileSetModel
    content: string
    // 回答内容

    likeCount: number
    // 喜欢量

    commentCount: number
    // 评论量

    forwardCount: number
    // 转发量

    thumbUpCount: number
    // 点赞量

    favoriteCount: number
    // 收藏量

    createTime: string
    // 创建日期

    createTimeText: string
    // 日期文案

    isThumbUp: boolean
    // 检测当前用户的点赞状态（true：已经点赞，false：没有点赞）

    showStatus: number
    // 可见度（1、所有人可见，2、发送的用户和后台可见）
    id: number
    // 主键
}

export enum BaseDataDisplayStatus {
    // 本项目基础共用显示状态
    All, // 全部
    Show, // 显示
    Hide, // 不显示
    Recycle, // 回收站
    OnlyUser, // 4、仅用户可见，5、
    OnlyCity, // 仅同城可见
}
export enum BaseDataDisplayStatusText {
    // 本项目基础共用显示状态
    All = '全部', // 全部
    Show = '显示', // 显示
    Hide = '不显示', // 不显示
    Recycle = '回收站', // 回收站
    OnlyUser = '仅用户可见', // 4、仅用户可见，5、
    OnlyCity = '仅同城可见', // 仅同城可见
}
