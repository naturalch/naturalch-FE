#!/bin/bash

if ! command -v git &> /dev/null; then
    echo "git 未安装，请先安装 git 再运行此脚本"
    echo "在 mac 上，打开一个新的命令行，执行一次 git -v 会弹出安装提示，请按提示安装"
    exit 1
fi

if ! command -v nvm &> /dev/null; then
    echo "nvm 未安装，开始安装 nvm"

    # 设置要删除的文件夹路径
    nvm_path=~/.nvm
    install_nvm=y

    # 判断文件夹是否存在
    if [ -d $nvm_path ]; then
        echo "$nvm_path 文件夹存在，是否需要删除？[y/n]"
        read del_nvm_path

        if [ $del_nvm_path = y ]; then
            echo "删除目录 $nvm_path"
            rm -rf $nvm_path
        else
            echo "您选择忽略删除目录 $nvm_path ，跳过安装 nvm"
            install_nvm=n
        fi
    fi

    if [ $install_nvm = y ]; then
        # clone nvm 到指定位置
        git clone https://github.com/nvm-sh/nvm.git $nvm_path

        # 执行安装命令
        ~/.nvm/install.sh
    fi

    if [ -d $nvm_path ]; then
        echo "安装 nvm 成功"
    else
        echo "安装 nvm 失败"
        exit 1
    fi

    # 更新 bashrc
    bashrc_path=~/.bashrc
    if [ -f $bashrc_path ]; then
        content_bash=$(cat $bashrc_path)
    else
        content_bash=""
    fi
    if [[ "$content_bash" != *"NVM_DIR="* ]]; then
        content_bash+="# NVM\n"
        content_bash+="export NVM_DIR=~/.nvm\n"
        content_bash+="[ -s \"$NVM_DIR/nvm.sh\" ] && \. \"$NVM_DIR/nvm.sh\"  # This loads nvm\n"
        content_bash+="[ -s \"$NVM_DIR/bash_completion\" ] && \. \"$NVM_DIR/bash_completion\"  # This loads nvm bash_completion\n"
        echo $content_bash >> $bashrc_path
    else
        echo "$bashrc_path 环境变量已存在，跳过添加"
    fi

    # 更新 zshrc
    zshrc_path=~/.zshrc
    if [ -f $zshrc_path ]; then
        content_zsh=$(cat $zshrc_path)
    else
        content_zsh=""
    fi
    if [[ "$content_zsh" != *"NVM_DIR="* ]]; then
        content_zsh+="# NVM\n"
        content_zsh+="export NVM_DIR=~/.nvm\n"
        content_zsh+="[ -s \"$NVM_DIR/nvm.sh\" ] && \. \"$NVM_DIR/nvm.sh\"  # This loads nvm\n"
        content_zsh+="[ -s \"$NVM_DIR/bash_completion\" ] && \. \"$NVM_DIR/bash_completion\"  # This loads nvm bash_completion\n"
        echo $content_zsh >> $zshrc_path
    else
        echo "$zshrc_path 环境变量已存在，跳过添加"
    fi

    # 刷新环境
    source ~/.zshrc
fi

if ! command -v node &> /dev/null; then
    echo "node 未安装，开始安装 node"
    # 安装 node
    nvm install node
    # 刷新环境
    source ~/.zshrc
else
    echo "node 已安装，跳过安装"
fi

echo "环境安装完成"
