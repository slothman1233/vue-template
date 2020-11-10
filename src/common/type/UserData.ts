export enum UserInfoType {
  // 用户类型（0、普通用户，1、平台，2、运营）
  Normal,
  Platform,
  Admin
}
export interface UserInfoModel {

  // 用户基础信息

  userType:UserInfoType
  // 用户类型（0、普通用户，1、平台，2、运营）

  userId:number
  // 用户Id

  userName:string
  // 用户名

  nickName:string
  // 用户昵称

  headImg_48:string
  // 用户头像

  fxCode:number
  // 汇聊号
}