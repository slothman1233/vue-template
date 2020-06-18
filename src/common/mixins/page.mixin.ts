import { Component, Vue, Ref } from 'vue-property-decorator'
import { EventUtil } from '@/utils'
import moment from 'moment'

/*
专属于后台管理列表页的Mixin
集成了分页管理 列表加载 弹窗操作 添加 编辑
*/
@Component
export default class PageSome extends Vue {
  created() {
    this.init()
  }
  init() {
    this.getList()
  }
  getList() {
    console.log('请重写getList方法 请求列表')
  }
  keySearch() {
    this.pageIndex = 1
    this.getList()
  }
  // 条数
  pageSize = 20

  //页码
  pageIndex = 1

  // 关键字
  keyword = ''

  get pageParams() {
    return {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      searchKey: this.keyword,
    }
  }

  // 总条数
  total = 0

  // 表格最大高度
  maxTableHeight: number | string = ''

  @Ref()
  readonly table
  _tbel: any = null
  _document: any = null
  pageSomeChangeTableHeight() {
    this._tbel = this._tbel || this.table.$el
    this._document = this._document || document.body
    // 顶部距离
    const offsetTop = this._tbel?.offsetTop
    // 可视区域高度
    const height = this._document?.scrollHeight
    //可供使用的区域高度
    this.maxTableHeight = height - offsetTop - 80
  }

  // 弹窗显示
  showAddDialog = false
  // 弹窗临时数据
  dialogTemp: any = false
  // 弹窗模式
  dialogMode = 'add'

  pageSomeAdd() {
    // 新增
    this.dialogTemp = undefined
    this.dialogMode = 'add'
    this.showAddDialog = true
  }

  // 当前正在编辑 -1没有
  nowEditIndex = -1

  pageSomeEdit(temp: any, index) {
    // 编辑
    this.dialogTemp = temp
    this.nowEditIndex = index
    this.dialogMode = 'edit'
    this.showAddDialog = true
    console.log(this.dialogTemp)
  }

  pageSomeTimeFormat(row, column, cellValue) {
    return moment(cellValue).format('YYYY-MM-DD HH:mm')
  }

  mounted() {
    this.pageSomeChangeTableHeight()
    EventUtil.addHandler(window, 'resize', this.pageSomeChangeTableHeight)
  }

  destroyed() {
    EventUtil.removeHandler(window, 'resize', this.pageSomeChangeTableHeight)
  }
}
