import { Component, Prop, ProvideReactive, Ref, Watch } from 'vue-property-decorator'
import { EveHeaderFilter, EveTipButton } from '@stl/eve-vue2-lib'
import PageSome from '@/common/mixins/page.mixin'
import TableRender from '@/components/TableRender'
import {
    getExposeListForPage,
    ExposeListPageParams,
    delExpose,
    getExposeDetail,
} from '@/common/services/ExposeService'
import { getProductTypes, getExposureProcessState } from '@/common/services/RemoteService'
import { qsStatusToText, qsShowStatusToText } from '@/common/filters/statusToUI'
import UserInfo from '@/components/UserInfo.vue'
import EditExpose from './components/EditExpose.vue'
import '@/common/style/listbox.less'
import { ExposureModel } from '@/common/type/ExposeData'
import { ConfirmD, LoadingD } from '@/common/decorators/preposition.fn.decorator'

@Component({
    name: 'ExposeList',
})
export default class ExposeList extends PageSome {
    created() {
        // 检测当前模式 并初始化
        this.viewMode === 1 && this.headerInit()
        this.tableColsInit()
    }
    /* 观看列表的模式 1 正常页面 2在用户信息查看 */
    @Prop({
        default: 1,
    })
    viewMode!: number
    /* 当前查看的这个用户 */
    @Prop()
    userInfo?: any
    @Watch('userInfo.uid', { immediate: true })
    searchForUser(val) {
        if (val !== undefined) {
            this.keyword = val
            this.canDoCreate = false
            this.getList()
        }
    }
    headerLoading = false
    @LoadingD('headerLoading')
    async headerInit() {
        await this.selInit()
        await this.processStateInit()
        this.headerConfigs = this.createHeaderConfigs()
    }
    async selInit() {
        // 获取产品类型
        const res = await getProductTypes(true)
        if (!res) {
            return
        }
        this.productTypeOpts = res.bodyMessage.map(_ => ({ label: _.value, value: +_.key }))
        this.searchForm.productType = this.productTypeOpts[0]?.value
    }
    async processStateInit() {
        // 获取曝光状态
        const res = await getExposureProcessState(true)
        if (!res) {
            return
        }
        this.processOpts = res.bodyMessage.map(_ => ({ label: _.value, value: +_.key }))
        this.searchForm.processState = this.processOpts[0]?.value
    }
    @Ref('header')
    readonly header
    resetForm() {
        this.header.reset()
    }
    searchForm: ExposeListPageParams = {
        processState: -1,
        source: 0,
        productType: 0,
        language: 0,
        userReply: -1,
        isReplyTemp: -1,
        status: 0,
        orderByMode: 1,
        isEntShow: -1,
        hasEntId: -1,
        adminName: '',
        isHots: -1,
        isSupplement: -1,
    }

    // 时间
    dateInfo = ''

    languageOpts = [
        { label: '语言', value: 0 },
        { label: '简体', value: 1 },
        { label: '繁体', value: 2 },
    ]
    processOpts: SelectModel[] = []
    productTypeOpts: SelectModel[] = []
    isHotsOpts = [
        { label: '热门', value: -1 },
        { label: '是热门', value: 1 },
        { label: '非热门', value: 0 },
    ]
    isSupplementOpts = [
        { label: '补充待处理', value: -1 },
        { label: '是', value: 1 },
        { label: '否', value: 0 },
    ]
    statusOpts = [
        { label: '全部显示状态', value: 0 },
        { label: '不显示', value: 2 },
        { label: '显示', value: 1 },
        { label: '回收站', value: 3 },
        { label: '违规', value: 4 },
    ]
    orderByModeOpts = [
        { label: '发布日期倒序', value: 1 },
        { label: '最新更新倒序', value: 2 },
        { label: '热门倒序', value: 3 },
    ]
    @LoadingD('pageSomeLoading', 'getListNext')
    async getList(form?: any) {
        if (form) {
            this.dateInfo = form.time
            Object.assign(this.searchForm, form)
        }
        const params = Object.assign({}, this.pageParams, this.searchForm)
        if (this.dateInfo) {
            Reflect.set(params, 'beginTime', this.dateInfo[0])
            Reflect.set(params, 'endTime', this.dateInfo[1])
        }
        return await getExposeListForPage(params)
    }
    getListNext(res) {
        if (!res) {
            return
        }
        this.exposeList = res.bodyMessage?.items
        this.total = res.bodyMessage.totalRecords
    }

