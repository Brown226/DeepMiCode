# DeepMiCode-Reasonix 实施计划

> 基于 DeepSeek-Reasonix v0.53.0 二次开发
> GitHub 仓库：https://github.com/Brown226/DeepMiCode.git
> 项目路径：`E:\DeepCode\DeepMiCode-Reasonix-v0.53.0`

---

## 项目概述

**DeepMiCode** 是一个融合 DeepSeek + Mimo 能力的 AI 编码助手。

- **Deep** - 来自 DeepSeek 的核心技术
- **Mi** - 来自 Mimo 的多模态能力
- **Code** - 编码助手

**核心策略**：在巨人肩膀上开发，不要从零开始造轮子。

---

## 代码扫描发现

### 品牌引用统计

| 关键词 | 出现文件数 | 出现次数 |
|--------|-----------|----------|
| `Reasonix` / `reasonix` | 214 个文件 | 1141 次 |
| `DeepSeek` | 93 个文件 | 458 次 |

### 关键文件清单

| 文件 | 说明 | 修改优先级 |
|------|------|-----------|
| `package.json` | 项目名称、版本、描述、bin 命令 | P0 |
| `desktop/src-tauri/tauri.conf.json` | 桌面应用配置（productName、identifier） | P0 |
| `src/version.ts` | 版本检测、npm registry URL | P0 |
| `src/config.ts` | 配置系统、默认路径 ~/.reasonix | P0 |
| `src/cli/index.ts` | CLI 入口、命令名称 | P0 |
| `src/i18n/*.ts` | 国际化文件（5种语言） | P0 |
| `desktop/src/i18n/*.ts` | 桌面应用国际化 | P0 |
| `desktop/src/ui/about.tsx` | 关于页面 | P0 |
| `src/client.ts` | DeepSeek API 客户端 | P1（Mimo 集成时修改） |
| `src/loop.ts` | 主循环 CacheFirstLoop | P1（Mimo 集成时修改） |
| `src/loop/thinking.ts` | 模型 thinking 模式判断 | P1 |
| `tests/*.ts` | 测试文件（200+ 个） | P2 |

### 当前未修改状态

- `package.json` 中 `name` 仍为 `"reasonix"`
- 没有找到 `src/client-mimo.ts`（Mimo 客户端）
- 没有找到任何 "Mimo" 或 "DeepMiCode" 相关代码
- 配置路径仍为 `~/.reasonix/`
- 环境变量仍为 `DEEPSEEK_API_KEY`

---

## 阶段一：品牌修改（P0）

### 步骤 1.1：修改 package.json

**文件**：`package.json`

```json
{
  "name": "deepmicode",
  "version": "0.1.0",
  "description": "DeepMiCode - AI coding assistant powered by DeepSeek + Mimo",
  "bin": {
    "deepmicode": "dist/cli/index.js",
    "dmcode": "dist/cli/index.js"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Brown226/DeepMiCode.git"
  },
  "bugs": {
    "url": "https://github.com/Brown226/DeepMiCode/issues"
  },
  "homepage": "https://github.com/Brown226/DeepMiCode#readme"
}
```

### 步骤 1.2：修改桌面应用配置

**文件**：`desktop/src-tauri/tauri.conf.json`

```json
{
  "productName": "DeepMiCode",
  "version": "0.1.0",
  "identifier": "dev.deepmicode.desktop",
  "app": {
    "windows": [
      {
        "title": "DeepMiCode"
      }
    ]
  },
  "plugins": {
    "updater": {
      "endpoints": [
        "https://github.com/Brown226/DeepMiCode/releases/latest/download/latest.json"
      ]
    }
  }
}
```

### 步骤 1.3：修改版本检测系统

**文件**：`src/version.ts`

修改内容：
- `REGISTRY_URL`: `"https://registry.npmjs.org/reasonix/latest"` → `"https://registry.npmjs.org/deepmicode/latest"`
- `readPackageVersion()`: `pkg?.name === "reasonix"` → `pkg?.name === "deepmicode"`
- `cachePath()`: `join(dir, ".reasonix", ...)` → `join(dir, ".deepmicode", ...)`
- `detectNpmInstallPrefix()`: 路径匹配中的 `reasonix` → `deepmicode`

### 步骤 1.4：修改配置系统

**文件**：`src/config.ts`

修改内容：
- `defaultConfigPath()`: `join(homedir(), ".reasonix", "config.json")` → `join(homedir(), ".deepmicode", "config.json")`
- 可选：`ReasonixConfig` 接口名 → `DeepMiCodeConfig`（影响范围较大，可暂时保留）

