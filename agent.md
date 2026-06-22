# bahadir.design Agent Brain

本文件是后续 AI / Codex 在 `bahadir.design` 项目内工作的项目大脑。任何设计、前端、内容、作品展示、动效、响应式相关修改，都必须先读取并遵守 `design.md`。

## 1. 最高优先级规则

1. 修改视觉、布局、组件、页面文案、媒体展示、动效前，必须先读 `design.md`。
2. 如果用户要求和 `design.md` 冲突，先指出冲突点，再按用户最新明确要求执行；执行后同步更新 `design.md` 或在最终回复说明规范待更新。
3. 不允许在没看现有代码的情况下凭空重写页面。
4. 不允许把站点改成模板化 SaaS 官网、普通简历页、AI 紫色渐变页或卡片堆叠页。
5. 所有完成声明必须有验证证据：至少 `git diff --check`，代码改动还应跑 `npm run lint`。

## 2. 项目定位

这是 Bahadir 的专业作品集网站，定位是：

- AI 视觉工程专家
- 全栈开发者
- AIGC 工作流自动化实践者
- 面向商业合作的高可信个人品牌

访问者应该快速理解：

- 他不是单纯使用 AI 工具，而是在构建工业级视觉生产管线。
- 作品包括 AI 绘本、AI 摄影 / SaaS 工具、虚拟博主 IP、AI 视频。
- 他的价值是把非标准化创作变成可复用、可扩展、可交付的系统。

## 3. 必读文件顺序

开始任何实质修改前，按任务类型读取：

### 设计 / UI / 页面改动

1. `design.md`
2. `app/globals.css`
3. `app/page.tsx`
4. 相关组件：`components/*.tsx`
5. 相关数据：`data/projects.ts`

### 项目内容 / 作品信息改动

1. `design.md`
2. `data/projects.ts`
3. `README.md`
4. 涉及展示的页面或组件

### 构建 / 质量 / 部署改动

1. `package.json`
2. `next.config.mjs`
3. `eslint.config.mjs`
4. `app/layout.tsx`

## 4. 设计执行原则

### 必须保持

- 浅色 Hero + 深色主体 + 浅色联系区的主节奏。
- 大字号、强秩序、少装饰的编辑风。
- 黑白 / 暖灰高对比色彩系统。
- 不对称栅格、充足留白、低对比分割线。
- 真实作品媒体优先，避免占位图长期存在。
- 动效服务于浏览节奏，不做炫技堆叠。

### 优先使用

- `design.md` 中定义的色彩 token。
- 已有 `Reveal`、`StaggeredText`、`LazyVideo`、sticky 结构等本地模式。
- `data/projects.ts` 作为项目事实来源。
- `clamp()` 做响应式字号。
- `transform` 和 `opacity` 做动画。

### 避免新增

- 新依赖，除非用户明确要求。
- 大面积彩色品牌系统。
- 复杂图标体系。
- 玻璃拟态、发光球、装饰性渐变。
- 嵌套卡片、营销式 hero、普通三栏功能卡。
- 与当前首页编辑风不一致的通用模板组件。

## 5. 代码工作方式

### 修改前

- 先看当前实现和相关文件。
- 明确这是小改、标准改动还是结构性改动。
- 对设计相关任务，先对照 `design.md` 判断会影响哪些规范。

### 修改时

- 保持 diff 小而集中。
- 优先修共享源头：`design.md`、`app/globals.css`、数据源、通用组件。
- 不要顺手重构无关文件。
- 不要覆盖用户已有改动。
- 新增样式如果重复 3 次以上，考虑抽成 class 或局部常量。
- 项目事实不要硬编码在展示组件里，放到 `data/projects.ts`。

### 修改后

必须检查：

- 没有横向溢出风险。
- 移动端有合理降级。
- 文字不遮挡、不溢出、不因为 hover 造成布局跳动。
- 颜色、字号、动效符合 `design.md`。
- 真实媒体展示没有被弱化成模糊氛围图。

## 6. 验证标准

### 文档改动

至少运行：

```bash
git diff --check
```

### 代码 / 样式改动

至少运行：

```bash
npm run lint
git diff --check
```

### 视觉改动

除 lint 外，尽量做浏览器验证：

- 桌面端：`http://localhost:3000/`
- 移动端：窄屏视口检查
- 检查首屏、服务、作品、关于、联系区
- 检查 hover、scroll、视频播放、表单 focus

如果无法运行某项验证，最终回复必须明确说明。

## 7. 当前代码结构认知

主要文件：

- `app/page.tsx`：首页主实现，包含 Hero、Services、Works、About、Contact。
- `app/globals.css`：全局 token、基础样式、移动端响应式修正。
- `app/layout.tsx`：字体、SEO metadata、根布局。
- `data/projects.ts`：项目数据源。
- `components/Header.tsx`：顶部导航。
- `components/CustomCursor.tsx`：桌面自定义 cursor。
- `components/MenuOverlay.tsx`：菜单 overlay，目前不是首页主流程核心。
- `components/ProjectCard.tsx`、`Footer.tsx`、`SkillTag.tsx`：早期通用组件，风格和当前首页不完全统一。

## 8. 当前设计债处理顺序

后续如果用户要求“优化设计”“统一风格”“清理页面”，优先级如下：

1. 把散落的 hex 色值逐步收敛到 `:root` token。
2. 统一早期组件 `ProjectCard.tsx`、`Footer.tsx`、`SkillTag.tsx` 与当前编辑风。
3. 替换 `data/projects.ts` 中 AI 视频占位缩略图。
4. 统一 `MenuOverlay.tsx` 的导航语言和联系信息。
5. 为动画补充 `prefers-reduced-motion` 降级。
6. 把重复的区块标题、intro row、按钮样式提取为可复用模式。

## 9. 内容口吻

中文为主，英文只用于品牌、技术名、工具名和节奏标签。

推荐表达：

- “把 AI 视觉生产做成流水线”
- “从单次创作到可复用系统”
- “工业级视觉管线”
- “角色 / 场景一致性”
- “自动化、批量生成、可交付”

避免表达：

- 空泛的“赋能未来”
- 过度营销的“颠覆行业”
- 不可验证的“全球领先”
- 低可信的“全自动躺赚”
- 与作品无关的 AI 热词堆砌

## 10. 最终回复格式

完成任务时，简短说明：

- 改了什么文件。
- 为什么这样改。
- 跑了什么验证。
- 有哪些未验证或剩余风险。

不要长篇复述过程。用户需要的是结果和证据。

