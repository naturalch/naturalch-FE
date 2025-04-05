# Git 教程

## Git 文档

[官方文档](https://git-scm.com/docs)

## git branch

- git branch 查看本地分支
- git branch -r 查看远程分支
- git branch -a 查看本地&远程分支
- git branch -d xxx 删除本地分支
- git branch -r | grep main 查看远程的包含 main 的分支
- git branch | grep main | xargs git branch -D 批量删除本地分支
- git branch -a | grep -v -E 'master|develop' | xargs git branch -D // 只保留 master 等分支
- git branch -r | grep -v -E 'master|develop' | sed 's/origin\///g' | xargs -I {} git push origin :{}
- git branch -r | grep 'main' | xargs -I {} basename {} | xargs -I {} git push origin :{} // 批量删除远程分支
- git remote prune origin // 刷新一下分支列表

## git checkout

- git checkout xxx 切换到某个分支
- git checkout . 放弃本次修改
- git checkout -b xxx origin/xxx 创建一个和远程分支关联的分支
- git checkout -b xxx 创建一个新分支

## git merge

- git merge branchName 将 branchName 分支的更改合并到当前分支
- git merge --abort 取消上一次合并

## git clone

- git clone repositoryUrl 克隆远程仓库到当前目录
- git clone -b branchName repositoryUr 克隆指定分支

## git pull

- git pull origin branchName 将远程分支拉取到本地当前分支
- git pull origin branchName --force 强制将远程分支拉取到本地当前分支
- git pull --rebase origin branchName 将远程分支拉取到本地分支，并在本地分支上执行 rebase 操作

## git add

- git add . 将所有修改添加到暂存区
- git add fileName 将指定文件添加到暂存区

## git commit

- git commit -m "Commit message" 将提交暂存区的所有更改附带一条信息进行提交

## git remote

- git remote add origin repositoryUrl 关联远程仓库

## git push

- git push origin branchName 将本地分支推送到远程分支
- git push -u origin branchName 将本地分支推送到远程仓库，并将远程分支设置为相同名称
- git push -f origin branchName 强制推送到远程仓库，即使有冲突
- git push origin --delete branchName 删除远程分支

## git tag

- git tag -a tagName -m '标签的说明' // -a annotated
- git push origin tagName // 推送到远程

## git log

- git log --author=alan // 过滤作者名称
  --oneline // 每条记录只显示一行

## git stash

- git stash save {name}
- git stash list
- git stash pop
- git stash apply {index}
- git stash drop {index}

## git reset

- git reset --soft HEAD~1 撤销上一次的提交

## git cherry-pick

- git cherry-pick commitId1 commitId2 将其他分支的 commit 摘取过来

## .gitignore

- 以斜杠“/”开头表示目录
- 以星号“\*”通配多个字符
- 以问号“?”通配单个字符
- 以方括号“[]”包含单个字符的匹配列表
- 以叹号“!”表示不忽略(跟踪)匹配到的文件或目录
- git 对于 .ignore 配置文件是按行从上到下进行规则匹配的，意味着如果前面的规则匹配的范围更大，则后面的规则将不会生效
- 只能作用于 Untracked Files，也就是那些从来没有被 Git 记录过的文件（自添加以后，从未 add 及 commit 过的文件）

## review pr

如果是简单的功能我们可以直接通过 PR 地址进行 review，对于复杂一些的功能，我们应该在本地对功能进行验证。此时可以使用 Git 命令将当前 PR 拉到本地进行验证。

```
git fetch origin pull/{id}/head:{branchname}
```

- id: PR 的 id
- branchname: 你本地创建的新分支的名称

## Git 提交规范

良好的 Git 提交日志非常重要，最明显的一点是，它让整个 Git 提交历史的阅读变得非常轻松。
一眼看上去，就知道每个提交是做了什么，是加了新功能，还是修改了 bug，是维护了文档，还是调整了单元测试，都一目了然。
而且规范的 Git 提交历史，还可以直接生成项目发版的 CHANGELOG

每个提交的标题是强制的，又具有特殊格式，包括修改类型、影响范围和内容主题。
每个类型值都表示了不同的含义，类型值必须是以下的其中一个：

- feat：提交新功能
- fix：修复 bug
- docs：修改文档
- style：调整代码格式，未修改代码逻辑
- ui: 修改样式、布局
- refactor：代码重构，既没修复 bug 也没有添加新功能
- perf：性能优化，提高性能的代码更改
- test：添加或修改代码测试
- chore：对构建流程或辅助工具和依赖库（如文档生成等）的更改
- revert：回滚某个提交

标题是对提交的最直接最简明的说明，标题格式：`keyword[component-name/module-name]: commit content`

在提交的正文中对标题的内容进行补充，说明对提交的详细描述。正文中可以包含：

- 详细描述本次提交的变更范围
- 为什么提交这次变更，有相关的需求或 issue，可关联相应链接
- 有其他关联的 pr 可关联相应链接
- 对于界面样式或交互的修改，可附上截图
- 对于文档、测试例等关联的修改，可添加勾选项帮助确认同步修改

提交过程中建议合理利用 Gitlab 的标签功能，目前添加了部分，例如：'Do not merge'、'Bug'、'P0' 等

### 代码审查

执行代码审查的时机是在每次代码提交后，合并前进行。需要指定至少一位团队中其他同序进行审核。
一些常见的代码审查规范和最佳实践的建议

1. 代码一致性和风格

- 代码应符合团队统一的代码风格和规范。
- 遵循命名约定，使用有意义的变量和函数命名。
- 检查代码中的拼写错误和语法错误。

2. 代码结构和可读性

- 代码应具有良好的结构，易于阅读和理解。
- 函数和方法应具有适当的粒度，遵循单一职责原则。
- 避免过长的函数和方法，考虑进行拆分或重构。
- 使用适当的注释，解释代码的目的、意图和关键步骤。
- 避免不必要的注释，代码本身应该是自解释的。
- 删除不再使用的代码和注释。

3. 错误处理和异常处理

- 检查是否对可能发生的错误和异常进行了适当的处理。
- 避免捕获异常后不做任何处理的情况。

4. 提交信息

- 提交信息应严格按照格式，具有清晰的描述，准确地说明提交的变更内容。
- 必要情况下正文中详细说明此次提交的具体改动

5. 其他

- 代码审查人尽可能对代码进行审查，将发现的问题、疑惑点、建议或改进点，以评论或注释的形式指出或讨论。
- 开发人员对修改后的代码进行重新提交，并通知审查人员进行再次审查。这个过程可能会重复多次，直到审查人员确认代码符合要求并通过审查，才可以将代码合并到主干分支或发布分支中。

## Macos 上配置 SSH key

1. 检查是否已经有 ssh

```
ls -al ~/.ssh
```

如果已经有 SSH 可以看到类似 id_rsa 等文件

2. 如果没有 SSH key，可以执行以下命令生成

```
ssh-keygen -t rsa -b 4096 -C "<your_email>"
```

3. 添加 SSH 到 SSH Agent

```
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
```

4. 复制 SSH

```
pbcopy < ~/.ssh/id_rsa.pub
```

5. 添加 SSH 到 GitHub

在 GitHub 的个人设置页面，点击 SSH and GPG keys，然后点击 New SSH key，将刚才复制的 SSH key 粘贴进去，并命名。

6. 测试连接

```
ssh -T git@github.com
```

7. 如果同时使用多个平台，例如 GitHub 和 Gitlab，可以再为 gitlab 也添加 SSH key。

```
ssh-keygen -t rsa -C "your_email@example.com"
```

替换在 gitlab 上注册的邮箱地址，回车后会要求选择一个路径来保存新的密钥，这边定义一个区分 GitHub 的路径，例如：~/.ssh/id_rsa_gitlab。接下来要求输入一个密码短语，可以选择输入密码短语或直接按回车键跳过此步骤。最后生成的公钥和私钥会保存在 ~/.ssh/ 下面。

在使用 Git 时，可以根据需要选择使用哪个密钥。例如，可以使用 GitLab 的密钥来与 GitLab 进行通信，使用 GitHub 的密钥来与 GitHub 进行通信。
为了在不同的仓库中使用不同的密钥，您可以通过配置 ~/.ssh/config 文件来指定使用哪个密钥。例如：

```
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa_github

Host gitlab.com
  HostName gitlab.com
  User git
  IdentityFile ~/.ssh/id_rsa_gitlab
```

> 我使用的 git 版本管理工具是 Fork，可以 New SSH key 填写 key file name 和 emil 后生成一个新的 SSH key，然后将这个 key 复制到 GitHub 的 SSH key 里。

8. 配置提交记录信息

git 的提交记录的作者信息是从全局配置或者每个仓库的配置中获取的，可以配置一个全局用户信息，使用 Git 命令提交时，默认情况下会使用全局配置中的用户名和电子邮件地址：

```
git config --global user.name "naturalch"
git config --global user.email "your@email.com"
```

要在不同的 Git 托管平台上使用不同的用户名，可以使用 Git 的本地配置来覆盖全局配置，此时再提交 Git 时将使用该配置中的用户名和电子邮件地址：

```
git config user.name "naturalch"
git config user.email "your@email.com"
```
