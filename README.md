# 甜心转盘 SweetWheel

> 粉色 Q 版多层同心转盘 PWA —— 转一转，帮你做决定。

一个运行在**手机**上的转盘选择工具。核心场景是玩「烹饪发烧友」时，通过转动多层同心转盘来随机决定：玩哪个餐厅、玩几关、能不能升级、升级几次。纯 HTML + CSS + JavaScript 实现，零依赖，可离线使用。

线上地址：<https://rrme0111-dotcom.github.io/Rr_01/>

---

## 功能特性

- **多层同心转盘**：支持 2~6 个同心圈，所有圈同时旋转、同时停止，一根指针一次转出全部结果
- **3 种转盘样式**：草莓甜心 / 樱花物语 / 甜心蛋糕，每套独立配色
- **3 大界面主题**：甜心糖果（奶油马卡龙）/ 幻夜炫酷 / 简约素净，可在设置中切换
- **快速模板**：内置「烹饪发烧友」「今天吃什么」「周末安排」「随机挑战」等模板，一键填充
- **自定义模板**：可把当前配置存为自己的模板，随时复用、删除
- **自定义旋转时长**：0.5 ~ 30 秒自由调节
- **音效 + 庆祝**：Web Audio 合成的刻度音与完成音，Canvas 撒花粒子动画
- **结果弹窗**：停止后逐圈展示命中结果，支持「再转一次」
- **本地保存**：所有配置存于浏览器 localStorage，关闭后不丢失
- **离线可用**：PWA + Service Worker，添加到主屏幕后可离线打开
- **Android APK**：内置 WebView 壳工程 + GitHub Actions 自动打包

---

## 安装

### 方式一：PWA 安装（推荐，无需下载）

用手机浏览器（Chrome / Edge / Safari 等）打开应用地址，然后任选其一：

- **应用内按钮**：打开页面后，顶部会出现「点击安装」按钮，点一下即可
- **浏览器菜单**：右上角菜单 →「安装应用」或「添加到主屏幕」

安装完成后，手机桌面会出现「甜心转盘」图标，点击即以全屏 App 形式打开，且支持离线使用。

### 方式二：Android APK（适合想要独立 App 的用户）

1. 从仓库 Actions 页下载最新的 `SweetWheel-APK`（下载方式见下方「开发与部署 → 构建 Android APK」）
2. 把 APK 文件传到手机，点击安装
3. 若提示「未知来源」，在系统设置里允许该来源后继续安装

> 说明：APK 本质是 WebView 壳，运行时加载线上页面，功能和 PWA 完全一致。

---

## 使用说明

1. **新建转盘**：点击底部中间凸起的 `+` 按钮
2. **配置**：命名 → 设置圈数（2~6）→ 给每圈添加选项 → 选择样式 →（可选）加载模板 → 设置旋转时长
3. **保存**：点「保存转盘」自动进入旋转页
4. **旋转**：点「开始旋转」，等待停止后弹出结果
5. **管理**：首页长按卡片或点垃圾桶按钮可删除，点铅笔按钮可编辑

---

## 开发与部署

以下内容面向开发者，普通用户可跳过。

### 本地运行

项目自带了零依赖的 Node.js 静态服务器：

```bash
node server.js
```

然后访问：

- 电脑：<http://localhost:8088>
- 手机（与电脑同一 WiFi）：`http://<电脑局域网IP>:8088`

> 手机预览时建议开启浏览器的「设备模拟」或直接手机访问，体验最完整。也可以直接双击 `index.html` 打开，但 `file://` 协议下 PWA 安装和离线缓存不可用。

### 部署到 GitHub Pages

1. 将代码推送到 GitHub 仓库
2. 仓库 `Settings → Pages`，Source 选择 `master` 分支根目录
3. 稍等片刻即可通过 `https://<用户名>.github.io/<仓库名>/` 访问

> 应用内所有路径均使用**相对路径**，因此部署在子目录（如 `/Rr_01/`）下也能正常安装 PWA 和离线使用。

### 构建 Android APK

仓库已内置 GitHub Actions 工作流，`master` 分支每次 push 会自动构建 APK：

1. 进入仓库 **Actions** 页
2. 找到最新的 `Build Android APK` 运行
3. 下载 artifact `SweetWheel-APK`

也可以本地构建（需安装 JDK 17 + Android SDK）：

```bash
cd android
gradle assembleRelease
# 产物：android/app/build/outputs/apk/release/app-release.apk
```

---

## 技术栈

| 项 | 说明 |
|----|------|
| 前端 | 原生 HTML + CSS + Vanilla JS（**零依赖，无框架无 CDN**） |
| 绘制 | Canvas 2D（多层扇形 + requestAnimationFrame 动画） |
| 音效 | Web Audio API（振荡器实时合成） |
| 存储 | localStorage |
| 离线 | Service Worker（导航请求网络优先，静态资源缓存优先） |
| 部署 | GitHub Pages（静态托管） |

---

## 项目结构

```
.
├── index.html          # 主应用（HTML + CSS + JS 全部内联，单文件）
├── sw.js               # Service Worker（离线缓存）
├── manifest.json       # PWA 清单
├── server.js           # 本地开发服务器（零依赖）
├── generate-icons.js   # 图标生成脚本（Canvas 导出 PNG）
├── CLAUDE.md           # 开发协作说明
├── README.md           # 本文件
├── docs/               # 标准文档（需求/技术/设计/执行计划）
│   ├── requirements.md
│   ├── tech-specs.md
│   ├── design-system.md
│   └── execution-plan.md
├── dev-logs/           # 开发日志
├── assets/
│   └── icons/          # PWA 图标（192 / 512）
├── android/            # Android WebView 壳工程（TWA）
└── .github/
    └── workflows/      # GitHub Actions：自动构建 APK
```

---

## 设计风格

奶油马卡龙风：柔雾粉渐变背景、大圆角卡片、柔光阴影、迷你转盘缩略图、凸起式新建按钮。整体保持粉色 Q 版可爱基调。
