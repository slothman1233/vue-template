# stl-vue-ts-template
## 规范写在前面
```
污染注意：
！！！尽可能的不污染window以及全局Vue或是其他的原型
！！！尽可能的不污染window以及全局Vue或是其他的原型
！！！尽可能的不污染window以及全局Vue或是其他的原型

文件名:
filter => xxx.filter.ts
mixin => xxx.mixin.ts
service => XxxService.ts
component => XxxXxx/index.vue
(以及该组件其他的拆分都在此目录自行消化)
view => 同上

PS:(多人合作时要写什么小轮子的时候 先去公共部分看看队友是不是造好了)
```
## 目录说明——(未说明的部分请参照vue-cli文档)
```
├── postcss.config.js
├── src
│   ├── common
│   │   ├── filters     // 公共过滤器
│   │   ├── mixins      // 公共Mixin
│   │   │   ├── dialog.mixin.ts // 弹窗
│   │   │   ├── page.mixin.ts  // 分页列表
│   │   │   └── tool.mixin.ts  // 基础部分
│   │   ├── services    // 接口存放
│   │   │   ├── BaseService.d.ts // 共用基础参数类型声明
│   │   │   ├── LoginService.ts  // 示例
│   │   │   └── UserService.ts   // 示例
│   │   └── style      // 公共样式部分
│   │       ├── listbox.less
│   │       └── reset.less
│   ├── components     // 公共组件
│   │   ├── Breadcrumb // 面包屑
│   │   │   └── index.vue
│   │   ├── Dialog     // 公共弹窗存放
│   │   ├── HeaderNav  // 头部
│   │   │   ├── SelfInfo.vue
│   │   │   └── index.vue
│   │   ├── SideBar    // 侧边栏
│   │   │   ├── Logo.vue
│   │   │   ├── SideBarItem.vue
│   │   │   ├── index.vue
│   │   │   └── power.png
│   │   └── Tabs       // 标签
│   │       └── index.vue
│   ├── layout         // 整体布局模板存放
│   │   └── index.vue
│   ├── set-public-path.ts   // 微前端模式路径调整
│   ├── utils          // 工具部分
│   │   ├── env.ts     // 环境变量相关部分
│   │   ├── http       // 网络请求
│   │   │   ├── axios.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   └── views          // 页面
│       └── Home
│           ├── components
│           │   ├── Chart.vue
│           │   ├── DashTab.vue
│           │   └── UserInfo.vue
│           ├── imgs
│           │   └── avatar.jpg
│           └── index.vue
├── tests
│   ├── __mocks__
│   └── unit
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
