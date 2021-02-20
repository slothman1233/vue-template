export enum DealerTemplateType {
    // 交易商模板
    All = -1, // 全部
    Default, // 默认
    GoldMedal, // 金牌
    SilverMedal, // 银牌
}
export enum DealerTemplateText {
    // 交易商模板文字
    All = '全部', // 全部
    Default = '默认', // 默认
    GoldMedal = '金牌', // 金牌
    SilverMedal = '银牌', // 银牌
}
// 推荐位
export enum RecommendedPositionType {
    Top = 1, // 首页顶部推荐
    List, // 交易商列表推荐
    Bottom, // 底部推荐
}
export enum RecommendedPositionText {
    Top = '首页顶部推荐',
    List = '交易商列表推荐',
    Bottom = '底部推荐',
}
// 出入金类型
export enum CashInAndOutType {
    In = 1, // 入金
    Out, // 出金
}
export enum CashInAndOutText {
    In = '入金',
    Out = '出金',
}
// 出入金入口
export enum AmountWayType {
    Bank = 1, // 银联
}
export enum AmountWayText {
    Bank = '银联',
}
export enum EntType {
    //平台类型，默认 0 全部，1 交易商，2 香港黄金，3 虚假交易商，4 原油期货，10 代理商，12 资金盘，13 股票期货
    All,
    Dealer,
    Gold,
    Fake,
    Crude,
    Proxy = 10,
    Money = 12,
    Stock = 13,
}
// 交易商显示状态
export enum EntStatusType {
    // -1 全部，0 未显示，1 已显示
    All = -1,
    Hide,
    Show,
}
export interface GoldenModel {
    // 出入金列表数据模型

    id: number
    // Id

    entId: number
    // 平台Id

    cashInAndOutType: CashInAndOutType
    // 出入金类型：1入金，2出金

    amountWay: AmountWayType
    // 出入金方式：1银联

    accountingSpeed: number
    // 到账速度

    fees: number
    // 手续费

    exchangeRate: number
    // 汇率

    exchangeRateDate: string
    // 汇率时间
}

export interface EntFilterModel {
    // 推荐平台名称LOGO模型

    tempType: DealerTemplateType
    // 店铺模板类型

    logo: string
    // Logo

    status: number
    // 显示状态

    entId: number
    // 企业ID

    name: string
    // 名称

    abb: string
    // 英文简称
}
export interface QsEntFilterModel {
    // 选平台关联平台模型

    tempType: DealerTemplateType
    // 店铺模板类型

    status: number
    // 显示状态

    entId: number
    // 平台ID

    name: string
    // 名称

    id: number
    // 本条关联ID
    qaId: number
    // 本条关联的题目ID
}
export interface EntPositionModel {
    // 平台推荐位置

    id: number
    // id

    positionId: RecommendedPositionType
    // 推荐位置ID

    entId: number
    // 平台ID
    entName: string
    // 平台ID

    sort: number
    // 排序号（从大到小排列）
}
