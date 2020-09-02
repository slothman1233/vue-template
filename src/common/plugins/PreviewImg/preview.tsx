import { Component, Vue } from 'vue-property-decorator'
import { isType } from '@/utils'
import { VNode, VueConstructor } from 'vue/types/umd'
import { isArray } from 'lodash'
import ElImageViewer from 'element-ui/packages/image/src/image-viewer.vue'
const isString = isType('string')
const ElImage:any = ElImageViewer
@Component({
    name: 'Preview',
})
export default class Preview extends Vue {
  visible = true
  img: string | Array<any> = ''
  destroyed() {
    this.$el.parentNode?.removeChild(this.$el)
  }
  render() {
      const ImgEle = (url: string) => <el-image src={url} fit="fill"></el-image>
      let ImgsEle: null | VNode | VNode[] = null
      if (isString(this.img)) {
          ImgsEle = ImgEle(this.img as string)
      } else if (isArray(this.img)) {
          ImgsEle = (
              <ElImage
                  {...{
                      props: {
                          urlList: this.img.map(img => img.url),
                          onClose: () => {
                              this.visible = false
                          },
                      },
                  }}
              />
          )
      }
      return (
          <el-dialog
              class="plugin__PreviewImg"
              visible={this.visible}
              fullscreen
              show-close={false}
              destroy-on-close={true}
              {...{
                  on: { 'update:visible': val => (this.visible = val), closed: () => this.$destroy() },
              }}
          >
              {ImgsEle}
          </el-dialog>
      )
  }
}
