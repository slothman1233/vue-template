<template>
  <div class="app-container">
    <!-- <el-button type="primary" @click="pageSomeAdd">新增菜单</el-button> -->
    <el-select class="search-item" v-model="articleState" placeholder="请选择文章状态">
      <el-option
        v-for="item in articleOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-input
      placeholder="文章ID/标题/周刊期数"
      v-model="keyword"
      class="search-inp"
      @keyup.enter.native="keySearch"
    >
      <el-button slot="append" icon="el-icon-search" @click="keySearch"></el-button>
    </el-input>
    <el-table
      :data="articleList"
      :max-height="maxTableHeight || null"
      class="tb-box"
      border
      ref="table"
    >
      <el-table-column align="center" prop="id" label="文章ID" width="80"> </el-table-column>
      <el-table-column align="center" prop="weeklyPeriods" label="期数"></el-table-column>
      <el-table-column align="center" prop="chapterTitle" label="文章标题"></el-table-column>
      <el-table-column align="center" prop="authorName" label="作者"> </el-table-column>
      <el-table-column align="center" label="头像">
        <template slot-scope="{ row }">
          <el-avatar size="large" :src="row.authorIcon"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="readCount"
        label="真实阅读量"
        sortable
      ></el-table-column>
      <el-table-column align="center" prop="readShow" label="展示阅读量" sortable>
      </el-table-column>
      <el-table-column
        align="center"
        prop="firstCommentCount"
        label="评论数"
        sortable
      ></el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="{ row }">
          <el-tag :type="row.status | articleStatusToType">{{
            row.status | articleStatusToText
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="130">
        <template slot-scope="{ row, $index }">
          <el-button
            type="primary"
            icon="el-icon-edit-outline"
            title="编辑"
            circle
            size="mini"
            @click="pageSomeEdit(row, $index)"
          ></el-button>
          <el-button
            :type="row.stickWeight | hotType"
            :icon="row.stickWeight | hotIcon"
            :title="row.stickWeight | hotTitle"
            size="mini"
            circle
            @click="hotArticle(row)"
          ></el-button>
          <el-button
            :type="row.status | putawayType"
            :icon="row.status | putawayIcon"
            :title="row.status | putawayTitle"
            size="mini"
            circle
            @click="doArticle(row)"
          ></el-button>
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
    <EditArticle
      :show.sync="showAddDialog"
      :temp.sync="dialogTemp"
      :mode="dialogMode"
      @update="getList"
      @dialog-cancel="dialogCancel"
    />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import EditArticle from '@/components/Dialog/EditArticle.vue'
import { getArticleListForPage, doArticle, hotArticle } from '@/common/services/ArticleService'
import {
  createSimpleFilter,
  articleStatusToText,
  articleStatusToType,
} from '@/common/filters/statusToUI'
import PageSome from '@/common/mixins/page.mixin'
const CompareStatus = [0, 2]
@Component({
  name: 'ArticleList',
  components: { EditArticle },
  filters: {
    // 上下架UI
    putawayIcon(status) {
      return createSimpleFilter(status, CompareStatus, ['el-icon-top', 'el-icon-bottom'])
    },
    putawayTitle(status) {
      return createSimpleFilter(status, CompareStatus, ['上架', '下架'])
    },
    putawayType(status) {
      return createSimpleFilter(status, CompareStatus, ['success', 'danger'])
    },
    articleStatusToType,
    articleStatusToText,
    // 上下热门UI
    hotType(weight) {
      return createSimpleFilter(weight, 1, ['warning', 'info'])
    },
    hotIcon(weight) {
      return createSimpleFilter(weight, 1, ['el-icon-star-off', 'el-icon-star-on'])
    },
    hotTitle(weight) {
      return createSimpleFilter(weight, 1, ['取消热门', '设置热门'])
    },
  },
})
export default class ArticleList extends Mixins(PageSome) {
  articleList: Array<Article> = []

  async getList() {
    // 获取列表
    const params = {
      ...this.pageParams,
      status: this.articleState,
    }
    const res = await getArticleListForPage(params)
    if (!res) return
    this.articleList = res.bodyMessage?.pageDatas
    this.total = res.bodyMessage?.total || 0
  }
  // 下架
  async doArticle(article: Article) {
    const flagText = (this.$options.filters as any)['putawayTitle'](article.status)
    const confirm = await this.$confirm(`确定${flagText}${article.chapterTitle}吗？`).catch(e => e)
    if (confirm === 'cancel') return
    const res = await doArticle({
      chapterId: article.id,
      status: CompareStatus.includes(article.status) ? 1 : 0,
    })
    if (!res) return
    this.$message.success('操作成功')
    this.getList()
  }
  // 设置热门
  async hotArticle(article: Article) {
    const flagText = (this.$options.filters as any)['hotTitle'](article.stickWeight)
    const confirm = await this.$confirm(`确定${flagText}${article.chapterTitle}吗？`).catch(e => e)
    if (confirm === 'cancel') return
    const res = await hotArticle({
      chapterId: article.id,
      stickWeight: article.stickWeight ? 0 : 1,
    })
    if (!res) return
    this.$message.success('操作成功')
    this.getList()
  }

  // 编辑弹窗取消后还原备份数据
  dialogCancel(data) {
    this.dialogTemp = false
    this.$set(this.articleList, this.nowEditIndex, data)
    this.nowEditIndex = -1
  }

  // 功能修改后的同步
  actionChange({ data, index }) {
    const row = this.articleList[index]
    this.$set(this.articleList, index, Object.assign({}, row, { actions: data }))
  }

  // 文章状态
  articleState: string | number = 3
  // 文章状态选项 （0：下架，1：上架，2:自动下架，3:全部，4：热门文章）
  articleOptions = [
    { label: '全部', value: 3 },
    { label: '上架', value: 1 },
    { label: '下架', value: 0 },
    { label: '自动下架', value: 2 },
    { label: '热门文章', value: 4 },
  ]
}
interface Article {
  audioSrc: string
  // 音频地址

  authorIcon: string
  // 作者头像

  authorName: string
  // 作者笔名

  bannerSort: number
  // 专题（轮播图）排序

  categoryId: number
  // 栏目ID

  categorySort: number
  // 分类排序，按自然顺序

  chapterBg: string
  // 文章背景图

  chapterContent: string
  // 文章内容

  chapterSummary: string
  // 文章摘要介绍

  chapterTitle: string
  // 文章标题

  contentUrl: string
  // 内容url

  createTime: string
  // 创建时间

  favoritesCount: number
  // 收藏数

  favoritesInsert: number
  // 收藏数插值

  firstCommentCount: number
  // 一级评论数

  id: number
  // 文章ID

  lanId: number
  // 文章语言区域ID

  readCount: number
  // 阅读数

  readInsert: number
  // 阅读数插值

  readShow: number
  // 展示阅读数

  status: number
  // 上下架状态，2自动下架,1上架，0下架

  stickWeight: number
  // 置顶权重（1：置顶:0：取消置顶）

  subTitle: string
  // 文章副标题

  weeklyId: number
  // 周刊标识ID

  weeklyName: string
  // 周刊名称

  weeklyPeriods: string
  // 年份期数
}
</script>

<style scoped lang="less">
@import '~@/common/style/listbox.less';
.detail-box {
  .flex(flex-start);
  .demo-table-expand {
    margin-right: 30px;
  }
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
}
</style>
