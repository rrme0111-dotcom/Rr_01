# 设计规范 — 粉色Q版转盘选择器

## 设计理念
**关键词**: 温暖 · 甜美 · 立体 · 可爱 · 沉浸

整体风格定位为"草莓奶油蛋糕上的转盘"——像甜点一样让人忍不住想咬一口。

---

## 🎨 配色方案

### 主色板（草莓甜心 - 默认）
| 色票 | 色值 | 用途 |
|------|------|------|
| 🟀 草莓粉 | `#FF8FA3` | 主按钮、标题、强调元素 |
| 🟀 奶油白 | `#FFF5F5` | 页面背景 |
| 🟀 浅粉 | `#FFD1DC` | 卡片背景、次要区域 |
| 🟀 深粉 | `#E87A8F` | 按钮按下态、文字强调 |
| 🟀 薄荷绿 | `#C8E6C9` | 点缀色（草莓叶子、小装饰） |
| 🟀 暖灰 | `#8D6E7F` | 次要文字 |

### 样式B（樱花物语）色板
| 色票 | 色值 | 用途 |
|------|------|------|
| 🟀 樱花粉 | `#FFB7C5` | 主色 |
| 🟀 淡粉 | `#FFD6E0` | 背景 |
| 🟀 淡紫 | `#E8D5F5` | 点缀 |
| 🟀 枝干棕 | `#C4959A` | 文字 |

### 样式C（甜心蛋糕）色板
| 色票 | 色值 | 用途 |
|------|------|------|
| 🟀 糖果粉 | `#FF9CB0` | 主色 |
| 🟀 奶油黄 | `#FFF3C4` | 高亮 |
| 🟀 薰衣草紫 | `#D5C6F0` | 点缀 |
| 🟀 巧克力棕 | `#B888A0` | 文字 |

---

## 🔤 字体体系

```css
:root {
  --font-family: system-ui, -apple-system, 'Segoe UI', 'PingFang SC',
                 'Microsoft YaHei', 'Hiragino Sans GB', sans-serif;

  --font-size-xs:   12px;   /* 辅助文字、标签 */
  --font-size-sm:   14px;   /* 正文 */
  --font-size-md:   16px;   /* 卡片标题 */
  --font-size-lg:   22px;   /* 页面标题 */
  --font-size-xl:   28px;   /* 大标题 / 结果展示 */
  --font-size-xxl:  36px;   /* 数字 / 强调 */

  --font-weight-normal:  400;
  --font-weight-medium:  600;
  --font-weight-bold:    700;
}
```

### 字体层级
| 层级 | 大小 | 粗细 | 场景 |
|------|------|------|------|
| H1 | 28px | 700 | 页面大标题 |
| H2 | 22px | 700 | 区块标题 |
| H3 | 16px | 600 | 卡片标题 |
| Body | 14px | 400 | 正文、选项文字 |
| Caption | 12px | 400 | 日期、辅助信息 |
| Result | 32px | 700 | 结果弹窗中的选项值 |

---

## 📐 间距与圆角

### 圆角体系
```css
--radius-xs:   8px;    /* 小标签、徽章 */
--radius-sm:   12px;   /* 输入框、小按钮 */
--radius-md:   16px;   /* 普通卡片 */
--radius-lg:   24px;   /* 大卡片、弹窗 */
--radius-xl:   50px;   /* 胶囊按钮 */
--radius-full: 50%;    /* 圆形元素 */
```

### 间距体系（8px 基准）
```css
--space-xs:   4px;
--space-sm:   8px;
--space-md:   16px;
--space-lg:   24px;
--space-xl:   32px;
--space-xxl:  48px;
```

---

## 🌑 阴影体系（立体感核心）

