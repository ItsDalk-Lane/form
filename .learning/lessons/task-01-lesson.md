# 任务 1：认识项目文件结构

## 学习目标

1. 理解什么是"文件夹"（目录）和"文件"
2. 了解项目的组织方式
3. 识别三个关键文件：`manifest.json`、`package.json`、`main.ts`
4. 理解不同类型文件的作用

---

## 核心概念讲解

### 1. 什么是文件夹和文件？

**文件夹（Folder/Directory）**
- 就像现实中的文件夹，用来组织和存放相关的东西
- 电脑里的文件夹可以包含其他文件夹（子文件夹）或文件
- 作用：让项目结构清晰，相关文件归类存放

**文件（File）**
- 存储信息的基本单位
- 每个文件都有名字和扩展名（如 `.json`、`.ts`、`.css`）
- 扩展名表示文件的类型和用途

### 2. 项目的基本结构

一个典型的 Obsidian 插件项目包含以下部分：

```
项目根目录/
├── .git/                  # Git 版本控制文件夹
├── .learning/             # 学习系统文件夹
├── node_modules/          # 依赖包文件夹（由 npm 生成）
├── src/                   # 源代码文件夹
│   ├── main.ts           # 插件入口文件
│   └── settings.ts       # 设置相关代码
├── manifest.json          # 插件说明书
├── package.json           # 项目配置清单
├── README.md              # 项目说明文档
├── styles.css             # 样式文件
├── tsconfig.json          # TypeScript 配置
└── esbuild.config.mjs     # 构建工具配置
```

### 3. 三种关键文件详解

#### manifest.json - 插件的"身份证"

这是 Obsidian 插件的元数据文件，告诉 Obsidian：
- 插件的唯一标识（id）
- 插件的显示名称（name）
- 版本号（version）
- 最低支持的 Obsidian 版本（minAppVersion）
- 插件描述（description）
- 作者信息（author）

**示例**：
```json
{
  "id": "form",
  "name": "Form",
  "version": "1.0.0",
  "minAppVersion": "1.8.0",
  "description": "Create simple, one-action workflows — with ease.",
  "author": "vran",
  "isDesktopOnly": false
}
```

#### package.json - 项目的"依赖清单"

这是 Node.js 项目的配置文件，包含：
- 项目名称、版本、描述
- 运行脚本（scripts）：如 `npm run build`
- 依赖包（dependencies）：项目运行需要的库
- 开发依赖（devDependencies）：开发时需要的工具

**关键字段解释**：
- `name`：项目名称
- `version`：项目版本
- `scripts`：可执行的命令
  - `dev`：开发模式（自动监听文件变化）
  - `build`：构建生产版本
  - `lint`：代码检查
- `dependencies`：运行时依赖（如 `obsidian` API）
- `devDependencies`：开发工具（如 TypeScript、esbuild）

#### main.ts - 插件的"入口"

这是插件的核心代码文件：
- `.ts` 表示 TypeScript 文件
- 包含插件的启动逻辑（`onload`）
- 包含插件的关闭逻辑（`onunload`）
- 定义插件的功能和行为

编译后会生成 `main.js`，这是实际运行的文件。

### 4. 文件类型分类

| 类型 | 扩展名 | 作用 |
|------|--------|------|
| 配置文件 | `.json` | 存储配置信息 |
| 源代码 | `.ts`, `.js` | 程序逻辑代码 |
| 样式文件 | `.css` | 定义界面样式 |
| 说明文档 | `.md` | Markdown 格式文档 |
| 构建配置 | `.mjs`, `.mts` | 构建工具配置 |

---

## 实践任务

请完成以下探索任务：

### 任务 1.1：浏览项目文件夹

1. 打开文件资源管理器，导航到项目根目录
2. 查看有哪些文件夹和文件
3. 双击进入 `src` 文件夹，看看里面有什么

### 任务 1.2：找到三个关键文件

1. 在项目根目录找到 `manifest.json`
2. 在项目根目录找到 `package.json`
3. 在 `src` 文件夹中找到 `main.ts`

### 任务 1.3：理解文件作用

1. 打开 `manifest.json`，看看插件的名称和版本是什么
2. 打开 `package.json`，看看有哪些脚本命令
3. 打开 `main.ts`，看看代码长什么样子（不用理解内容，先认识它）

### 任务 1.4：回答问题

请用自己的话回答：
1. 项目中有哪些主要文件夹？每个文件夹的作用是什么？
2. `manifest.json` 的作用是什么？
3. `package.json` 的作用是什么？
4. `main.ts` 的作用是什么？
5. 为什么项目需要不同的文件类型？

---

## 完成标准

- [ ] 能够说出项目根目录下的所有文件夹名称
- [ ] 能够说明 `.learning/`、`src/`、`node_modules/` 的作用
- [ ] 成功找到 `manifest.json`、`package.json`、`main.ts` 三个文件
- [ ] 能够解释三个关键文件各自的作用

---

## 下一步

完成上述任务后，请提交你的回答，我将审阅你的理解程度，然后我们可以进入任务 2。
