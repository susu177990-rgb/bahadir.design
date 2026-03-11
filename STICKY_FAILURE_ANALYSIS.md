# Sticky 效果失败原因分析

## 一、根本原因：父级 `transform` 破坏 `position: sticky`

**关键发现：** `dark-main-wrapper` 在滚动时会被 `ScaleParallaxDarkWrapper` 动态设置 `transform: scale(...)`。

```javascript
// page.tsx 第 1081、1099 行等
darkLayer.style.transform = `scale(${1 - progress * 0.05})`;
```

**CSS 规范：** 当父级元素有 `transform` 时，会创建新的 containing block，`position: sticky` 的子元素不再相对于视口 stick，而是相对于被 transform 的父容器，行为会异常。

**结论：** 服务卡片所在的 section 在 `dark-main-wrapper` 内部，该容器有 transform，所以 sticky 从一开始就处于「被破坏」的状态。

---

## 二、为什么「三张一起滑走」实现不了

### 方案 A：每张卡各自 sticky（当前方案）

- 每张卡的「创建矩形」(creation rectangle) 在文档流中位置不同
- 当父容器滚出视口时，01 的矩形先离开 → 01 先释放，02 再释放，03 最后释放
- 所以会出现 03 单独盖住 01、02 的情况，这是 CSS sticky 的固有行为

### 方案 B：单 sticky 容器包住三张卡

- 理论上可行：一个 sticky 容器 stick，滚出时整块一起离开
- 失败原因 1：父级 transform 让 sticky 行为异常
- 失败原因 2：为让卡片「滚入」，在顶部加了 80vh spacer，用户需滚过大量空白才能看到内容，体验像「卡住」或「坏了」
- 失败原因 3：spacer 在深色背景上，视觉上像空白页，用户可能误以为没加载完

---

## 三、可行的解决方向

### 方向 1：把 services section 移出带 transform 的容器

- 让服务区块不在 `dark-main-wrapper` 内，或
- 在服务区块可见时，暂时不对 `dark-main-wrapper` 应用 transform

### 方向 2：用 JavaScript 替代纯 CSS sticky

- 用 scroll 监听 + `position: fixed` 或 `transform` 模拟 stick 和「一起滑走」
- 不依赖 `position: sticky`，不受父级 transform 影响

### 方向 3：接受现状

- 保持当前每张卡各自 sticky
- 接受 03 会盖住 01、02 的视觉效果

---

## 四、总结

| 失败点 | 原因 |
|--------|------|
| 单 sticky 容器「直接不动」 | 父级 transform + 可能 stick 时机不对 |
| 单 sticky 容器「实现个屁」 | 同上，且 200vh spacer 体验差 |
| ServicesStack「什么东西」 | 80vh 空白 + 布局/层级可能有问题 |
| 无法「三张一起滑走」 | 每张卡各自 sticky 会分批释放；单容器方案又受 transform 影响 |

**核心问题：** `dark-main-wrapper` 的 `transform` 与 `position: sticky` 不兼容。

---

## 五、最终解决方案（已实施）

**将 services section 移出 dark-main-wrapper**，使其不再受 transform 影响：

- services 放在独立的 div 中，`background: var(--bg-dark)`，无 transform
- dark-main-wrapper 只包含 works、about
- 单 sticky 容器包住三张卡，父级 250vh，stick 后整块一起滑走
