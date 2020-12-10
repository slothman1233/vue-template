<!--
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-11-02 16:51:09
 * @LastEditTime: 2020-11-03 14:00:12
-->
<template>
    <div class="edit-item-box">
        <el-input
            v-model="tempTitle"
            :placeholder="placeholder"
            class="mini-inp"
            @blur="onBlur"
            @keyup.native.enter="sure"
            v-focus
            v-bind="$attrs"
        ></el-input>
        <el-button
            type="text"
            @click="sure"
            @mouseenter.native="changeCanBlur(false)"
            @mouseleave.native="changeCanBlur(true)"
            >确定</el-button
        >
        <el-button type="text">取消</el-button>
    </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'
@Component({
    name: 'CanEditBtn',
    directives: {
        focus: {
            inserted: function(el) {
                if (el.tagName === 'INPUT') {
                    el.focus()
                    return
                }
                el.querySelector('input')?.focus()
            },
        },
    },
})
export default class CanEditBtn extends Vue {
    @Prop()
    placeholder?: string
    @Prop({
        default: '',
    })
    value?: string
    @Watch('value', { immediate: true })
    changeVal(val) {
        this.changTempTitle(val)
    }
    // 临时输入记录
    tempTitle = ''
    canBlur = true
    changeCanBlur(tag) {
        this.canBlur = tag
    }
    changTempTitle(str) {
        this.tempTitle = str
    }
    @Emit()
    sure() {
        this.canBlur = true
        return this.tempTitle
    }
    onBlur(isSure?: any) {
        if (!this.canBlur && isSure !== 1) {
            return
        }
        this.changTempTitle('')
        this.$emit('cancel')
    }
}
</script>

<style scoped lang="less">
.mini-inp {
    width: 270px;
}
</style>
