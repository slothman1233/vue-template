<template>
  <div class="app-container">
    <el-button class="search-item" type="primary" @click="pageSomeAdd">添加周刊</el-button>
    <el-select class="search-item" v-model="bannedState" placeholder="请选择禁言状态">
      <el-option
        v-for="item in banedOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-date-picker
      class="search-item"
      v-model="dateInfo"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions"
    >
    </el-date-picker>
    <el-input
      placeholder="请输入关键字"
      v-model="keyword"
      class="search-inp"
      @keyup.enter.native="keySearch"
    >
      <el-button slot="append" icon="el-icon-search" @click="keySearch"></el-button>
    </el-input>
    <el-table
      :data="WeeklyList"
      :max-height="maxTableHeight || null"
      class="tb-box"
      border
      ref="table"
    >
      <el-table-column align="center" prop="WeeklyName" label="周刊ID"> </el-table-column>
      <el-table-column align="center" prop="WeeklyNumber" label="周刊名称" width="80px">
      </el-table-column>
      <el-table-column align="center" prop="WeeklyCode" label="文章数量" width="80px">
      </el-table-column>
      <el-table-column align="center" prop="weight" label="封面图" width="80px"> </el-table-column>
      <el-table-column align="center" prop="createUser" label="实际阅读量" sortable> </el-table-column>
      <el-table-column align="center" prop="createTime" label="展示阅读量" sortable> </el-table-column>
      <el-table-column
        align="center"
        prop="createTime"
        label="上架时间"
        sortable
        :formatter="pageSomeTimeFormat"
      >
      </el-table-column>
      <el-table-column align="center" prop="createUser" label="状态"> </el-table-column>
      <el-table-column align="right" label="操作">
        <template slot-scope="{ row }">
          <el-button :icon="row.rank | rankIcon" :title="row.rank | rankTitle"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next, total,jumper"
      :total="total"
      :page-size="pageSize"
      :current-page.sync="pageIndex"
      @current-change="getList"
      style="margin-top:20px;"
    >
    </el-pagination>
    <!-- 弹窗 -->
    <AddWeeklyDialog
      :show.sync="showAddDialog"
      :temp.sync="dialogTemp"
      :mode="dialogMode"
      @update="getList"
      @dialog-cancel="dialogCancel"
    />
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import AddWeeklyDialog from './components/add.vue'
import { getWeeklyListForPage, deleteWeekly } from '@/common/services/WeeklyService'
import PageSome from '@/common/mixins/page.mixin'
import { pickerOptions } from '@/utils'
@Component({
  name: 'WeeklyList',
  components: { AddWeeklyDialog },
  filters: {
    // 排行UI控制
    rankIcon(val) {
      return val === 1 ? 'el-icon-sort-up' : 'el-icon-sort-down'
    },
    rankTitle(val) {
      return val === 1 ? '设置排行' : '取消排行'
    },
  },
})
export default class WeeklyList extends PageSome {
  WeeklyList: Array<AuthWeekly> = []

  async getList() {
    // 获取列表
    const res = await getWeeklyListForPage(this.pageParams)
    if (!res) return
    this.WeeklyList = res.bodyMessage?.items
    this.total = res.bodyMessage?.totalRecords || 0
  }
  // 删除
  async delWeekly(Weekly: AuthWeekly) {
    const confirm = await this.$confirm(`确定删除${Weekly.WeeklyName}吗？`).catch(e => e)
    if (confirm === 'cancel') return
    const res = await deleteWeekly(Weekly)
    if (!res) return
    this.$message.success('操作成功')
    this.getList()
  }

  // 编辑弹窗取消后还原备份数据
  dialogCancel(data) {
    this.dialogTemp = false
    this.$set(this.WeeklyList, this.nowEditIndex, data)
    this.nowEditIndex = -1
  }
  showAddDialog = true

  pickerOptions = Object.freeze(pickerOptions())
  // 周刊状态
  bannedState: string | number = ''
  // 周刊状态选项
  banedOptions = [
    { label: '正常', value: 0 },
    { label: '下架', value: 1 },
    { label: '待上架', value: 2 },
    { label: '热门周刊', value: 3 },
  ]
  // 时间区间
  dateInfo = ''
}
interface AuthWeekly {
  WeeklyName: string
  // 模块名

  WeeklyNumber: number
  // 模块序号

  WeeklyCode: string
  // 模块代码

  weight: number
  // 权重排序

  isEnabled: boolean
  // 是否启用

  createUser: string
  // 创建人

  createTime: string
  // 创建日期

  lastUser: string
  // 最后修改人

  lastTime: string
  // 最后修改日期

  isDelete: boolean
  // 是否删除

  id: number
  // 主键
}
</script>

<style scoped lang="less">
@import '~@/common/style/listbox.less';
</style>
