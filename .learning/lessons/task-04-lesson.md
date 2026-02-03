# 任务 4：TypeScript 基础入门

## 学习目标

1. 理解 TypeScript 是什么以及为什么需要它
2. 了解 TypeScript 相比 JavaScript 的优势
3. 认识 `tsconfig.json` 配置文件
4. 理解基本的类型注解概念

---

## 核心概念讲解

### 1. 什么是 TypeScript？

**TypeScript 是 JavaScript 的超集，添加了类型系统。**

**通俗解释**：
- JavaScript 是"动态类型"语言：变量类型在运行时才确定
- TypeScript 是"静态类型"语言：变量类型在编写代码时就确定
- TypeScript 最终会被编译成 JavaScript 运行

**打个比方**：
- JavaScript = 普通便签纸（写什么都可以，没有格式限制）
- TypeScript = 表格表单（每个格子有指定格式，填写前就知道规则）

### 2. 为什么需要 TypeScript？

#### JavaScript 的问题

```javascript
// JavaScript 示例
function add(a, b) {
  return a + b;
}

add(1, 2);        // 3 ✓
add("1", "2");    // "12" ✗ 意外结果！
add(1, "2");      // "12" ✗ 类型混用！
```

**问题**：
- 运行前不知道会出错
- 类型错误在运行时才暴露
- 大型项目难以维护

#### TypeScript 的解决方案

```typescript
// TypeScript 示例
function add(a: number, b: number): number {
  return a + b;
}

add(1, 2);        // ✓ 正确
add("1", "2");    // ✗ 编译时报错！类型不匹配
add(1, "2");      // ✗ 编译时报错！类型不匹配
```

**优势**：
- 编译时就能发现错误
- 代码提示更智能
- 重构更安全

### 3. TypeScript 的优势总结

| 优势 | 说明 |
|------|------|
| **类型安全** | 在编写代码时就发现类型错误 |
| **智能提示** | IDE 能提供更准确的代码补全 |
| **文档化** | 类型就是最好的文档 |
| **重构安全** | 修改代码时，类型系统会提示影响范围 |
| **团队协作** | 类型约定让代码更易理解 |

### 4. tsconfig.json 配置文件

这是 TypeScript 的"配置说明书"。

**作用**：
- 告诉 TypeScript 编译器如何工作
- 指定编译选项
- 定义项目结构

**在我们的项目中**（简化版）：

```json
{
  "compilerOptions": {
    "target": "ES2018",           // 编译成哪个版本的 JavaScript
    "module": "CommonJS",         // 模块系统
    "lib": ["DOM", "ES6"],        // 可用的 API
    "strict": true,               // 启用所有严格类型检查
    "esModuleInterop": true,      // 兼容不同的模块格式
    "skipLibCheck": true,         // 跳过库的类型检查
    "outDir": ".",                // 输出目录
    "rootDir": "."                // 源代码目录
  },
  "include": ["src/**/*.ts"]      // 包含哪些文件
}
```

**关键配置解释**：

| 配置项 | 作用 |
|--------|------|
| `target` | 编译成哪个 JavaScript 版本（ES2018 表示现代浏览器支持） |
| `module` | 使用什么模块系统（CommonJS 是 Node.js 标准） |
| `strict` | 启用严格类型检查（推荐始终开启） |
| `include` | 哪些文件需要编译 |

### 5. 基本类型注解

类型注解就是告诉 TypeScript："这个变量是什么类型"。

**基本类型**：

```typescript
// 字符串
let name: string = "张三";

// 数字
let age: number = 25;

// 布尔值
let isActive: boolean = true;

// 数组
let numbers: number[] = [1, 2, 3];
let names: string[] = ["Alice", "Bob"];

// 任意类型（尽量少用）
let anything: any = "可以是任何类型";
```

**函数类型**：

```typescript
// 参数类型和返回值类型
function greet(name: string): string {
  return "Hello, " + name;
}

// 没有返回值的函数
function log(message: string): void {
  console.log(message);
}
```

**对象类型**：

```typescript
// 定义对象形状
interface Person {
  name: string;
  age: number;
  isStudent?: boolean;  // ? 表示可选属性
}

let person: Person = {
  name: "李四",
  age: 30
};
```

---

## 实践任务

### 任务 4.1：查看 tsconfig.json

1. 在 VS Code 中打开 `tsconfig.json`
2. 找到以下配置项并记录它们的值：
   - `target`
   - `module`
   - `strict`
   - `include`
3. 思考：为什么 `strict` 要设置为 `true`？

### 任务 4.2：对比 .ts 和 .js 文件

1. 打开 `src/main.ts`，观察代码特点
   - 看看是否有 `: string`、`: number` 这样的类型注解
   - 看看函数参数和返回值是否有类型标注

2. 打开编译后的 `main.js`，对比观察
   - 类型注解是否还存在？
   - 代码有什么不同？

3. 思考：为什么 TypeScript 要编译成 JavaScript？

### 任务 4.3：识别类型注解

在 `src/main.ts` 中找到以下类型注解（不用理解代码逻辑，只找类型）：

1. 找到一个 `string` 类型的变量或参数
2. 找到一个 `number` 类型的变量或参数
3. 找到一个自定义接口（interface）
4. 找到一个函数，观察它的参数类型和返回值类型

### 任务 4.4：理解类型推断

TypeScript 有"类型推断"能力，有时不需要显式写类型：

```typescript
// 显式声明类型
let name: string = "张三";

// 类型推断（TypeScript 自动推断为 string）
let name = "张三";  // 效果相同
```

在 `src/main.ts` 中找例子：
- 哪些是显式声明类型的？
- 哪些是靠类型推断的？

---

## 完成标准

- [ ] 能解释 TypeScript 是什么
- [ ] 能说出 TypeScript 相比 JavaScript 的至少 3 个优势
- [ ] 能在 `tsconfig.json` 中找到 `target`、`module`、`strict` 配置
- [ ] 能在 `main.ts` 中识别基本的类型注解
- [ ] 理解 TypeScript 需要编译成 JavaScript 的原因

---

## 思考问题

请用自己的话回答：

1. TypeScript 和 JavaScript 是什么关系？
2. 为什么要使用 TypeScript 而不是直接用 JavaScript？
3. `tsconfig.json` 的作用是什么？
4. 什么是"类型注解"？它有什么好处？
5. 浏览器能直接运行 TypeScript 吗？为什么？

---

## 下一步

完成上述任务后，请告诉我你的发现和答案。我们将进入任务 5！
