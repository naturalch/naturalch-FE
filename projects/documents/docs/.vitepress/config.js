import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

export default withMermaid(
    defineConfig({
        title: 'naturalch', // 站点标题
        description: 'naturalch doc', // meta 标签描述
        themeConfig: {
            // 左上角 logo 和 title
            siteTitle: 'naturalch',
            logo: '/logo.png',
            // 社交链接
            socialLinks: [{ icon: "github", link: "https://github.com/naturalch", }],
            // 上方右侧导航
            nav: [
                { text: '文档', link: '/guild/', activeMatch: '^/guild/' },
                { text: '基建', link: '/core/', activeMatch: '^/core/' },
                // {
                //     text: 'Drop Menu',
                //     items: [
                //         { text: 'Item 1', link: '/guild/drop-menu/item-1' },
                //         { text: 'Item 2', link: '/guild/drop-menu/item-2' },
                //         {
                //             items: [
                //                 { text: "Item 11", link: "/guild/drop-menu/item-1" },
                //             ],
                //         },
                //         {
                //             items: [
                //                 { text: "Item 22", link: "/guild/drop-menu/item-2" },
                //             ],
                //         },
                //     ],
                // },
            ],
            // 侧边栏，包含 key 路径的才会出现侧边栏
            sidebar: {
                '/guild/': getGuildSidebar(),
                '/core/': getCoreSidebar(),
            },
            // 本地搜索，也可以使用 algolia 等插件
            search: {
                provider: 'local',
            },
            footer: {
                message: '',
                copyright: 'MIT Licensed | Copyright © 2025-present naturalch FE'
            },
        },
    })
)

function getGuildSidebar() {
    return [
        {
            text: '文档',
            items: [
                { text: 'Git', link: '/guild/git' },
                { text: 'VitePress', link: '/guild/vitepress' },
                { text: 'Mermaid', link: '/guild/mermaid' },
            ],
        },
        {
            text: '记录',
            items: [
                { text: '踩坑', link: '/guild/bug/index' },
                { text: '软连接', link: '/guild/share/symLink' },
            ],
        },
        {
            text: '分享',
            items: [
                { text: '设计模式之七大基本原则', link: '/guild/share/basic-principles' },
                { text: 'SVG', link: '/guild/share/svg' },
                { text: 'JSON Schema', link: '/guild/share/json-schema' },
                { text: 'Mac 装机', link: '/guild/share/setup-mac' },
                { text: 'Electron', link: '/guild/share/electron' },
            ],
        },
        {
            text: '组件',
            items: [
                { text: '虚拟列表', link: '/guild/components/virtual-list/index' },
            ],
        }
    ];
}

function getCoreSidebar() {
    return [
        {
            text: '开发规范',
            items: [
                { text: '前端开发规范', link: '/core/开发规范' },
                { text: 'ESLint工作流', link: '/core/eslint' },
            ],
        },
        {
            text: 'npm 相关',
            // collapsed: false, // 默认折叠展开
            items: [
              { text: 'nvm', link: '/core/nvm' },
              { text: 'npm workspace', link: '/core/npm-workspace' },
              { text: '踩坑', link: '/core/bug' }
            ],
        },
    ];
}
