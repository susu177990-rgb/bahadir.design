# BAHADIR · 巴哈地尔 — Portfolio

> **AI 视觉工程专家 / 全栈开发者**  
> AIGC 创作者 · 工作流自动化 · 商业化 AI 视觉落地

🌐 **Live Site:** [bahadir.design](https://bahadir.design) *(部署后更新)*

---

## 👤 关于我

我是**巴哈地尔（Bahadir）**，专注于将生成式 AI 转化为标准化的工业级视觉管线。

- 已主导交付 **30+ 本**商业化 AI 儿童绘本
- 独立构建全自动 AI 绘本生成软件，效能提升 **20 倍**且不降质
- 1 周内完成 SaaS 平台从代码到上线，2 周营收 1000+
- 成功孵化虚拟数字人穿搭博主 IP，2 个月抖音涨粉 2W+
- 人物与场景一致性是我的交付底线

**技能栈：**
- **AI 生图：** SD · ComfyUI · Midjourney · Nano Banana · 角色/场景一致性
- **AI 视频：** See Dance · Sora · Veo
- **开发：** Next.js · TypeScript · Python · API 集成 · 自动化工作流
- **设计：** Figma · Adobe 套件 · 视觉管线设计

**联系我：**
- 微信：`SKYRE614`
- 抖音：[@去皮土豆oTATo](https://v.douyin.com/582fXEnE_Ew/)
- 小红书：[@去皮土豆oTATo](https://xhslink.com/m/7fpkuw5vgYe)

---

## 🗂️ 精选项目

| # | 项目 | 分类 | 亮点 |
|---|------|------|------|
| 01 | AI 儿童绘本（瑞光红枫） | 绘本与AI绘画 | 团队合作 30+ 本，独立完成 5 本，极致一致性 |
| 02 | 自动化AI绘本生成软件 | 产品与工具 | 端到端流水线，效能提升 20 倍 |
| 03 | otato.cn / otato.art | 产品与工具 | 1 周上线 SaaS，2 周营收 1000+ |
| 04 | 虚拟博主 去皮土豆oTATo | 产品与工具 | 2 个月抖音涨粉 2W，多个商业合作 |
| 05 | AI 视频 | AI视频 | 美团大赛参赛作品 + 抖音 AI 浪潮计划作品 + 原创 MV |

---

## 🛠️ 技术栈

| 层 | 技术 |
|---|------|
| 框架 | Next.js 15 (App Router) |
| 语言 | TypeScript |
| 样式 | Vanilla CSS + Tailwind CSS |
| 动画 | Intersection Observer API + CSS 过渡 |
| 图像优化 | `next/image`（自动 WebP 转换 + 按需 Lazy Load） |
| 视频优化 | 自定义 `LazyVideo` 组件（视口播放 + 悬停开声） |
| 部署 | Vercel / GitHub Pages |

---

## ✨ 页面功能亮点

- **极简编辑风排版**：大字号、不对称网格、杂志感留白
- **精选作品 — 左右分屏 Sticky 交互**：桌面端左侧文字随右侧滚动自动切换；移动端降级为顺序垂直列表
- **视频悬停开声**：浏览时默音，鼠标悬停自动开音量，离开恢复静音
- **图片 + 视频无缝瀑布流**：所有媒体连续排列，宽度统一，高度自适应
- **渐入动画（Reveal）**：基于 Intersection Observer 的标准滚动淡入
- **响应式**：全面移动端适配，含自定义 cursor 在移动端自动隐藏
- **联系表单**：填写后自动唤起邮件客户端发送，无需后端
- **微信一键复制**：点击"微信"字样复制微信号，带淡出"已复制 ✓"提示
- **备案号**：新ICP备2024016754号-3

---

## 🚀 本地运行

```bash
# 克隆项目
git clone https://github.com/susu177990-rgb/bahadir.design.git
cd bahadir.design

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看。

---

## 📁 项目结构

```
bahadir.design/
├── app/
│   ├── page.tsx          # 主页（Hero / Services / Works / About / Contact）
│   ├── globals.css       # 全局样式 + 移动端响应式
│   └── layout.tsx        # 根布局（字体 / SEO Meta）
├── components/
│   ├── Header.tsx        # 顶部导航
│   ├── CustomCursor.tsx  # 自定义鼠标
│   └── ...
├── data/
│   └── projects.ts       # 项目数据源（标题、描述、媒体路径）
├── public/
│   ├── image/            # 项目长图（JPEG）
│   ├── video/            # 项目视频（MP4）
│   └── resume.pdf        # 可下载简历
└── next.config.mjs       # Next.js 配置（图片 quality 白名单）
```

---

## 📄 License

MIT © 2026 Bahadir  
页面设计、作品内容版权归本人所有，代码逻辑可自由参考。
