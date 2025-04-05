#!/usr/bin/env sh

# 忽略错误
echo 'Setting script to exit on error...'
set -e

# 构建
echo 'Building the project...'
npm run build

# 进入待发布的目录
cd docs/.vitepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

echo 'Initializing a new Git repository...'
git init

echo 'Adding all files to the staging area...'
git add -A

echo 'Committing changes...'
git commit -m 'deploy'

# 如果部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master
echo 'Pushing to GitHub Pages...'
git push -f git@github.com:naturalch/naturalch.github.io.git main:main

# 如果是部署到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
echo 'Deployment completed successfully.'
cd - || { echo 'Failed to return to the previous directory.'; exit 1; }
