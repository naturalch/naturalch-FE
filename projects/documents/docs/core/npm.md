## 发布 scope 包

🪜 配置终端代理

```bash
export http_proxy=http://localhost:4780
export https_proxy=http://localhost:4780

unset http_proxy
unset https_proxy
```

类似一些 `@xxx/yyy` 类型的开源 npm 包，按正常发布流程会报错，需要注册 scope

- 进入 npm 账户
- 添加组织，组织名称不需要添加 @ 符号
- npm login 登录
- npm init --scope=xxx scope 包初始化
- npm publish --access=publish 发布公有项目

```json
"publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org"
}
```

```
registry=https://registry.npmjs.org
@naturalch-fe:registry=https://registry.npmjs.org
```
