# ESLint 工作流

## ESLint 教程

ESLint 是一个非常好的编程辅助工具，检测和修复代码中的问题，也规避了一些低端错误，一定程度上也能减少代码量，提升代码质量。

### 使用

1. 安装 ESLint

   ```bash
   npm install eslint --save-dev
   ```

2. 创建配置文件

   ```bash
   npx eslint --init
   ```

3. 编辑配置文件

   ```js
   module.exports = {
     root: true,
     env: {
       browser: true,
       commonjs: true,
       es2021: true,
       node: true,
     },
     extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:vue/vue3-recommended'],
     parser: 'vue-eslint-parser',
     parserOptions: {
       parser: '@typescript-eslint/parser',
       ecmaVersion: 'latest',
       sourceType: 'module',
       ecmaFeatures: {
         modules: true,
       },
     },
     plugins: ['@typescript-eslint', 'vue'],
     globals: {
       // 定义一些全局变量，这些变量在代码中使用但 eslint 环境未定义
     },
     rules: {
       // 自定义项目中得规则
     },
   };
   ```

4. 创建 eslint 脚本

   ```json
   {
     "scripts": {
       "lint": "eslint --ext .js,.ts,.vue"
     }
   }
   ```

5. 运行 eslint 脚本

   ```bash
   npm run lint
   ```

为了更好地在开发过程中检查或格式化代码，可以集成到编辑器中，并且使用例如 Prettier 插件来格式化代码。

## 规则定制

公共规范并不需要从头到位定制一份很长的 `rules`，需要的是一份`标准规范`，然后去遵守它。（定制规范不是核心业务，大可不必浪费时间）
所以公共配置的原则就是统一引入业界的标准规范，并根据实际情况做一些规则复写。

规则如下：

- 引入 ESLint 官方推荐的规则
- 引入 Vue 官方推荐的规则
- 引入 TS 官方推荐规则
- 维护一份少量的自有规则，以达到特殊目的规则

```js
module.exports = {
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    // 额外定制规则
  },
};
```

### 区分开发环境和正式环境的规则

ESLint 是为了提升编码规范，而不是影响效率和心情的。所以在开发环境中，规范应当相对宽松，在线上对应 `error` 的规则，在开发中只是 `warn`。不然会出现例如：声明了一个变量，但是没有使用，在调试时报错了‘你已声明，但未读取’，还得修改后才能正常调试，这非常影响开发体验。

- dev：在开发时给出 warn 提示，不影响代码正常变编译调试
- prod：对应标准的规范，保证代码严谨性

```js
const isProduction = process.env.NODE_ENV === 'production';
module.exports = {
  rules: {
    'vue/no-unused-components': isProduction ? 2 : 0,
  },
};
```

```json
{
  "lint-staged": {
    "packages/**/*.{js,vue,ts,tsx}": ["NODE_ENV=production eslint --fix --ext .js,.ts,.vue --ignore-path .eslintignore"]
  }
}
```

在提交代码前置验证时，设置 `NODE_ENV=production`，这样就会变成严格校验，把不符合规范的提交排除掉，避免代码推到线上后才发现错误，又得重新提交，增加 commit 记录，影响效率。

## 配置包

在 `@naturalch-fe/eslint-config` 中维护了统一的配置文件。
出于规范约束 & 配置的灵活性，公共配置中只包含 `extends` 和 `rules` 两个配置，其他 `parser` 、`plugins`等一律由具体项目自行配置。

### 安装

```bash
npm install @naturalch-fe/eslint-config --save-dev
```

需要的话在针对不同项目分别暴露独立的扩展配置，例如：onecode
如果使用 `vue` 这类非常规后缀的文件，也有一份针对 `vue3` 的独立扩展配置：

```js
module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
    'vue/setup-compiler-macros': true,
  },
  extends: ['plugin:vue/vue3-recommended', 'plugin:@typescript-eslint/recommended', './extend-onecode.js'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['vue', '@typescript-eslint'],
};
```

如果其他项目如果不想自己做这些繁琐的配置，可以直接完整引入：

```js
module.exports = {
  root: true,
  extends: ['@ninaba23-fe/eslint-config'],
};
```

## 配合 husky 和 lint-staged

在 ESLint 基础上，结合 husky + lint-staged 工具，可以在代码提交之前自动运行代码检查和格式化工具，确保提交的代码符合规范。

[husky](https://www.npmjs.com/package/husky) 是一个处理 Git hooks 的工具，对 git 执行的一些命令，通过对应的 hooks 钩子触发，执行自定义的脚本程序。比如在 commit 之前进行一次 Eslint 的校验。

[lint-staged](https://www.npmjs.com/package/lint-staged) 只找出 git add . 中暂存区的文件，只对过滤出的文件执行脚本，而不必每次 commit 都进行全量验证。

### 使用

1. 安装 husky 和 lint-staged

   ```bash
   npm install --save-dev husky lint-staged
   ```

2. 在 package.json 中添加 husky 相关配置

   在每次提交代码之前，lint-staged 会运行 ESLint 来检查代码是否符合规范，如果不符合，则会阻止提交。

   ```json
   {
     "husky": {
       "hooks": {
         "pre-commit": "lint-staged"
       }
     }
   }
   ```

   初始化 husky 配置，会在根目录生成 .husky 目录，里面有初始化配置 pre-commit 的脚本。

   ```bash
   npm husky-init
   ```

   也可以配置指令 `"prepare": "husky install"`，那么 husky 将在安装时自动运行，将在 `.git/hooks/pre-commit` 中创建一个软连接，指向 `.husky/pre-commit` 脚本，脚本中执行 `npx lint-staged`，也是在每次提交时执行检查。

   .husky/pre-commit

   ```sh
   #!/bin/sh
   . "$(dirname "$0")/_/husky.sh"
   npx lint-staged
   ```

3. 在 package.json 中添加 lint-staged 相关配置

   ```json
   {
     "lint-staged": {
       "packages/**/*.{js,vue,ts,tsx}": ["NODE_ENV=production eslint --fix --ext .js,.ts,.vue"]
     }
   }
   ```

husky 一般在终端上可以顺利运行，但使用 git 图形工具时，可能会遇到一些问题，可能需要一些额外配置，[详见](https://typicode.github.io/husky/#/?id=troubleshoot)。

还可以结合其他一些工具，请自行查阅：

- prettier：代码格式化工具
  代码风格管理，更好的代码风格效果
- editorconfig：文件代码规范
  保持多人开发一致编码样式
- commitlint：代码提交检测
  检测 git commit 内容是否符合定义的规范
- commitizen：代码提交内容标准化
  提示定义输入标准的 git commit 内容

## 结合 editorConfig

可以通过 ESLint 的配置文件来达到项目的`代码校验规则`统一的目的，但是编辑器 vscode 的配置是每个同学本地生效的，无法统一配置，于是需要引入 `EditorConfig` 配合 `vscode` 插件，确保每个成员在本地编辑器的格式一致，不会和 eslint 配置冲突。

- editorConfig 统一了编码规则
- eslintConfig 统一了校验规则

.editorconfig 配置示例：

```
root = true

[*]
indent_style = space
indent_size = 4
end_of_line = lf
charset = utf-8
trim_trailing _whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
```

确保编辑器使用的是 eslint 规则来格式化代码，.vscode/setting.json 配置示例：

```
{
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
}
```

基于以上原则，搭配 husky 等工具，就能在开发阶段拥有较为流畅的编码体验，在提交代码是也能及时发现问题，是一个比较这种的方案。
