# Form 插件 - 项目开发规范

> 本文件定义 Form 插件项目的专属开发规则。
> 通用编码原则（SOLID/DRY/KISS/YAGNI、命名约定、JSDoc 格式、异常处理标准等）
> 已在全局 CLAUDE.md 中定义，本处不重复，仅强化项目层面的关键约束。

⚠️ **本文件需随项目保持同步**：每次项目文件发生变动（新增/删除模块、调整依赖关系、修改构建配置等），本 CLAUDE.md 中相关内容必须同步更新，保持与实际项目结构一致。

---

## 1. 项目概述

| 项目 | 内容 |
| --- | --- |
| 插件名称 | Form |
| 插件 ID | form |
| 最低 Obsidian 版本 | 1.8.0 |
| 技术栈 | TypeScript 5.8+, esbuild, ESLint, Obsidian API |
| 包管理器 | npm（锁定 package-lock.json） |
| 入口文件 | src/main.ts → 编译输出 main.js |

---

## 2. 项目架构

```
src/
├── main.ts              # 插件入口：仅做生命周期管理和 API 注册
├── settings.ts          # 设置接口定义和设置标签页
├── commands/
│   └── index.ts         # 命令管理器，注册和绑定所有命令
├── ui/
│   └── modals/
│       └── form-modal.ts # 表单模态框组件
└── utils/
    └── logger.ts        # 调试日志器，所有日志输出的唯一入口
```

### 各模块职责

| 模块 | 单一职责 | 对外暴露 |
| --- | --- | --- |
| main.ts | 插件生命周期、注册所有 Obsidian API | FormPlugin 类（默认导出） |
| settings.ts | 设置接口定义、默认值、设置 UI | FormPluginSettings、DEFAULT_SETTINGS、FormSettingTab |
| commands/index.ts | 命令注册与绑定 | CommandManager 类 |
| ui/modals/form-modal.ts | 模态框 UI 组件 | FormModal 类 |
| utils/logger.ts | 调试日志输出控制 | DebugLogger 类、LogLevel 类型、DebugSettings 接口 |

### 依赖流向

```
main.ts (FormPlugin)
  ├── → settings.ts（加载/保存设置）
  ├── → utils/logger.ts（初始化 DebugLogger，传入 settings）
  └── → commands/index.ts（传入 plugin 和 logger，依赖注入）
            └── → ui/modals/form-modal.ts（在命令回调中实例化）
```

新增模块应在此依赖图中找到合理位置，避免引入循环依赖。

---

## 3. 构建与验证命令

```bash
# 构建插件（必须使用此命令验证修改）
npm run build          # tsc 类型检查 + esbuild 打包 → 输出 main.js

# 代码检查
npm run lint           # ESLint 静态分析（含 eslint-plugin-obsidianmd）

# 版本发布
npm run version        # 自动递增版本号，更新 manifest.json 和 versions.json
```

🚫 **严格禁止使用 `npm run dev`**。dev 模式仅启动 esbuild watch，无法等价于生产构建的完整类型校验，不能用于验证修改效果。所有代码修改后必须通过 `npm run build` 确认无编译错误。

---

## 4. Obsidian 插件开发约束

### 4.1 禁止事项

| 编号 | 禁止内容 | 原因 |
| --- | --- | --- |
| P1 | 使用 `npm run dev` 验证 | 无法替代生产构建的完整校验 |
| P2 | 在 main.ts 中编写业务逻辑 | main.ts 仅做注册和生命周期管理 |
| P3 | 直接操作 DOM（如 `document.querySelector`） | 必须使用 Obsidian API（Modal.contentEl、Setting 等） |
| P4 | 裸 `console.log/warn/error` 输出 | 所有日志必须经过 DebugLogger，受 debugMode 开关控制 |
| P5 | 访问 Obsidian 私有属性（未在官方 API 声明中的属性） | 私有 API 随版本易断裂 |
| P6 | 添加浏览器测试代码 | 插件依赖真实 Obsidian 环境运行 |
| P7 | 手动配置 sourcemap | esbuild.config.mjs 已自动管理 |
| P8 | 在一个文件中混合多种职责 | 违反单一职责原则 |

