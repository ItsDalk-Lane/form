# 任务 3：理解 package.json 中的 Scripts

## 学习目标

1. 深入理解 `package.json` 中的 `scripts` 字段
2. 了解每个脚本命令的具体作用
3. 理解"开发模式"与"生产模式"的区别
4. 掌握 `npm install` 命令的用途

---

## 核心概念讲解

### 1. 什么是 Scripts？

**Scripts 是 npm 的"快捷指令集"。**

**通俗解释**：
- 就像游戏中的快捷键（按 F1 执行某个动作）
- Scripts 让你用简单的命令执行复杂的操作
- 避免记忆长长的命令行指令

**在 `package.json` 中**：

```json
{
  "scripts": {
    "dev": "node esbuild.config.mjs",
    "build": "tsc -noEmit -skipLibCheck && node esbuild.config.mjs production",
    "version": "node version-bump.mjs && git add manifest.json versions.json",
    "lint": "eslint . --ext .ts"
  }
}
```

### 2. 每个 Script 的作用详解

#### `npm run dev` - 开发模式

```bash
# 实际执行的命令
node esbuild.config.mjs
```

**作用**：
- 启动**开发模式（Development Mode）**
- **监听文件变化**：当你修改 `.ts` 文件时，自动重新编译
- **生成调试信息**：包含源代码映射，方便调试错误
- **不压缩代码**：保持代码可读性，方便排查问题

**使用场景**：
- 编写代码时
- 需要频繁测试修改时
- 需要调试错误时

#### `npm run build` - 生产模式

```bash
# 实际执行的命令
tsc -noEmit -skipLibCheck && node esbuild.config.mjs production
```

**作用**：
- 启动**生产模式（Production Mode）**
- **类型检查**：先检查 TypeScript 类型是否正确
- **压缩代码**：移除空格、注释，变量名变短
- **优化性能**：代码更小，运行更快
- **生成最终版本**：用于发布插件

**使用场景**：
- 准备发布插件前
- 提交代码到 Git 前
- 最终测试前

#### `npm run lint` - 代码检查

```bash
# 实际执行的命令
eslint . --ext .ts
```

**作用**：
- 检查代码是否符合规范
- 发现潜在的错误
- 统一代码风格

**使用场景**：
- 提交代码前
- 修复 bug 后
- 代码审查时

#### `npm version` - 版本管理

```bash
# 实际执行的命令
node version-bump.mjs && git add manifest.json versions.json
```

**作用**：
- 自动更新版本号
- 同步更新多个配置文件
- 准备发布新版本

### 3. 开发模式 vs 生产模式

| 特性 | 开发模式 (dev) | 生产模式 (build) |
|------|----------------|------------------|
| 文件监听 | 是（自动重新编译） | 否（只编译一次） |
| 代码压缩 | 否 | 是 |
| 调试信息 | 完整 | 最小化 |
| 类型检查 | 否 | 是 |
| 编译速度 | 快 | 较慢 |
| 使用场景 | 日常开发 | 发布前 |

**打个比方**：
- **开发模式** = 草稿纸（可以修改、有批注、方便修改）
- **生产模式** = 正式文档（整洁、精简、正式发布）

### 4. npm install 命令

#### 什么是 `npm install`？

这是最重要的 npm 命令之一，用于**安装项目依赖**。

#### 执行过程

1. 读取 `package.json` 中的 `dependencies` 和 `devDependencies`
2. 下载所有列出的包到 `node_modules` 文件夹
3. 创建/更新 `package-lock.json`（锁定版本）

#### 常用形式

```bash
# 安装 package.json 中所有依赖（最常用）
npm install
# 或简写
npm i

# 安装特定包（作为运行时依赖）
npm install obsidian

# 安装特定包（作为开发依赖）
npm install --save-dev typescript

# 全局安装（所有项目可用）
npm install -g nodemon
```

#### 为什么需要 `node_modules`？

- 存储所有第三方依赖包
- 项目运行必需的代码库
- 通常不提交到 Git（由 `.gitignore` 排除）
- 新成员加入项目时，运行 `npm install` 即可恢复

---

## 实践任务

### 任务 3.1：查看 package.json

1. 在 VS Code 中打开 `package.json`
2. 找到 `"scripts"` 字段
3. 记录所有可用的命令名称

### 任务 3.2：对比 dev 和 build

1. **先运行 dev 模式**：
   ```bash
   npm run dev
   ```
   - 观察终端输出
   - 在 VS Code 中打开 `main.js`，看看代码格式
   - 修改 `src/main.ts` 中的任意一行（如添加一个空格）
   - 观察终端是否自动重新编译
   - 按 `Ctrl + C` 停止 dev 模式

2. **再运行 build 模式**：
   ```bash
   npm run build
   ```
   - 观察终端输出（注意是否有类型检查）
   - 再次打开 `main.js`，对比代码格式（应该更紧凑）

3. **思考差异**：
   - 两种模式生成的 `main.js` 有什么不同？
   - 为什么会有这些差异？

### 任务 3.3：运行 lint

```bash
npm run lint
```

观察输出：
- 是否有错误或警告？
- 错误信息是什么意思？

### 任务 3.4：理解 npm install

1. **删除 node_modules**（仅在理解后操作）：
   ```bash
   # 在 Windows PowerShell
   Remove-Item -Recurse -Force node_modules

   # 或在 CMD
   rmdir /s /q node_modules
   ```

2. **重新安装依赖**：
   ```bash
   npm install
   ```

3. **观察**：
   - 终端显示了什么？
   - `node_modules` 文件夹是否恢复了？

### 任务 3.5：查看 package-lock.json

1. 在 VS Code 中打开 `package-lock.json`
2. 观察文件内容（非常大）
3. 思考：这个文件的作用是什么？

---

## 完成标准

- [ ] 能列出 `package.json` 中所有的 scripts 命令
- [ ] 能解释 `dev` 和 `build` 的区别
- [ ] 能说明什么时候使用 `dev`，什么时候使用 `build`
- [ ] 成功运行 `npm run lint` 并理解其作用
- [ ] 理解 `npm install` 的作用
- [ ] 能解释 `package-lock.json` 的用途

---

## 思考问题

请用自己的话回答：

1. 为什么开发模式和生产模式需要不同的配置？
2. `npm run dev` 和 `npm run build` 分别应该在什么时候使用？
3. 如果新同事加入项目，他需要执行什么命令来准备开发环境？
4. `package-lock.json` 的作用是什么？为什么需要它？

---

## 下一步

完成上述任务后，请：
1. 对比 `dev` 和 `build` 生成的 `main.js` 文件大小
2. 回答上述思考问题
3. 告诉我你的发现和答案

完成后，我们将进入任务 4！