### 步骤 1.5：修改 CLI 入口

**文件**：`src/cli/index.ts`

修改内容：
- `program.name("reasonix")` → `program.name("deepmicode")`
- `defaultSystemPrompt()` 中的 `"You are Reasonix"` → `"You are DeepMiCode"`

### 步骤 1.6：修改国际化文件

**文件**（批量替换）：
- `src/i18n/EN.ts` - 约 85 处替换
- `src/i18n/zh-CN.ts` - 约 84 处替换
- `src/i18n/de.ts` - 约 84 处替换
- `src/i18n/ru.ts` - 约 19 处替换

替换规则：
- `Reasonix` → `DeepMiCode`
- `reasonix` → `deepmicode`
- `REASONIX` → `DEEPMICODE`（环境变量前缀）

### 步骤 1.7：修改桌面应用国际化

**文件**（批量替换）：
- `desktop/src/i18n/en.ts` - 约 16 处替换
- `desktop/src/i18n/zh-CN.ts` - 约 10 处替换
- `desktop/src/i18n/de.ts` - 约 16 处替换

### 步骤 1.8：修改桌面应用关于页面

**文件**：`desktop/src/ui/about.tsx`

```typescript
const REPO_URL = "https://github.com/Brown226/DeepMiCode";
// ...
<div className="about-name">DeepMiCode</div>
```

### 步骤 1.9：修改其他引用文件

**涉及目录**：
- `src/cli/commands/*.ts` - 各命令文件中的 Reasonix 引用
- `src/tools/*.ts` - 工具文件中的引用
- `src/memory/*.ts` - 内存系统（~/.reasonix 路径）
- `src/mcp/*.ts` - MCP 系统
- `src/server/*.ts` - Dashboard 服务器
- `dashboard/src/**/*.ts` - Dashboard 前端
- `tests/*.ts` - 测试文件（200+ 个）
- `src/net/proxy.ts` - 代理配置（REASONIX_PROXY_* 环境变量）
- `src/hooks.ts` - Hook 系统（HOOK_SETTINGS_DIRNAME）

---

## 阶段二：添加 Mimo API 支持（P0）

### 步骤 2.1：创建 Mimo 客户端

**新文件**：`src/client-mimo.ts`

基于 `src/client.ts` 创建，关键修改：

```typescript
export class MimoClient {
  readonly apiKey: string;
  readonly baseUrl: string; // https://token-plan-ams.xiaomimimo.com/v1

  constructor(opts: MimoClientOptions = {}) {
    const apiKey = opts.apiKey ?? process.env.MIMO_API_KEY;
    if (!apiKey) {
      throw new Error("MIMO_API_KEY is not set.");
    }
    this.apiKey = apiKey;
    this.baseUrl = opts.baseUrl ?? "https://token-plan-ams.xiaomimimo.com/v1";
  }

  // 保持与 DeepSeekClient 相同的接口
  async chat(opts: ChatRequestOptions): Promise<ChatResponse> { ... }
  async *stream(opts: ChatRequestOptions): AsyncGenerator<StreamChunk> { ... }
}
```

### 步骤 2.2：扩展配置系统

**文件**：`src/config.ts`

添加配置字段：

```typescript
export interface ReasonixConfig {
  // ... 现有字段 ...

  // AI 提供商选择
  aiProvider?: "deepseek" | "mimo";

  // Mimo 配置
  mimoApiKey?: string;
  mimoBaseUrl?: string;
  mimoModel?: string;
}
```

添加加载函数：

```typescript
export const DEFAULT_MIMO_MODEL = "mimo-v2.5-pro";

export const SUPPORTED_MIMO_MODELS: readonly string[] = [
  "mimo-v2.5",
  "mimo-v2.5-pro",
];

export function loadMimoApiKey(path: string = defaultConfigPath()): string | undefined {
  if (process.env.MIMO_API_KEY) return process.env.MIMO_API_KEY.trim();
  const cfg = readConfig(path).mimoApiKey;
  if (cfg && typeof cfg === "string" && cfg.trim()) return cfg.trim();
  return undefined;
}

export function loadMimoBaseUrl(path: string = defaultConfigPath()): string {
  const cfg = readConfig(path).mimoBaseUrl;
  if (cfg && typeof cfg === "string" && cfg.trim()) return cfg.trim();
  return "https://token-plan-ams.xiaomimimo.com/v1";
}

export function loadAiProvider(path: string = defaultConfigPath()): "deepseek" | "mimo" {
  const cfg = readConfig(path).aiProvider;
  if (cfg === "mimo") return "mimo";
  return "deepseek";
}

export function loadMimoModel(path: string = defaultConfigPath()): string {
  const cfg = readConfig(path).mimoModel;
  if (cfg && typeof cfg === "string" && cfg.trim()) return cfg.trim();
  return DEFAULT_MIMO_MODEL;
}
```

