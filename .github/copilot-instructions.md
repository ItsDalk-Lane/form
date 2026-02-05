# Obsidian Form 插件 - AI 编码指南

## 项目概览

这是一个 Obsidian 插件项目，使用 TypeScript 开发，采用模块化架构。插件 ID 为 `form`，用于创建简单的一键工作流。

## 架构模式

### 核心文件结构
```
src/
├── main.ts           # 插件入口（仅生命周期和注册）
├── settings.ts       # 设置接口 + FormSettingTab
├── commands/         # 所有命令实现
├── ui/modals/        # Modal 组件
└── utils/logger.ts   # 调试日志器（强制使用）
```

### main.ts 职责边界（严格遵守）
- **必须包含**：继承 `Plugin` 的主类、`onload()`/`onunload()` 生命周期方法
- **只做注册**：`addCommand`, `addRibbonIcon`, `addSettingTab` 等 API 调用
- **禁止**：在此文件编写业务逻辑，逻辑应分离到对应模块

### 命令注册模式
命令通过 `CommandManager` 类统一管理，参考 [commands/index.ts](../src/commands/index.ts)：
```typescript
// 在 CommandManager 中添加新命令
private registerNewCommand(): void {
  this.plugin.addCommand({
    id: 'command-id',
    name: 'Command name',
    callback: () => { /* 实现 */ }
  });
}
```

## 调试日志规范（强制）

**禁止直接使用 `console.log/warn/error`**。所有日志必须通过 `DebugLogger`：
```typescript
// 正确用法
this.logger.info('操作成功');
this.logger.debug('调试信息');
this.logger.warn('警告信息');
this.logger.error('错误信息');
```

日志输出受 `debugMode` 和 `debugLevel` 设置控制。

## 构建命令

| 命令 | 用途 |
|------|------|
| `npm run build` | 生产构建（必须用于验证） |
| `npm run dev` | 开发模式（watch） |
| `npm run lint` | ESLint 检查 |

**重要**：修改后使用 `npm run build` 验证，不要依赖 `npm run dev` 做最终验证。

## TypeScript 配置要点

- 启用严格空值检查 (`strictNullChecks`)
- 启用 `noImplicitAny`、`noImplicitThis`、`noImplicitReturns`
- 启用 `noUncheckedIndexedAccess`（数组/对象访问需要处理 undefined）

## 添加新功能的模式

### 新增设置项
1. 在 `FormPluginSettings` 接口添加属性（[settings.ts](../src/settings.ts)）
2. 在 `DEFAULT_SETTINGS` 提供默认值
3. 在 `FormSettingTab.display()` 添加 UI 控件

### 新增 Modal
在 `src/ui/modals/` 创建新文件，继承 `Modal` 类：
```typescript
import { App, Modal } from 'obsidian';

export class MyModal extends Modal {
  onOpen(): void { /* 渲染内容 */ }
  onClose(): void { this.contentEl.empty(); } // 清理防止内存泄漏
}
```

### 新增命令
在 `CommandManager` 中添加私有注册方法，并在 `registerAll()` 中调用。

## 外部依赖处理

esbuild 配置已将以下模块标记为 external：
- `obsidian`、`electron`
- 所有 `@codemirror/*` 和 `@lezer/*` 模块

这些模块由 Obsidian 运行时提供，无需打包。

## 代码风格

- 使用中文编写注释和 JSDoc
- 类和接口使用大驼峰命名
- 函数和变量使用小驼峰命名
- 单个文件不超过 500 行
