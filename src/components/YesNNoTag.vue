<template>
    <el-tag :type="info.type"> <slot>{{ info.text }}</slot></el-tag>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
// 是否组件
@Component({
    name: 'YesNNoTag',
})
export default class YesNNoTag extends Vue {
    @Prop()
    flag!: any
    get info() {
        let res = { type: 'danger', text: '否' }
        if (this.flag) {
            res = { type: '', text: '是' }
        }
        return res
    }
}
</script>

<style scoped lang="less"></style>
