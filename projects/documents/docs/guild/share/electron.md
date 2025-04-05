## Electron 基础

1. 主进程 Main Process

   每个 Electron 应用都有一个单一的主进程，作为应用程序的入口。
   主进程在 Node.js 环境中运行，具有 require 模块和使用所有 Node.js API 的能力

   1. 窗口管理
   2. 应用程序生命周期
   3. 原生 API

2. 渲染器进程 Renderer Process

   每个 Electron 应用都会为每个打开的 BrowserWindow 生成一个单独的渲染渲染进程，负责渲染网页内容。
   渲染器无权直接访问 require 或其他 Node.js API

3. 预加载脚本

   Electron 的主进程时一个拥有完全操作系统访问权限的 Node.js 环境。渲染器进程默认跑在网页页面上，并非在 Node.js 里。为了将 Electron 的不同类型的进程桥接在一起，需要使用**预加载**的特殊脚本。
   预加载脚本时沙盒化的，只拥有一部分的有限的 API 访问权。预加载脚本在渲染器加载网页前注入，就可以提前注入一些渲染器进程访问不到的数据。
   webPreferences.preload

4. 进程通信

   Electron 的主进程和渲染器进程的分工不可互换，无论是从渲染器进程直接访问 Node.js 接口，还是从主进程访问 HTML DOM 都是不可能的。
   进程间通信（IPC），可以使用 Electron 中的 ipcMain 和 ipcRenderer 模块来进行进程间的通信。

   1. 单向通信，从渲染器进程到主进程
      使用 ipcRenderer.send API 发送消息，使用 ipcMain.on API 接收
      contextBridge.exposeInMainWorld()、BrowserWindow.fromWebContents(event.sender)
   2. 双向通信，从渲染器进程到主进程，再从主进程到渲染器进程
      使用 ipcRenderer.invoke 进行发送 - 使用 ipcMain.handle 进行响应(第二个参数返回异步)
   3. 单向通信，从主进程到渲染器进程
      使用 win.webContents.send 进行发送，使用 ipcRenderer.on 接收

5. nodeIntegration

   沙盒化应用于主进程以外的大多数进程，包括渲染器进程、功能性进程等，意味着其他进程要使用权限受限的操作只能通过 IPC 通信到主进程这种方式。
   nodeIntegration: true 允许其他进程使用 node 特性

6. remote 模块

   @electron/remote 模块提供一个桥梁，可以在渲染进程中直接使用主进程中的属性和方法。
   使用：在主进程中进行初始化 - win 上激活

7. Electron Forge 工具

## 框架搭建

1. Electron Forge 创建项目

   npm init electron-app@latest my-app -- --template=vite-typescript
   Electron forge 命令创建项目时 electron 等一些依赖包安装失败，可能是脚手架内部使用的 npm 地址和淘宝镜像地址不同导致其内部使用 yarn install 下载失败，可尝试取消 .npmrc 中淘宝镜像配置或创建失败后手动在 package.json 中添加上下载失败的依赖包后重新下载

2. 添加 Vue3 支持

   1. 根据 Electron Forge 文档，安装 vue 和 @vitejs/plugin-vue 依赖
   2. vite.renderer.config.ts 中添加 @vitejs/plugin-vue 插件，让 vite 支持编译 vue 文件
   3. src/renderer.ts 渲染进程入口文件中引入 vue 并创建 vue 实例
   4. 创建 src/App.vue 文件，并写入测试模板
   5. index.html 文件修改为挂在 vue 实例的容器

3. 添加 Tailwind CSS 支持

   1. 安装依赖：npm install -D tailwindcss postcss autoprefixer
   2. 初始配置：npx tailwindcss init -p
   3. 后续根据官方文档或自定义配置即可，建议安装 vscode 插件 Tailwind CSS IntelliSense

4. 添加 Iconify 图标

   1. npm install --save-dev @iconify/vue
   2. 具体使用方式参考官方文档

5. 支持 Radix Vue 组件库

   1. 核心理念：专注构建无侵入性 UI 组件的库，尽可能减少对应用层样式和布局的干扰，提供高度可访问性和灵活性的 UI 组件。
   2. 安装依赖：npm add radix-vue

   \*注意：使用其他 UI 库，自行配置

6. 集成 Vue Router、IndexedDB、Pinia、unplugin-auto-import、ESLint、mockjs 等
