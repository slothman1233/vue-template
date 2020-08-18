import { Component, Vue, Model, Emit, Prop } from 'vue-property-decorator'
@Component
export default class Sselect extends Vue {
  // 状态
  @Model('change')
  state!: any

  @Emit('change')
  change(e: any) {
    return e
  }
  @Prop()
  options!:[]
  @Prop()
  placeholder!:[]
  // 状态选项
  render() {
    return (
      <el-select class="search-item" value={this.state} onChange={this.change} placeholder={this.placeholder}>
        {this.options.map((item:any) => (
          <el-option key={item.value} label={item.label} value={item.value}></el-option>
        ))}
      </el-select>
    )
  }
}