```css
/* 卡片阴影 - 粉色调 */
--shadow-card:    0 4px 20px rgba(255, 143, 163, 0.20);

/* 按钮阴影 */
--shadow-button:  0 6px 24px rgba(255, 143, 163, 0.35);

/* 按钮按下 */
--shadow-pressed: 0 2px 8px rgba(255, 143, 163, 0.30);

/* 弹窗阴影 */
--shadow-modal:   0 12px 48px rgba(0, 0, 0, 0.12),
                  0 0 0 9999px rgba(0, 0, 0, 0.35);

/* 转盘立体感 - 多层阴影 */
--shadow-wheel:   0 8px 32px rgba(255, 143, 163, 0.30),
                  0 2px 8px rgba(255, 143, 163, 0.15),
                  inset 0 0 40px rgba(255, 255, 255, 0.15);
```

---

## 🎬 动画规范

### 时长
| 动画 | 时长 | 缓动函数 |
|------|------|----------|
| 视图切换入场 | 300ms | `ease-out` |
| 卡片悬停上浮 | 200ms | `ease-out` |
| 按钮呼吸灯 | 2000ms | `ease-in-out` 循环 |
| 转盘旋转 | 4000-5000ms | `cubic-bezier(0.15, 0.80, 0.30, 0.98)` |
| 结果弹窗入场 | 400ms | `cubic-bezier(0.34, 1.56, 0.64, 1)` (弹性) |
| 结果逐行显示 | 200ms/行 (stagger) | `ease-out` |
| 庆祝粒子 | 1500ms | `ease-out` |

### 关键帧定义
```css
/* 入场滑入 */
@keyframes slideUp {
  from { transform: translateY(30px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}

/* 按钮呼吸 */
@keyframes breathe {
  0%, 100% { box-shadow: var(--shadow-button); }
  50%      { box-shadow: 0 6px 32px rgba(255, 143, 163, 0.50); }
}

/* 弹窗弹性缩放 */
@keyframes popIn {
  0%   { transform: scale(0.8); opacity: 0; }
  60%  { transform: scale(1.03); }
  100% { transform: scale(1); opacity: 1; }
}

/* 撒花下落 */
@keyframes confettiFall {
  0%   { transform: translateY(-100%) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
}
```

---

## 🧩 组件规范

### 按钮
```
┌──────────────────────────────┐
│      ✨  开始旋转！          │  ← 胶囊形，粉色背景，白色文字
└──────────────────────────────┘
  高度: 56px
  最小宽度: 200px
  圆角: 50px (胶囊形)
  阴影: var(--shadow-button)
  字体: 18px / 700
  按压: scale(0.96) + var(--shadow-pressed)
```

### 卡片
```
┌─────────────────────┐
│ 🍓 草莓甜心         │  ← 圆角大卡片
│                     │
│ 4圈 · 2026-08-08   │
└─────────────────────┘
  圆角: 24px
  内边距: 20px
  阴影: var(--shadow-card)
  背景: #FFFFFF (或 var(--浅粉))
```

### 输入框
```
┌─────────────────────────┐
│ 输入转盘名称...         │  ← 粉边框，圆角
└─────────────────────────┘
  高度: 48px
  圆角: 12px
  边框: 2px solid #FFD1DC
  聚焦: 边框变为 #FF8FA3 + 粉色外发光
```

### 转盘指针
```
     ▼
    ╱ ╲
   ╱   ╲
  ╱ 🎀 ╲     ← 固定在 12 点钟方向
 ╱       ╲
```

---

## 📱 响应式断点

| 断点 | 宽度 | 适配 |
|------|------|------|
| 手机竖屏 | 320-428px | 主要目标，单列布局 |
| 手机横屏 | 568-812px | 转盘缩小，按钮靠右 |
| 平板 | 768px+ | 双列布局，转盘更大 |

转盘 Canvas 尺寸：取 `min(屏幕宽度 - 40px, 屏幕高度 * 0.5)` 作为直径。

---

## 🌟 沉浸式细节

1. **背景渐变**: 从顶部 #FFF5F5 到底部 #FFD1DC 的柔和渐变
2. **装饰元素**: 页面角落浮动的小草莓/樱花/星星（CSS 动画）
3. **转盘光泽**: Canvas 绘制完成后叠加半透明径向渐变模拟反光
4. **触觉反馈**: 点击按钮时触发 `navigator.vibrate(15)`（安卓支持）
5. **全屏沉浸**: PWA standalone 模式，状态栏颜色匹配主题