### 步骤 2.3：创建客户端工厂

**新文件**：`src/client-factory.ts`

```typescript
import { DeepSeekClient } from "./client.js";
import { MimoClient } from "./client-mimo.js";
import {
  loadAiProvider,
  loadApiKey,
  loadBaseUrl,
  loadMimoApiKey,
  loadMimoBaseUrl,
} from "./config.js";

export type ModelClient = DeepSeekClient | MimoClient;

export function createModelClient(): ModelClient {
  const provider = loadAiProvider();

  if (provider === "mimo") {
    const apiKey = loadMimoApiKey();
    if (!apiKey) {
      throw new Error("MIMO_API_KEY is not set. Set it in config or environment.");
    }
    return new MimoClient({
      apiKey,
      baseUrl: loadMimoBaseUrl(),
    });
  }

  return new DeepSeekClient({
    apiKey: loadApiKey(),
    baseUrl: loadBaseUrl(),
  });
}
```

### 步骤 2.4：修改模型配置

**文件**：`src/config.ts`

修改 `loadModel()` 函数：

```typescript
export function loadModel(path: string = defaultConfigPath()): string {
  const provider = loadAiProvider(path);
  const cfg = readConfig(path);

  if (provider === "mimo") {
    const raw = cfg.mimoModel;
    const trimmed = typeof raw === "string" ? raw.trim() : "";
    if (!trimmed) return DEFAULT_MIMO_MODEL;
    return SUPPORTED_MIMO_MODELS.includes(trimmed) ? trimmed : DEFAULT_MIMO_MODEL;
  }

  // DeepSeek 逻辑保持不变
  const raw = cfg.model;
  const trimmed = typeof raw === "string" ? raw.trim() : "";
  if (!trimmed) return DEFAULT_MODEL;
  const customEndpoint = cfg.baseUrl?.trim() || resolveBaseUrlEnv();
  if (customEndpoint) return trimmed;
  return SUPPORTED_OFFICIAL_MODELS.includes(trimmed) ? trimmed : DEFAULT_MODEL;
}
```

### 步骤 2.5：修改主循环

**文件**：`src/loop.ts`

修改 `CacheFirstLoopOptions` 接口：

```typescript
export interface CacheFirstLoopOptions {
  client: DeepSeekClient | MimoClient; // 扩展类型
  // ... 其他字段保持不变
}
```

修改构造函数中的默认模型：

```typescript
constructor(opts: CacheFirstLoopOptions) {
  this.client = opts.client;
  // 根据客户端类型设置默认模型
  const isMimo = this.client instanceof MimoClient;
  this.model = opts.model ?? (isMimo ? "mimo-v2.5-pro" : "deepseek-v4-flash");
  // ...
}
```

### 步骤 2.6：修改 CLI 命令

**文件**：`src/cli/commands/setup.ts`

添加 Mimo 配置步骤：

```typescript
// 在 setup 流程中添加
const provider = await choice("选择 AI 提供商", ["deepseek", "mimo"]);
if (provider === "mimo") {
  const apiKey = await input("Mimo API Key:");
  saveMimoApiKey(apiKey);
  saveAiProvider("mimo");
}
```

**文件**：`src/cli/index.ts`

添加全局选项：

```typescript
program.option("--provider <name>", "AI provider (deepseek or mimo)")
```

### 步骤 2.7：扩展模型 thinking 支持

**文件**：`src/loop/thinking.ts`

```typescript
export function isThinkingModeModel(model: string): boolean {
  if (model.includes("reasoner")) return true;
  if (model === "deepseek-v4-flash" || model === "deepseek-v4-pro") return true;
  if (model.startsWith("mimo-")) return true;
  return false;
}

export function thinkingModeForModel(model: string): "enabled" | "disabled" | undefined {
  if (model === "deepseek-chat") return "disabled";
  if (model.includes("reasoner")) return "enabled";
  if (model === "deepseek-v4-flash" || model === "deepseek-v4-pro") return "enabled";
  if (model.startsWith("mimo-")) return "enabled";
  return undefined;
}
```

### 步骤 2.8：修改错误处理

**文件**：`src/loop/errors.ts`

添加 Mimo 错误处理：

```typescript
export function isMimoHost(baseUrl: string | undefined | null): boolean {
  if (!baseUrl) return false;
  try {
    const host = new URL(baseUrl).hostname.toLowerCase();
    return host.includes("mimo");
  } catch {
    return false;
  }
}
```

