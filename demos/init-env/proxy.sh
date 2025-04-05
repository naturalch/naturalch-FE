#!/bin/bash

read -p "是否开启代理？[y/n]" openProxy

bashrc_path=~/.bashrc
zshrc_path=~/.zshrc

function updateRCFile {
    # 更新 xshrc
    if [ -f $1 ]; then
        # 删除已有的代理信息 
        content_bash=$(cat "$1" | sed '/export http_proxy/d' | sed '/export https_proxy/d')
        # 删除连续的换行
        content_bash=$(echo "$content_bash" | awk 'BEGIN {RS=""; ORS="\n\n"} {gsub(/\n[[:space:]]*\n/, "\n\n")} 1')
    else
        $content_bash=
    fi
    echo "$content_bash" > "$1"

    # 检查最后一行是否为空行
    last_line=$(tail -n 1 "$1")
    if [[ -n "$last_line" ]]; then
        # 如果最后一行不为空行，则在末尾增加一个空行
        echo "" >> "$1"
    fi

    if [[ -n "$httpProxyServer" ]]; then
        echo "export http_proxy=$httpProxyServer" >> "$1"
    fi

    if [[ -n "$httpsProxyServer" ]]; then
        echo "export https_proxy=$httpsProxyServer" >> "$1"
    fi
}

if [ $openProxy = y ]; then
    echo "请输入 HTTP 代理服务器地，不开启不输入，例如 http://127.0.0.1:58591"
    read httpProxyServer

    echo "请输入 HTTPS 代理服务器地址，不开启不输入，例如 http://127.0.0.1:58591"
    read httpsProxyServer

    updateRCFile $bashrc_path
    updateRCFile $zshrc_path
else
    content_bash=$(cat "$bashrc_path" | sed 's/^export http_proxy/# export http_proxy/' | sed 's/^export https_proxy/# export https_proxy/')
    echo "$content_bash" > "$bashrc_path"

    content_zsh=$(cat "$zshrc_path" | sed 's/^export http_proxy/# export http_proxy/' | sed 's/^export https_proxy/# export https_proxy/')
    echo "$content_zsh" > "$zshrc_path"

    echo "关闭命令行代理成功"
    exit 0
fi

source $zshrc_path

echo 更新命令行代理成功
