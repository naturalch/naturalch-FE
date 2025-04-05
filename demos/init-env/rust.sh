#!/bin/bash

if ! command -v brew &> /dev/null; then
    echo "homebrew 未安装，请先安装 homebrew 再运行此脚本"
    exit 1
fi

brew install rust
