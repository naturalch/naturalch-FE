#!/bin/bash

pubkey_path=~/.ssh/id_rsa.pub
if [ -f $pubkey_path ]; then
    content_pubkey=$(cat $pubkey_path)
else
    # 设置 ssh 等信息
    read -p "请输入 SSH 密钥邮箱：" SSHEmail
    ssh-keygen -t rsa -C "$SSHEmail"
    echo "正在创建 SSH 密钥，请稍后..."
    sleep 2
    content_pubkey=$(cat $pubkey_path)
    echo "SSH 密钥创建成功"
fi

echo "您的公钥为："
echo ""
echo $content_pubkey
echo ""

read -p "请将公钥添加到 GitHub 账户后，按任意键继续"

# 验证 SSH 密钥
ssh -T git@github.com