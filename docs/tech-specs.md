# 技术规范 — 粉色Q版转盘选择器

## 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| 结构 | HTML5 | 语义化标签，单文件 SPA |
| 样式 | CSS3 | 自定义属性(CSS Variables)、Grid/Flexbox、动画 |
| 逻辑 | Vanilla JavaScript (ES6+) | 无框架，无构建工具，零依赖 |
| 图形 | Canvas API | 转盘绘制与旋转动画 |
| 音频 | Web Audio API | 程序化合成音效（无外部音频文件） |
| 存储 | localStorage | 键值对存储转盘配置 JSON |
| 离线 | Service Worker | 缓存静态资源，支持离线访问 |
| 部署 | GitHub Pages | 静态文件托管，HTTPS 自带 |

---

## 系统架构

```
┌──────────────────────────────────────────┐
│                 index.html               │
│  ┌────────────────────────────────────┐  │
│  │           App Controller           │  │
│  │   (视图切换、事件路由、状态管理)     │  │
│  └────────────────────────────────────┘  │
│         │           │           │         │
│  ┌──────▼──┐ ┌─────▼────┐ ┌───▼───────┐ │
│  │ Home    │ │ Editor   │ │ Spinner   │ │
│  │ View    │ │ View     │ │ View      │ │
│  │(首页)   │ │(编辑页)  │ │(旋转页)   │ │
│  └─────────┘ └──────────┘ └───────────┘ │
│         │           │           │         │
│  ┌──────▼───────────▼───────────▼──────┐ │
│  │          Storage Layer             │ │
│  │    localStorage CRUD 操作          │ │
│  └────────────────────────────────────┘ │
│  ┌────────────────────────────────────┐ │
│  │       Canvas Engine                │ │
│  │   转盘绘制 + 旋转动画 + 音效       │ │
│  └────────────────────────────────────┘ │
└──────────────────────────────────────────┘
```

---

## 数据模型

### Wheel（转盘配置）
```js
{
  id:        String,    // 唯一标识，Date.now().toString(36)
  name:      String,    // 转盘名称，如"烹饪发烧友决策"
  style:     String,    // 样式ID: "strawberry" | "sakura" | "cake"
  rings:     Ring[],    // 圈数组，从外到内排列
  createdAt: String     // ISO 日期字符串
}
```

### Ring（圈）
```js
{
  name:    String,      // 圈名称，如"选择餐厅"
  color:   String,      // 该圈主色，hex 格式
  options: String[]     // 选项文字列表，如["🍣 寿司店", "🍔 汉堡店"]
}
```

### localStorage 存储格式
- **Key**: `"spinning-wheel-data"`
- **Value**: `{ wheels: Wheel[] }` 的 JSON 字符串
- **容量预估**: 每个转盘约 1-2KB，100 个转盘约 200KB，远低于 5MB 限制

---

## Canvas 绘制算法

### 坐标系统
- Canvas 中心为原点 (cx, cy)
- 0 弧度 = 3 点钟方向
- 旋转角度从 12 点钟方向（-π/2）开始偏移

### 多层绘制流程
```
1. 清空 Canvas
2. 应用旋转角度 (ctx.rotate(currentAngle))
3. 从外圈到内圈循环：
   a. 计算该圈内外半径 (根据圈序号和总圈数)
   b. 计算每个扇区的弧度 = 2π / options.length
   c. 逐个扇区：
      - ctx.beginPath() → arc() → lineTo() → fill()
      - ctx.save() → rotate() → fillText() → ctx.restore()
4. 绘制中心圆（装饰性）
5. 绘制圈间分隔线
```

### 关键公式
```js
// 圈半径分配
const totalRings = rings.length;
const usableRadius = maxRadius * 0.85; // 留边距
const ringWidth = usableRadius / totalRings;

// 第 i 圈（从外到内，i=0 是外圈）
const outerR = maxRadius - (i * ringWidth);
const innerR = outerR - ringWidth + gap;

// 扇区弧度
const sliceAngle = (2 * Math.PI) / options.length;

// 文字绘制角度（扇区中间）
const textAngle = startAngle + sliceAngle / 2;
```

---

## 旋转动画引擎

### 缓动函数（自定义三段式）
```js
function easeOutQuart(t) {
  // t: 0 → 1, 输出: 0 → 1
  return 1 - Math.pow(1 - t, 4);
}
```

### 动画循环
```js
function spin(duration, totalRotation) {
  const startTime = performance.now();
  const startAngle = currentAngle;

  function animate(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutQuart(progress);

    currentAngle = startAngle + totalRotation * easedProgress;

    drawWheel(currentAngle);

    // 触发刻度音效（每经过一个扇区边界）
    checkTickSound(currentAngle);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      onSpinComplete();
    }
  }

  requestAnimationFrame(animate);
}
```

### 旋转参数
- **总时长**: 随机 4000~5000ms
- **总旋转角度**: 随机 5~10 圈（1800°~3600°）+ 随机偏移
- **最终角度决定每圈命中哪个扇区**

---

## Web Audio API 音效合成

### 刻度音 (Tick)
```js
function playTick() {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.frequency.value = 800;  // Hz
  osc.type = 'sine';
  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

  osc.start();
  osc.stop(ctx.currentTime + 0.05);
}
```

### 完成音 (Fanfare)
```js
function playFanfare() {
  const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.value = freq;
    osc.type = 'triangle';
    const t = ctx.currentTime + i * 0.12;
    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);

    osc.start(t);
    osc.stop(t + 0.3);
  });
}
```

---

## 浏览器兼容性

| 特性 | Chrome | Firefox | Safari | Edge |
|------|--------|---------|--------|------|
| Canvas 2D | ✅ | ✅ | ✅ | ✅ |
| Web Audio | ✅ | ✅ | ✅ | ✅ |
| localStorage | ✅ | ✅ | ✅ | ✅ |
| Service Worker | ✅ | ✅ | ✅ | ✅ |
| CSS Variables | ✅ | ✅ | ✅ | ✅ |

目标：Android Chrome 90+（绝大部分安卓手机默认浏览器）