### 4.2 必须遵守

- **依赖注入**：模块间依赖通过构造函数参数传递（参考 CommandManager 构造函数签名），禁止全局变量存储插件实例。
- **异步错误处理**：所有 async 函数调用点必须包含 `try/catch`，用户可见的失败情况使用 `new Notice()` 通知。
- **onload() 保持轻量**：不在 `onload()` 中执行耗时同步操作，应转为异步或延迟执行。
- **资源清理**：事件监听器优先使用 `this.registerDomEvent()` 和 `this.registerEvent()`（插件卸载时自动清理）；自定义定时器必须在 `onunload()` 中手动清除。
- **设置变更同步**：修改 settings 对象后必须调用 `await this.saveSettings()`，并更新依赖此设置的组件（参考 settings.ts 中 DebugLogger 的 `updateSettings` 调用模式）。

---

## 5. 编码规范强化（项目层面）

### 5.1 缩进与格式

- 源代码（`src/` 下所有 `.ts` 文件）使用 **2 空格缩进**。
- ⚠️ 当前 `.editorconfig` 中 `indent_style = tab` 与上述规范冲突，编写代码时**以 2 空格为准**。

### 5.2 参考标范文件

编写新代码时，以下文件作为风格和结构的参考基准：

| 参考场景 | 参考文件 |
| --- | --- |
| 日志输出和接口定义 | `src/utils/logger.ts` |
| 命令注册和依赖注入模式 | `src/commands/index.ts` |
| 模态框组件生命周期管理 | `src/ui/modals/form-modal.ts` |
| 设置接口的扩展方式 | `src/settings.ts` |

### 5.3 类型与注解要求

- 所有 class 方法必须标注显式返回类型（含 `void`）。
- 新增接口或类型优先放在与其使用场景最密切的文件中；通用类型放在 `utils/` 下。
- 扩展设置时，新增字段必须同步更新 `DEFAULT_SETTINGS` 常量。

### 5.4 新增模块的规范路径

| 功能类型 | 应放在 | 示例 |
| --- | --- | --- |
| 新增命令 | `src/commands/` | 在 CommandManager 中新增注册方法 |
| 新增弹窗/视图 | `src/ui/modals/` 或 `src/ui/views/` | 继承 Modal 或 ItemView |
| 新增业务逻辑 | `src/services/` | 数据处理、文件操作等 |
| 新增工具函数 | `src/utils/` | 通用、无业务耦合的纯函数 |

---

## 6. 受保护文件

以下文件不应随意修改或删除，变更需明确理由：

- `manifest.json` — 插件元数据，仅通过 `npm run version` 更新版本号
- `main.js` — 编译产物，由 `npm run build` 生成，不手动编辑
- `styles.css` — 插件样式，修改需审查视觉影响
- `package.json` / `package-lock.json` — 依赖管理，新增依赖需评估必要性
- `esbuild.config.mjs` — 构建配置，修改需充分测试构建流程
- `tsconfig.json` — TypeScript 配置，严格模式选项不应放宽

---

## 7. 开发检查清单

每次代码修改完成后，对照以下清单确认（项目专属检查点）：

- [ ] `npm run build` 编译无错误
- [ ] `npm run lint` 检查无报警
- [ ] 所有日志输出均经过 DebugLogger，无裸 console 调用
- [ ] main.ts 仅包含注册和生命周期逻辑，无业务代码
- [ ] 新增模块已按规定放入正确目录，并接入依赖图
- [ ] 异步操作包含 try/catch，用户可见失败用 Notice 提示
- [ ] 事件监听器使用 registerDomEvent/registerEvent，或在 onunload 中清理
- [ ] 未访问任何 Obsidian 私有属性
- [ ] 新增 class 方法均标注显式返回类型
- [ ] 设置字段变更已同步更新 DEFAULT_SETTINGS
- [ ] 项目结构或依赖关系有变动时，本 CLAUDE.md 已同步更新