    // 头配置
    headerConfigs: any[] = []
    createHeaderConfigs() {
        return [
            { type: 'time', value: this.dateInfo, returnKey: 'time' },
            {
                type: 'select',
                value: this.searchForm.language,
                returnKey: 'language',
                attrs: {
                    attrs: { options: this.languageOpts, placeholder: '请选择语言' },
                },
            },
            {
                type: 'select',
                value: this.searchForm.productType,
                returnKey: 'productType',
                attrs: {
                    attrs: { options: this.productTypeOpts, placeholder: '请选择产品类型' },
                },
            },
            {
                type: 'select',
                value: this.searchForm.processState,
                returnKey: 'processState',
                attrs: {
                    attrs: { options: this.processOpts, placeholder: '请选择曝光状态' },
                },
            },
            {
                type: 'select',
                value: this.searchForm.status,
                returnKey: 'status',
                attrs: {
                    attrs: { options: this.statusOpts, placeholder: '请选择显示状态' },
                },
            },
            {
                type: 'select',
                value: this.searchForm.orderByMode,
                returnKey: 'orderByMode',
                attrs: {
                    attrs: { options: this.orderByModeOpts, placeholder: '请选择排序模式' },
                },
            },
            {
                type: 'select',
                value: this.searchForm.isHots,
                returnKey: 'isHots',
                attrs: {
                    attrs: { options: this.isHotsOpts, placeholder: '请选择是否热门' },
                },
            },
            {
                type: 'select',
                value: this.searchForm.isSupplement,
                returnKey: 'isSupplement',
                attrs: {
                    attrs: { options: this.isSupplementOpts, placeholder: '请选择是否补充材料' },
                },
            },
            {
                type: 'input',
                value: this.searchForm.adminName,
                returnKey: 'adminName',
                attrs: {
                    unShowSearch: true,
                    attrs: { placeholder: '请输入处理人' },
                },
            },
            {
                type: 'input',
                value: this.keyword,
                returnKey: 'search',
                attrs: { attrs: { placeholder: '编号/用户昵称ID/标题/平台名' } },
            },
        ]
    }
    tableColsInit() {
        // 根据模式表格初始化字段
        if (this.viewMode === 2) {
            this.tableCols = [
                { prop: 'autoId', label: '编号', other: { props: { width: '60px' } } },
                { prop: 'title', label: '标题' },
                {
                    prop: 'createTime',
                    label: '提交时间',
                    other: { props: { formatter: this.pageSomeTimeFormat } },
                },
                { prop: 'statusText', label: '显示状态', other: { slotName: 'status' } },
                { prop: 'adminName', label: '处理人' },
                { prop: '', label: '操作', other: { slotName: 'dosth' } },
            ]
        } else {
            this.tableCols = [
                { prop: 'autoId', label: '编号', other: { props: { width: '60px' } } },
                { prop: 'userNickName', label: '用户昵称ID' },
                { prop: 'entName', label: '平台名称', other: { slotName: 'entName' } },
                { prop: 'title', label: '标题' },
                { prop: 'productTypeText', label: '曝光来源' },
                { prop: 'ip', label: '地区及IP', other: { slotName: 'addressAndIp' } },
                { prop: 'isHots', label: '热门', other: { slotName: 'isHots' } },
                { prop: 'processStateText', label: '曝光状态', other: { slotName: 'state' } },
                {
                    prop: 'createTime',
                    label: '提交时间',
                    other: { props: { formatter: this.pageSomeTimeFormat } },
                },
                { prop: 'statusText', label: '显示状态', other: { slotName: 'status' } },
                { prop: 'adminName', label: '处理人' },
                {
                    prop: '',
                    label: '操作',
                    other: { slotName: 'dosth', props: { fixed: 'right', width: '180' } },
                },
            ]
        }
    }
    // 表格字段
    tableCols: TableCols = []
    exposeList: ExposureModel[] = []
    @ConfirmD<ExposureModel>(() => ({ tip: '确定删除本问题吗？', success: '操作成功' }))
    async del(row, index) {
        const res = await delExpose({ id: row.autoId, status: 3 })
        if (!res) {
            return
        }
        this.getList()
        return true
    }
    // 展现个人信息
    showUserInfoDialog = false
    nowShowUserId = 0
    showUserInfo(row, idx) {
        this.showUserInfoDialog = true
        this.nowShowUserId = row.userId
    }