---

## 阶段三：测试验证

### 步骤 3.1：安装依赖

```bash
cd E:/DeepCode/DeepMiCode-Reasonix-v0.53.0
npm install
```

### 步骤 3.2：运行类型检查

```bash
npm run typecheck
```

### 步骤 3.3：运行 Lint

```bash
npm run lint
```

### 步骤 3.4：运行测试

```bash
npm run test
```

### 步骤 3.5：运行 CLI

```bash
# 开发模式
npm run dev

# 或直接运行
npm run dev -- chat
npm run dev -- code
```

### 步骤 3.6：运行桌面应用

```bash
cd desktop
npm install
npm run tauri dev
```

### 步骤 3.7：功能测试清单

- [ ] CLI 启动正常
- [ ] DeepSeek API 调用正常
- [ ] Mimo API 调用正常
- [ ] 工具系统正常（文件系统、Shell、Web）
- [ ] 桌面应用启动正常
- [ ] 国际化显示正确
- [ ] 配置文件读写正常
- [ ] 会话保存/恢复正常

---

## 阶段四：打包发布

### 步骤 4.1：构建 CLI

```bash
npm run build
```

### 步骤 4.2：构建桌面应用

```bash
cd desktop
npm run tauri build
```

### 步骤 4.3：发布到 npm

```bash
npm publish
```

---

## Git 提交规范

每次修改后及时提交：

```bash
cd E:/DeepCode/DeepMiCode-Reasonix-v0.53.0

# 查看状态
git status

# 添加修改
git add -A

# 提交修改
git commit -m "feat: 描述修改内容"

# 推送到远程
git push
```

### 提交信息规范

- `feat:` - 新功能
- `fix:` - Bug 修复
- `refactor:` - 重构
- `docs:` - 文档更新
- `test:` - 测试相关
- `chore:` - 构建/工具相关

---

## 时间计划

| 阶段 | 任务 | 预计时间 | 状态 |
|------|------|----------|------|
| 1.1 | 修改 package.json | 10 分钟 | 未开始 |
| 1.2 | 修改桌面应用配置 | 10 分钟 | 未开始 |
| 1.3 | 修改版本检测系统 | 15 分钟 | 未开始 |
| 1.4 | 修改配置系统 | 15 分钟 | 未开始 |
| 1.5 | 修改 CLI 入口 | 10 分钟 | 未开始 |
| 1.6 | 修改国际化文件 | 30 分钟 | 未开始 |
| 1.7 | 修改桌面应用国际化 | 15 分钟 | 未开始 |
| 1.8 | 修改关于页面 | 5 分钟 | 未开始 |
| 1.9 | 修改其他引用文件 | 1 小时 | 未开始 |
| 2.1 | 创建 Mimo 客户端 | 1 小时 | 未开始 |
| 2.2 | 扩展配置系统 | 30 分钟 | 未开始 |
| 2.3 | 创建客户端工厂 | 20 分钟 | 未开始 |
| 2.4 | 修改模型配置 | 20 分钟 | 未开始 |
| 2.5 | 修改主循环 | 30 分钟 | 未开始 |
| 2.6 | 修改 CLI 命令 | 45 分钟 | 未开始 |
| 2.7 | 扩展 thinking 支持 | 10 分钟 | 未开始 |
| 2.8 | 修改错误处理 | 15 分钟 | 未开始 |
| 3 | 测试验证 | 2 小时 | 未开始 |
| 4 | 打包发布 | 1 小时 | 未开始 |

**总计预估时间**：约 8-10 小时

---

## 注意事项

### 不要做的事

1. ❌ 不要从零开始写核心引擎
2. ❌ 不要重写工具系统
3. ❌ 不要重写桌面应用
4. ❌ 不要过度修改核心模块

### 要做的事

1. ✅ 最小化修改，保持与上游同步的可能性
2. ✅ 每次修改后及时 Git 提交
3. ✅ 保持接口兼容性
4. ✅ 测试验证每个修改

### 环境变量兼容性

保留 DeepSeek 环境变量名以保持兼容：
- `DEEPSEEK_API_KEY` - 保留
- `DEEPSEEK_BASE_URL` - 保留
- `MIMO_API_KEY` - 新增
- `MIMO_BASE_URL` - 新增

---

## 相关文档

- [CLAUDE.md](../CLAUDE.md) - 项目指导文件
- [ARCHITECTURE.md](docs/ARCHITECTURE.md) - 架构文档
- [README.md](README.md) - 项目说明

---

**计划制定时间**：2026-05-29
**计划版本**：v1.0
