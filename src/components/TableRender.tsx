import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
    name: 'TableRender',
})
export default class TableRender extends Vue {
    @Prop({
        default: () => [],
    })
    tableData?: any[]
    @Prop({
        default: () => [],
    })
    list?: any[]

    @Prop({ default: false })
    showSelBox?: boolean
    tableColRender(arr) {
        if (!arr) {
            return null
        }
        return arr.map((item, index) =>
            item ? (
                <el-table-column
                    align="center"
                    prop={item.prop}
                    label={item.label}
                    {...item.other}
                    scopedSlots={{
                        default: item?.other?.slotName
                            ? this.$scopedSlots[item.other.slotName]
                            : null,
                    }}
                ></el-table-column>
            ) : null
        )
    }
    render() {
        const selBox = this.showSelBox ? (
            <el-table-column type="selection" width="55"></el-table-column>
        ) : null
        return (
            <el-table data={this.list} class="tb-box" border {...this.$attrs}>
                {selBox}
                {this.tableColRender(this.tableData)}
            </el-table>
        )
    }
}
