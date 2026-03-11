# 首页名字对齐问题 - 根因分析

## 现象

1. **小标题「AI 绘本 · 工具开发 · 视频」** 与 **名字「BAHADIR」「巴哈地尔」** 左边缘不对齐
2. **「巴哈地尔」** 相对 **「BAHADIR」** 有轻微上移感，基线不一致

---

## 根因

### 1. 字体回退（Font Fallback）导致不同字体混用

当前 `body` 的 `font-family` 为：
```
DM Sans, Inter, PingFang SC, Hiragino Sans GB, Microsoft YaHei
```

- **DM Sans**：仅支持拉丁字符，**不支持中文**
- 渲染 **「BAHADIR」** 时使用 **DM Sans**
- 渲染 **「巴哈地尔」** 时，浏览器回退到 **PingFang SC**（macOS）或 Hiragino / 微软雅黑

也就是说：**英文和中文实际用的是两套完全不同的字体**。

### 2. 不同字体的度量差异

| 属性 | DM Sans (拉丁) | PingFang SC (中文) |
|------|----------------|-------------------|
| 左边界 (left side bearing) | 不同 | 不同 |
| 基线 (baseline) | 拉丁基线 (alphabetic) | 表意基线 (ideographic) |
| 字身框 (em square) | 不同 | 不同 |

- **左边缘不对齐**：两种字体的左边界不同，首字「B」和「巴」的起始位置不一致
- **垂直上移感**：拉丁用 alphabetic 基线，中文用 ideographic 基线，混排时视觉上会错位

### 3. StaggeredText 的额外影响

- 每个字符被包在 `display: inline-block` 的 `<span>` 里
- 不同字体的 inline-block 在基线对齐、行高计算上会有细微差异
- 可能放大字体混用带来的错位感

---

## 解决方向

### 方案 A：统一字体（推荐）

使用**同时支持拉丁和中文**的字体，让英文和中文都用同一套字体：

- **Noto Sans SC**（思源黑体）
- **Source Han Sans**
- **PingFang SC**（仅 macOS，但可覆盖中英文）

这样左边界和基线都由同一套度量决定，对齐会稳定。

### 方案 B：用 CSS 做视觉补偿

- 用 `margin-left` / `transform` 微调中文名的水平位置
- 用 `line-height`、`vertical-align` 或 `padding` 微调垂直位置

缺点是依赖具体字号和视口，维护成本高，且不同设备上可能不一致。

### 方案 C：简化结构

- 去掉 StaggeredText，改为普通文本
- 减少 inline-block 带来的对齐干扰

可以减轻问题，但无法从根本上消除字体混用带来的差异。

---

## 建议

优先采用 **方案 A**：在 Hero 区域引入并统一使用支持中英文的字体（如 Noto Sans SC），再视情况微调间距和行高。
