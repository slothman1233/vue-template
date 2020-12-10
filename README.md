# stl-vue-ts-template

## 这一步一定要做
```
全局搜索appName
除了变量级别 只要是字符串或样式匹配的 修改成你所对应项目命名
约有 package.json name
public -> index.html -> id="appName"
set-public-path
总之查到的地方字符串都改就行了  不多就几个
但是不改 后续出现样式不生效的 看看是不是这一步没做
```

## 注意事项
```
污染注意：
！！！尽可能的不污染window以及全局Vue或是其他的原型
！！！尽可能的不污染window以及全局Vue或是其他的原型
！！！尽可能的不污染window以及全局Vue或是其他的原型
```
—————————————————————————————————————————————————————————
```
文件名:
filter => xxx.filter.ts
mixin => xxx.mixin.ts
service => XxxService.ts
type => XxxData.ts // 专属数据模型
component => XxxXxx/index.vue
(以及该组件其他的拆分都在此目录自行消化)
view => 同上
```
—————————————————————————————————————————————————————————
```
打包注意:
vue.config.js里面配置了一些忽略包和CDN
[1, { 'vue': 'Vue', }],
[2, { 'vue-router': 'VueRouter', }],
[3, { 'vuex': 'Vuex' }],
[4, { 'axios': 'axios', }],
[5, { 'echarts': 'echarts' }],
[6, { 'element-ui': 'ElementUI' }],
打包时可以选择忽略 (例:yarn build --ex=1,3,4)
如果不传则全部打包
另外element-ui如果选择使用cdn请剔除相关引入代码
```
—————————————————————————————————————————————————————————

```
微前端模式和平时开发注意：
package.json的项目名字改成自己需要的
set-public-path.ts 里面的路径要和package.json的项目名字一致
并且平时写样式的时候 不要#${你的项目名} 可能会有意想不到的问题
```

## 目录说明——(未说明的部分请参照 vue-cli 文档)

```
├── config
│   ├── ex.config.js              webpack忽略配置
│   └── plugins.config.js         webpackPlugin
├── postcss.config.js             样式插件配置
│   ├── common
│   │   ├── config                公共配置部分
│   │   │   ├── emoji.config.ts
│   │   │   ├── tinymce.config.ts
│   │   │   └── upload.config.ts
│   │   ├── decorators            公共装饰器
│   │   │   └── preposition.fn.decorator.ts
│   │   ├── filters               vue2.x filters
│   │   │   └── statusToUI.ts
│   │   ├── mixins                vue2.x 采用mixin
│   │   │   ├── dialog.mixin.ts
│   │   │   ├── exposeAndComplaint.mixin.ts
│   │   │   ├── page.mixin.ts
│   │   │   └── tool.mixin.ts
│   │   ├── plugins               插件存放
│   │   │   ├── PreviewImg
│   │   │   │   ├── index.ts
│   │   │   │   └── preview.tsx
│   │   │   └── base.ts
│   │   ├── services              请求存放
│   │   │   ├── ExposeService.ts
│   │   │   └── RemoteService.ts
│   │   ├── style                 样式存放，重点看完PublicDefind.less，(其他部分是遗留未剔除)
│   │   │   ├── Animation.less
│   │   │   ├── PublicDefind.less
│   │   │   ├── adaptation.less
│   │   │   ├── element-ui.less
│   │   │   ├── font
│   │   │   │   ├── iconfont.css
│   │   │   │   ├── iconfont.eot
│   │   │   │   ├── iconfont.svg
│   │   │   │   ├── iconfont.ttf
│   │   │   │   └── iconfont.woff
│   │   │   ├── index.less
│   │   │   ├── listbox.less
│   │   │   ├── mixin.less
│   │   │   ├── public
│   │   │   │   └── public.less
│   │   │   ├── reset.less
│   │   │   ├── sidebar.less
│   │   │   ├── transition.less
│   │   │   └── variables.less
│   │   └── type                数据类型存放
│   │       ├── BarrageData.ts
│   │       ├── BaseData.d.ts
│   │       ├── BaseService.d.ts
│   │       ├── CommentData.ts
│   │       ├── ComplaintData.ts
│   │       ├── ConfigData.ts
│   │       ├── DealerData.ts
│   │       ├── ExposeData.ts
│   │       ├── QsData.ts
│   │       ├── RemoteData.ts
│   │       ├── UserData.ts
│   │       └── VideoData.ts
│   ├── components              公共组件
│   │   ├── CanEditBtn.vue
│   │   ├── HeaderNav           公共头部
│   │   │   ├── SelfInfo.vue
│   │   │   └── index.vue
│   │   ├── SvgIcon             SVGicon深圳要求统一时拉取来的  只在登录页用了
│   │   │   └── index.vue
│   │   ├── TableRender.tsx     tsx版的表格封装
│   │   ├── Upload.vue          图片上传
│   │   ├── UploadVideo.vue     视频上传
│   │   └── YesNNoTag.vue       是否组件
│   ├── layout                    布局存放
│   │   └── index.vue             基本布局视图
│   ├── main.ts
│   ├── router
│   │   └── index.ts              路由注册
│   ├── router-hooks-init.ts      路由钩子注册
│   ├── set-public-path.ts        微前端路径注册
│   ├── shims-tsx.d.ts
│   ├── shims-vue.d.ts
│   ├── store            VUEX
│   │   ├── index.ts
│   │   ├── modules
│   │   │   ├── demo.ts
│   │   │   └── index.ts
│   │   ├── mutation-types.ts
│   │   └── types.ts
│   ├── utils        工具存放
│   │   ├── env.ts
│   │   ├── http
│   │   │   └── index.ts
│   │   ├── index.ts
│   │   └── validate.ts
│   └── views         页面存放
│       ├── Home
│       │   ├── components
│       │   │   ├── Chart.vue
│       │   │   ├── DashTab.vue
│       │   │   └── UserInfo.vue
│       │   ├── imgs
│       │   │   └── avatar.jpg
│       │   └── index.vue
│       └── login.vue   登录页基本上不需要管
```

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Run your unit tests

```
yarn test:unit
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
