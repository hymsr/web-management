# web-management

客户端：react + antd + mobx

服务端：koa

### 安装依赖

需要nodejs环境，版本建议12及以上。

```
npm i
```

### 启动

```
npm run build
npm start
```

打开 http://localhost:8000

### 开发模式

```
npm start
npm run dev
```

打开 http://localhost:3000

### 测试

单元测试：

```
npm run test
```

代码规范：

```
npm run lint
```

## 规范

### 项目结构

```
├── .code.yml
├── README.md
├── config
│   ├── .eslintrc.js
│   ├── base.js
│   ├── jest.config.js
│   ├── jest.setup.js
│   └── webpack.config.js
├── custom-build.sh
├── package-lock.json
├── package.json
├── script
│   ├── build.js
│   └── dev.js
├── server
│   ├── config.js
│   ├── index.js
│   └── route
│       └── index.js
├── src
│   ├── api
│   │   ├── index.ts
│   │   └── req.ts
│   ├── app.test.js
│   ├── app.tsx
│   ├── component
│   │   ├── index.ts
│   │   ├── layout
│   │   └── with-store
│   ├── declaration.d.ts
│   ├── def
│   │   ├── constant.ts
│   │   └── type.ts
│   ├── index.html
│   ├── index.less
│   ├── index.tsx
│   ├── page
│   │   ├── index
│   │   └── task
│   ├── router
│   │   └── index.tsx
│   ├── store
│   │   └── index.ts
│   ├── style
│   │   └── common.less
│   └── util
│       ├── history.ts
│       └── time.ts
└── tsconfig.json
```

### 代码规范

遵循[腾讯js代码规范](https://git.code.oa.com/standards/javascript)

### 组件规范

尼尔森十大可用性原则




