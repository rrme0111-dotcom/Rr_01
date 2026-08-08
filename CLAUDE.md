# CLAUDE.md — 🎡 粉色Q版转盘选择器

## 项目概述
一个运行在安卓手机上的 PWA 网页应用。多层同心转盘，粉色 Q 版可爱风格，用于随机决策（如玩烹饪发烧友时决定餐厅、关卡、升级等）。

---

## 📚 标准文档路径

| 文档 | 路径 | 用途 |
|------|------|------|
| 📋 需求文档 | [`docs/requirements.md`](docs/requirements.md) | 用户故事、功能清单、验收标准 |
| 🔧 技术规范 | [`docs/tech-specs.md`](docs/tech-specs.md) | 架构设计、数据模型、Canvas 算法、音效合成 |
| 🎨 设计规范 | [`docs/design-system.md`](docs/design-system.md) | 配色表、字体层级、圆角/阴影体系、动画参数、组件规范 |
| 📐 执行计划 | [`docs/execution-plan.md`](docs/execution-plan.md) | 分阶段开发步骤、检查点、当前进度 |

---

## 📝 开发者日志

每次开发会话结束后，在 [`dev-logs/`](dev-logs/) 下创建 `YYYY-MM-DD.md` 文件，记录：

```markdown
# 开发日志 — YYYY-MM-DD

## 今日完成
- [x] xxx

## 遇到的问题
- xxx → 解决方案：xxx

## 明日待办
- [ ] xxx

## 当前进度
阶段 X — 步骤 X.X — 完成百分比
```

---

## 🔄 工作流程

1. **开始工作前** → 查看 [`docs/execution-plan.md`](docs/execution-plan.md) 确认当前阶段和步骤
2. **写代码时** → UI 参照 [`docs/design-system.md`](docs/design-system.md)，数据参照 [`docs/tech-specs.md`](docs/tech-specs.md)
3. **完成一个检查点** → 在 [`docs/execution-plan.md`](docs/execution-plan.md) 中标记完成
4. **每次会话结束** → 更新当天的 [`dev-logs/YYYY-MM-DD.md`](dev-logs/)

---

## ⚠️ 约束

- **零依赖**: 纯 HTML + CSS + Vanilla JS，不使用任何 npm 包或 CDN 框架
- **单文件主应用**: `index.html` 包含所有页面逻辑（PWA 的 sw.js 和 manifest.json 独立）
- **移动端优先**: 主要针对 320-428px 宽度的手机竖屏
- **粉色 Q 版风格**: 所有 UI 必须符合设计规范中的配色和组件标准
- **GitHub Pages 部署**: 最终产物是静态文件，通过 GitHub Pages 提供服务

---

## 🗂️ 项目结构速览

```
e:\Rr-cooking\
├── index.html          # 主应用（HTML + CSS + JS）
├── sw.js              # Service Worker
├── manifest.json      # PWA 清单
├── CLAUDE.md          # 本文件
├── README.md          # 人类阅读说明
├── docs/              # 标准文档
│   ├── requirements.md
│   ├── tech-specs.md
│   ├── design-system.md
│   └── execution-plan.md
├── dev-logs/          # 开发日志
│   └── YYYY-MM-DD.md
└── assets/
    └── icons/
        ├── icon-192.png
        └── icon-512.png
```

---

*创建于: 2026-08-08 · 阶段 0*
