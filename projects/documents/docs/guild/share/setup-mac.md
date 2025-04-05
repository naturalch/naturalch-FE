# Mac OS 装机指南

之前一直使用的 windows，现在换到 mac，所以简单记录一下安装配置的过程，以便在更换电脑的时候，轻车熟路的进行配置。

## 软件安装

原生 APP 有的还是非常好用的：

- 输入法
- 备忘录
- 邮件
- 日历
- 地图
- 音乐
- 截屏
- 提醒事项
- 无边际
- Safari
- Pages 文稿
- Keynote 讲演
- Numbers 表格

mac 的文件系统和 windows 不同，没有盘符的区分，在安装软件的时候，可以直接在 App Store 中搜索安装，也可以下载镜像文件，然后将镜像文件拖到应用程序中进行安装（在安装一些镜像文件时有权限问题，可以到‘系统设置-隐私与安全性’中同意安装）。
要存放的文件，可以直接在访达中进行拖拽，也可以通过命令行进行操作。由于没有盘符的概念，所以文件可以在个人用户目录下创建相应分类的目录进行存放。

### 第三方软件

- iHost
  管理本地 host 的免费软件，可以轻松的对 host 文件进行编辑和分类，自由的切换分组。[Github](https://github.com/toolinbox/iHosts)

- 视频播放器
  开源播放器[iiNA](https://iina.io)，只专注于视频播放，没有其他附属功能。

- SCROLL REVERSER（鼠标反转）
  如果你不是使用妙控鼠标，而是第三方鼠标（罗技的话 options+ 也可以），那么滚轮的方向和触摸板的方向是不一致的，可以使用这款[软件](https://pilotmoon.com/scrollreverser/?_blank)颠倒一下鼠标滚轮方向。

- BetterDisplay
  一款专为 Mac 平台设计的专业级屏幕自定义调整工具，可自定义分辨率、XDR/HDR 额外亮度、虚拟屏幕、画中画、显示断开连接、显示和 EDID 覆盖等

- 腾讯柠檬清理
  要在官网下载完整版本，不要在 store 下载

- ice
  一款的菜单栏管理工具,主要功能是隐藏和显示菜单栏项目
- UPDF
- DeepL
- PixPin
- FastZip

- Notion
- DBeaver
- Apifox
- Sourecetree

## 系统设置

如果是苹果全家桶，强大的 iCloud 同步能力，在配置新电脑的时候只要登陆 Apple ID，所有数据都会同步过来（照片、备忘录、提醒、文档等等）。只需做一些简单设置，就可以进行日常使用。但如果是公司电脑建议不要开启同步。

## 开发环境

- [Git](https://git-scm.com/downloads) （配置 GitHub）
- [HomeBrew](https://brew.sh/zh-cn/) （安装开发软件很实用 如 brew install nginx）[墙内安装脚本](https://gitee.com/cunkai/HomebrewCN)
- [nvm](https://github.com/nvm-sh/nvm) 用于管理 node
- [node](https://nodejs.org/en/) 推荐直接使用 nvm 安装。
- [chrome](https://www.google.cn/chrome/index.html) 登陆谷歌账号可以同步所有书签和账号密码
- [vscode](https://code.visualstudio.com/) 登陆 github 账号可以同步所有偏好设置和插件
- [oh-my-zsh](https://ohmyz.sh/) (提供非常多的快捷命令：如 gst = git status) （没有 🪜 很难安装）
- 🪜 很多软件都是使用国外的，所以几乎是必须准备一个 🪜。mac 上推荐使用 [ShadowsocksX](https://github.com/shadowsocks/ShadowsocksX-NG)、[clashX](https://github.com/yichengchen/clashX)

1. 终端确认是`zsh`还是`bash`用户，输入命令`echo $SHELL`查看输出是‘bin/zsh’还是‘bin/bash’
2. 安装 HomeBrew

   Mac 基本安装了内置的 Git，如果没安装则手动安装下

   ```
   // 需要梯子
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/main/install.sh)"

   // 国内镜像
   /bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
   ```

   安装成功后，重新加载下配置文件`source /Users/xxx/.zprofile`

3. 安装 nvm `brew install nvm`
4. 加载 nvm 到 shell

   ```
   // 打开shell配置文件
   cd ~
   vim ~/zshrc
   // 如果是 bash 的话，执行 vim .bash_profile

   // 编辑文件，:wq 退出编辑
   export NVM_DIR=~/.nvm
   source $(brew --prefix nvm)/nvm.sh

   // 重新加载配置文件
   source ~/.zshrc

   // 确认nvm安装成功
   nvm -v
   ```

5. 安装 node

   ```
   nvm ls-remote
   nvm install xxx
   nvm use xxx
   ```

   最后确认所有环境是否安装成功，`git -v` `nvm -v` `node -v` `npm -v`

## vscode 插件

- Auto Close Tag
- Auto Import
- Auto Rename Tag
- Chinese Language Pack for Visual Studio Code
- Code Runner
- Code Spell Checker
- Color Info
- CSS Peek
- ESLint
- Git History
- GitLens
- GitHub Copilot
- HTML CSS Support
- Import Cost
- ES6 code snippets
- Less watch
- Local History
- JSON
- JSON to TS
- open in browser
- Partial Diff
- Path Intellisense
- Project Manager
- Stylelint
- Volar
- vscode-icons
- Vue VSCode Snippets
- VueHelper

#### 配置 ssh 密钥

1. 查看是否有 ssh 文件
   输入命令`$cd ~/.ssh`，或访达查看隐藏文件
2. 生成私钥和公钥，输入`ssh-keygen -t rsa -C "youremail@example.com"`
   会在.ssh 目录下生成 id_rsa、id_rsa.pub 文件，输入时默认回车即可
3. 查看获取到的公钥，输入`cat ~/.ssh/id_rsa.pub`
4. 复制这个公钥地址，添加到 github、gitlab, gitee 的 ssh 配置里面
5. 配置 ssh 连接 `ssh -T git@github.com` `ssh -T git@gitlab.com`
6. 验证一下 ssh 是否连接成功，输入`ssh git@github.com、git@gitee.com、git@gitlab.com`