    // 获取曝光详情重写弹窗
    async pageSomeEditOverwrite(row, index) {
        const res = await getExposeDetail(row.autoId)
        if (!res) {
            this.$message.error('获取曝光详情失败')
            return
        }
        this.pageSomeEdit(res.bodyMessage, index)
    }
    getDoSthArr(row, index) {
        const res: any = [
            {
                props: { tipContent: '编辑' },
                attrs: { icon: 'el-icon-edit-outline', type: 'primary' },
                on: { click: () => this.pageSomeEditOverwrite(row, index) },
            },
        ]
        if (this.viewMode === 1) {
            res.push(
                {
                    props: { tipContent: '概览' },
                    attrs: { icon: 'el-icon-user-solid', type: 'primary' },
                    on: { click: async () => this.showUserInfo(row, index) },
                },
                {
                    props: { tipContent: '删除' },
                    attrs: { icon: 'el-icon-delete', type: 'danger' },
                    on: { click: () => this.del(row, index) },
                }
            )
        }
        return res
    }
    render() {
        const headers =
            this.viewMode === 1 ? (
                <EveHeaderFilter
                    configs={this.headerConfigs}
                    onSubmit={this.keySearch}
                    {...{ directives: [{ name: 'loading', value: this.headerLoading }] }}
                    ref="header"
                >
                    <el-button
                        slot="next"
                        class="search-item"
                        type="danger"
                        onClick={this.resetForm}
                    >
                        重置搜索条件
                    </el-button>
                </EveHeaderFilter>
            ) : null
        const viewUserInfo =
            this.viewMode === 1 ? (
                <UserInfo
                    show={this.showUserInfoDialog}
                    userId={this.nowShowUserId}
                    {...{
                        on: {
                            'update:show': val => (this.showUserInfoDialog = val),
                            edit: this.pageSomeEdit,
                        },
                        attrs: { 'destroy-on-close': true },
                    }}
                ></UserInfo>
            ) : null
        const doSthDOM = {
            dosth: ({ row, index }) => (
                <div>
                    {this.getDoSthArr(row, index).map(_ => (
                        <EveTipButton {..._} circle key={_.props.tipContent}></EveTipButton>
                    ))}
                </div>
            ),
            addressAndIp: ({ row, index }) => (
                <div>
                    <p>{row.location}</p>
                    <p>{row.ip}</p>
                </div>
            ),
            entShow: ({ row, index }) => <p>{row.isEntShow ? '是' : '否'}</p>,
            entName: ({ row, index }) => (
                <div>
                    <p>{row.entId}</p>
                    <p>{row.entName}</p>
                </div>
            ),
            isHots: ({ row, index }) => <p>{row.isHots ? '是' : '否'}</p>,
        }
        return (
            <div class="app-container">
                {headers}
                <TableRender
                    ref="table"
                    list={this.exposeList}
                    tableData={this.tableCols}
                    attrs={{ props: { 'max-height': this.maxTableHeight || null } }}
                    {...{ directives: [{ name: 'loading', value: this.pageSomeLoading }] }}
                    scopedSlots={doSthDOM}
                ></TableRender>
                <el-pagination
                    {...this.paginationProps}
                    onCurrent-change={() => this.getList()}
                    {...{
                        on: {
                            'update:currentPage': val => (this.pageIndex = val),
                        },
                    }}
                    style="margin-top:20px;"
                ></el-pagination>
                <EditExpose
                    show={this.showAddDialog}
                    temp={this.dialogTemp}
                    mode={this.dialogMode}
                    {...{
                        on: {
                            'update:temp': val => (this.dialogTemp = val),
                            'update:show': val => (this.showAddDialog = val),
                        },
                        attrs: { 'destroy-on-close': true },
                    }}
                    onUpdate={this.getList}
                ></EditExpose>
                {viewUserInfo}
            </div>
        )
    }
}
