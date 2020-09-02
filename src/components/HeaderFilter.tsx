import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { pickerOptions, checkEmpty } from '@/utils'
import Sselect from '@/components/Sselect'
import { modifiers as m } from 'vue-tsx-support'
import '@/common/style/listbox.less'
import { merge } from 'lodash'
interface Config {
  type: string // 输入框 还是时间或者选择框
  value: any // 需要绑定的值
  returnKey: string // 返回时的字段名
  attrs: any // 各项属性以及事件绑定 同tsx
}
@Component({
    name: 'HeaderFilter',
})
export default class HeaderFilter extends Vue {
  @Prop()
  configs!: Config[] // 搜索头配置

  pickerOptions = Object.freeze(pickerOptions())
  form = {}
  setForm() {
      const obj = {}
      this.configs.forEach(config => {
          obj[config.returnKey] = checkEmpty(config.value) ? config.value : ''
      })
      this.form = obj
  }
  created() {
      this.setForm()
  }
  @Emit('submit')
  submit() {
      return this.form
  }

  datePickerProps = Object.freeze({
      props: {
          'unlink-panels': true,
          'range-separator': '至',
          'start-placeholder': '开始日期',
          'end-placeholder': '结束日期',
          'picker-options': this.pickerOptions,
          'value-format': 'yyyy-MM-dd HH:mm:ss',
          align: 'right',
          type: 'daterange',
      },
  })

  render() {
      const children = this.configs.map(({ type, returnKey, attrs }) => {
          switch (type) {
              case 'select':
                  return (
                      <Sselect
                          key={returnKey}
                          class="search-item"
                          vModel={this.form[returnKey]}
                          placeholder="请选择状态"
                          {...attrs}
                      />
                  )
              case 'time':
                  return (
                      <el-date-picker
                          key={returnKey}
                          class="search-item"
                          vModel={this.form[returnKey]}
                          {...merge({}, this.datePickerProps, attrs)}
                      ></el-date-picker>
                  )
              default:
                  return (
                      <el-input
                          key={returnKey}
                          class="search-inp"
                          vModel={this.form[returnKey]}
                          nativeOnKeyup={m.enter(this.submit)}
                          {...attrs}
                      >
                          <el-button slot="append" icon="el-icon-search" onClick={this.submit}></el-button>
                      </el-input>
                  )
          }
      })
      return (
          <div class="tb-header">
              {this.$slots.prev}
              {children}
              {this.$slots.next}
          </div>
      )
  }
}
