# 项目问题与修复记录

> 本文档记录 DeepMiCode 项目在开发与维护过程中发现的问题、问题分析过程、解决方案、修复验证结果以及预防措施。
> 适用于后续查阅、回归测试与项目维护参考。

---

## 目录

- [1. DeepSeek 与 Mimo 模型兼容性问题（v0.53.0 评估批次）](#1-deepseek-与-mimo-模型兼容性问题v0530-评估批次)
  - [1.1 [P0] `spawn_subagent` 工具 Mimo 模型被静默丢弃](#11-p0-spawn_subagent-工具-mimo-模型被静默丢弃)
  - [1.2 [P1] `escalationContract` 错误指引 Mimo 模型升级到 deepseek-v4-pro](#12-p1-escalationcontract-错误指引-mimo-模型升级到-deepseek-v4-pro)
  - [1.3 [P1] `scaffold.ts` 工具 model enum 缺少 Mimo 模型](#13-p1-scaffoldts-工具-model-enum-缺少-mimo-模型)
  - [1.4 [P2] `isThinkingModeModel` 遗漏 `mimo-v2-pro` 致 reasoning 丢失](#14-p2-isthinkingmodemodel-遗漏-mimo-v2-pro-致-reasoning-丢失)
  - [1.5 [P2] `detectProvider` 模型名前缀优先级 bug](#15-p2-detectprovider-模型名前缀优先级-bug)
- [2. 已知未修复问题跟踪](#2-已知未修复问题跟踪)
- [3. 修复工具与方法论](#3-修复工具与方法论)
- [4. 复盘与预防措施](#4-复盘与预防措施)

---

## 1. DeepSeek 与 Mimo 模型兼容性问题（v0.53.0 评估批次）

**评估时间**：2026-06-02
**评估人员**：AI 助手（基于用户需求）
**影响范围**：DeepSeek（`deepseek-*`）与 Mimo（`mimo-*`）双端交互
**修复版本**：v0.53.0+

### 1.1 [P0] `spawn_subagent` 工具 Mimo 模型被静默丢弃

#### 问题描述

| 字段 | 内容 |
|---|---|
| **问题 ID** | DMC-ISSUE-001 |
| **优先级** | 🔴 P0（严重 — 核心功能不可用） |
| **影响范围** | `spawn_subagent` 工具调用方、所有 skill frontmatter `model:` 字段、用户级 subagent 调度 |
| **首次发现** | 2026-06-02 模型兼容性评估 |
| **修复版本** | v0.53.0+ |

**问题现象**：
当 subagent 工具的 `args.model` 参数传入 `mimo-v2.5-pro`（或任何 `mimo-*` 模型）时，工具会**静默忽略**该参数，回退到 `defaultModel`，而不是向用户报错或执行用户请求。

**复现步骤**：
1. 切换主会话到 Mimo：`/model mimo-v2.5-pro`
2. 在 skill frontmatter 中设置 `model: mimo-v2.5-pro`
3. 调用该 skill → 实际 subagent 仍使用 `deepseek-v4-flash`（默认）
4. 父 agent 显式 `args.model: "mimo-v2.5-pro"` 也被丢弃
5. UI 端无任何提示或错误

**环境信息**：
- 系统：Windows 11
- Node：v22.0.0
- 项目版本：v0.53.0
- 触发命令：`spawn_subagent` 工具

#### 问题分析过程

1. 定位失败逻辑：[src/tools/subagent.ts:534-536](file:///e:/DeepCode/DeepMiCode-Reasonix-v0.53.0/src/tools/subagent.ts#L534-L536)
   ```ts
   const model =
     typeof args.model === "string" && args.model.startsWith("deepseek-")
       ? args.model
       : defaultModel;
   ```
   **根因**：白名单仅匹配 `deepseek-` 前缀，未覆盖 `mimo-` 前缀。
2. 进一步检查工具的 JSON schema enum：[src/tools/subagent.ts:497-501](file:///e:/DeepCode/DeepMiCode-Reasonix-v0.53.0/src/tools/subagent.ts#L497-L501) — `enum: ["deepseek-v4-flash", "deepseek-v4-pro"]` 同样只列 DeepSeek 模型。
3. **根本问题**：原 `deepseek-deepmicode` 项目在 v0.5 之前只有 DeepSeek 模型，`spawn_subagent` 工具在引入 Mimo 支持后**未同步更新白名单**。

#### 解决方案

**变更 1**：[src/tools/subagent.ts:534-536](file:///e:/DeepCode/DeepMiCode-Reasonix-v0.53.0/src/tools/subagent.ts#L534-L536) — 扩展前缀白名单
```ts
const model =
  typeof args.model === "string" &&
  (args.model.startsWith("deepseek-") || args.model.startsWith("mimo-"))
    ? args.model
    : defaultModel;
```

**变更 2**：[src/tools/subagent.ts:497-501](file:///e:/DeepCode/DeepMiCode-Reasonix-v0.53.0/src/tools/subagent.ts#L497-L501) — 工具描述与 enum 同步
```ts
model: {
  type: "string",
  enum: [
    "deepseek-v4-flash", "deepseek-v4-pro",
    "mimo-v2.5-pro", "mimo-v2.5", "mimo-v2-flash", "mimo-v2-omni", "mimo-v2-pro",
  ],
  description: "Which model the subagent runs on. Default is 'deepseek-v4-flash' — cheap and fast, fine for explore/research-style subtasks. Override to 'deepseek-v4-pro' (~12× more expensive) when the subtask genuinely needs the stronger model. MiMo models are also accepted when the parent session is on MiMo — pick e.g. 'mimo-v2.5-pro' to keep the subagent on the same provider as the parent.",
},
```

#### 修复验证结果

| 验证项 | 状态 | 说明 |
|---|---|---|
| 单元测试 | ✅ 通过 | 添加 `tests/subagent.test.ts::"accepts a MiMo model override (regression: was silently dropped)"` |
| enum 验证测试 | ✅ 通过 | 添加 `tests/subagent.test.ts::"declares MiMo models in the spawn_subagent tool spec enum"` |
| 集成测试 | ✅ 通过 | `mimo-v2.5-pro` 被实际传至 fetch body |
| TypeScript 检查 | ✅ 通过 | `tsc --noEmit` 0 errors |
| Biome lint | ✅ 通过 | `biome check` 0 errors |

**相关测试位置**：
- [tests/subagent.test.ts:322-363](file:///e:/DeepCode/DeepMiCode-Reasonix-v0.53.0/tests/subagent.test.ts#L322-L363)

#### 预防措施

- **设计层面**：在 Provider 抽象层暴露 `isKnownModel(model: string): boolean`，所有需要白名单的地方都改用此函数。新增 provider/模型时**只需在一个地方更新**。
- **代码审查**：任何接受 `model` 字符串的工具参数都必须经 `isMimoModel()` 或 `isKnownModel()` 验证，不能简单 `startsWith("deepseek-")`。
- **测试覆盖**：所有"接受模型覆盖"的工具 spec 都应加 enum 全覆盖测试。

---

### 1.2 [P1] `escalationContract` 错误指引 Mimo 模型升级到 deepseek-v4-pro

#### 问题描述

| 字段 | 内容 |
|---|---|
| **问题 ID** | DMC-ISSUE-002 |
| **优先级** | 🟡 P1（重要 — 用户体验与潜在逻辑错误） |
| **影响范围** | 所有 Mimo 用户的 system prompt、模型自报告的 `<<<NEEDS_PRO>>>` 行为 |
| **首次发现** | 2026-06-02 模型兼容性评估 |
| **修复版本** | v0.53.0+ |

**问题现象**：
`prompt-fragments.ts:escalationContract(modelId)` 函数对所有非 `deepseek-v4-pro` 模型都返回相同的提示文案：
> "If a task CLEARLY exceeds what this tier can do well... output the marker... This aborts the current call and retries this turn on **deepseek-v4-pro**, one shot."

但 Mimo 完全没有 `deepseek-v4-pro` 升级路径 — Mimo 平台没有 deepseek-v4-pro。模型被错误引导。

**复现步骤**：
1. 切换到 Mimo 模型：`/model mimo-v2.5-pro`
2. 检查 system prompt 中的 `escalationContract` 段落
3. 实际包含 `deepseek-v4-pro` 字样
4. Mimo 模型若按指引输出 `<<<NEEDS_PRO>>>` 标记，loop 仅将标记识别为 UI 警告（[src/core/eventize.ts:360-365](file:///e:/DeepCode/DeepMiCode-Reasonix-v0.53.0/src/core/eventize.ts#L360-L365)），**不会**真正重调到 deepseek-v4-pro

**环境信息**：
- 复现端：所有 Mimo 用户会话
- 触发条件：Mimo 模型按 prompt 输出 `<<<NEEDS_PRO>>>`

#### 问题分析过程

1. 读取 [src/prompt-fragments.ts:11-28](file:///e:/DeepCode/DeepMiCode-Reasonix-v0.53.0/src/prompt-fragments.ts#L11-L28)
2. 检查 loop 实际行为：[src/core/eventize.ts:360-365](file:///e:/DeepCode/DeepMiCode-Reasonix-v0.53.0/src/core/eventize.ts#L360-L365) 与 [src/loop.ts](file:///e:/DeepCode/DeepMiCode-Reasonix-v0.53.0/src/loop.ts) — **确认 loop 当前未实现 marker → 升级到 deepseek-v4-pro 的路径**，所以模型按 prompt 输出 marker 后实际**没有任何升级发生**，只是 UI 显示一条警告。
3. 但**这个 prompt 是误导**的：在 Mimo 上既没有 deepseek-v4-pro 可升级到，模型会感到困惑（"为什么我没有 retry 成功？"）。
4. 旧提示未明确告知 MiMo 没有"上一档"模型。

#### 解决方案

**变更**：[src/prompt-fragments.ts:12-15](file:///e:/DeepCode/DeepMiCode-Reasonix-v0.53.0/src/prompt-fragments.ts#L12-L15) — 增加 MiMo 分支
```ts
export function escalationContract(modelId: string): string {
  if (modelId.startsWith("mimo-")) {
    return `You are running on \`${modelId}\` (MiMo provider). MiMo has no internal escalation tier — there is no \`deepseek-v4-pro\` analogue on this provider. The \`<<<NEEDS_PRO>>>\` marker is a no-op here: deliver the strongest answer you can directly. If asked which model you are, answer \`${modelId}\`.`;
  }
  if (modelId === "deepseek-v4-pro") { /* ... 原有逻辑 ... */ }
  return `... retries this turn on deepseek-v4-pro ...`;  // 原有 flash 提示
}
```

#### 修复验证结果

| 验证项 | 状态 | 说明 |
|---|---|---|
| 单元测试 | ✅ 通过 | 添加 `tests/mimo-integration.test.ts::MiMo Escalation Contract > should not retry on deepseek-v4-pro when running on MiMo` |
| 断言设计 | ✅ 通过 | 用 `not.toMatch(/retries.*deepseek-v4-pro/i)` 和 `not.toMatch(/escalat.*to deepseek-v4-pro/i)` 校验 |
| DeepSeek 文案 | ✅ 通过 | 仍保留 `deepseek-v4-flash` 下的旧行为 |
| TypeScript 检查 | ✅ 通过 | `tsc --noEmit` 0 errors |
| Biome lint | ✅ 通过 | 0 errors |

**相关测试位置**：
- [tests/mimo-integration.test.ts:208-215](file:///e:/DeepCode/DeepMiCode-Reasonix-v0.53.0/tests/mimo-integration.test.ts#L208-L215)

#### 预防措施

- **设计层面**：将 `escalationContract` 改成"按 provider 出 contract"，所有 model-specific 文案集中到一处。
- **文档规范**：所有 prompt fragment 必须在文件顶部 JSDoc 注明"适用于哪些 provider"。
- **测试覆盖**：每个 provider × 每个 tier 至少一条 contract 内容断言。

---

### 1.3 [P1] `scaffold.ts` 工具 model enum 缺少 Mimo 模型

#### 问题描述

| 字段 | 内容 |
|---|---|
| **问题 ID** | DMC-ISSUE-003 |
| **优先级** | 🟡 P1（与 ISSUE-001 同源） |
| **影响范围** | `scaffold` 工具（即 skill runner） |
| **首次发现** | 2026-06-02 模型兼容性评估（与 ISSUE-001 同步发现） |
| **修复版本** | v0.53.0+ |

**问题现象**：
与 ISSUE-001 同根：`scaffold.ts` 工具的 `model` 参数 enum 只列了 `["deepseek-v4-flash", "deepseek-v4-pro"]`，任何 Mimo 模型在 skill frontmatter 中无法被工具调用。

**复现步骤**：
1. 在 skill frontmatter 中写 `model: mimo-v2.5-pro`
2. 调用 `scaffold` 工具 → 工具 spec 在 OpenAI tool schema 校验阶段会**直接拒绝**调用
3. 用户看到 tool validation error

**环境信息**：与 ISSUE-001 相同

#### 问题分析过程

同 ISSUE-001：与 subagent 工具同步存在 v0.5 前的 DeepSeek-only 设计。

#### 解决方案

**变更**：[src/tools/scaffold.ts:64-72](file:///e:/DeepCode/DeepMiCode-Reasonix-v0.53.0/src/tools/scaffold.ts#L64-L72) — 与 subagent.ts 同步扩展
```ts
model: {
  type: "string",
  enum: [
    "deepseek-v4-flash", "deepseek-v4-pro",
    "mimo-v2.5-pro", "mimo-v2.5", "mimo-v2-flash", "mimo-v2-omni", "mimo-v2-pro",
  ],
  description:
    "Subagent model override. Default flash; use pro only when the playbook needs it. MiMo models are also accepted when running on the MiMo provider.",
},
```

#### 修复验证结果

| 验证项 | 状态 | 说明 |
|---|---|---|
| 现有 scaffold 测试 | ✅ 通过 | `tests/tools-scaffold.test.ts` 16 个测试全过 |
| TypeScript 检查 | ✅ 通过 | 0 errors |
| Biome lint | ✅ 通过 | 0 errors |

#### 预防措施

- **代码组织**：将"接受模型覆盖的工具"集中到一个文件夹，共享一个 `MODELS_ENUM` 常量（参见 §3）。
- **CI 校验**：增加一个 lint 规则或测试，自动检查所有工具 spec 的 `model` enum 是否包含完整模型清单。

---

### 1.4 [P2] `isThinkingModeModel` 遗漏 `mimo-v2-pro` 致 reasoning 丢失

#### 问题描述

| 字段 | 内容 |
|---|---|
| **问题 ID** | DMC-ISSUE-004 |
| **优先级** | 🟡 P2（次要 — 仅影响特定模型） |
| **影响范围** | `mimo-v2-pro` 用户的 session resume 行为 |
| **首次发现** | 2026-06-02 模型兼容性评估 |
| **修复版本** | v0.53.0+ |

**问题现象**：
`isThinkingModeModel("mimo-v2-pro")` 返回 `false`，但该模型实际会返回 `reasoning_content`。这导致在 session resume 时 [loop.ts:243-245](file:///e:/DeepCode/DeepMiCode-Reasonix-v0.53.0/src/loop.ts#L243-L245) 的 `stampMissingReasoningForThinkingMode` **不会**为该会话 stamp 缺失的 reasoning。

**复现步骤**：
1. 使用 `mimo-v2-pro` 完成一个多回合会话
2. 会话保存到 JSONL
3. `/sessions` 恢复该会话
4. 模型仍输出 reasoning_content（运行期正常），但 session 落盘时**未为该模型做特殊处理**
5. 长期 session 重新加载后，模型可能看到不一致的 reasoning 状态

**环境信息**：
- 触发模型：`mimo-v2-pro`
- 触发时机：session 持久化 + reload

#### 问题分析过程

1. 读取 [src/loop/thinking.ts:2-10](file:///e:/DeepCode/DeepMiCode-Reasonix-v0.53.0/src/loop/thinking.ts#L2-L10)
   ```ts
   if (model.startsWith("mimo-v2.5")) return true;
   if (model === "mimo-v2-flash") return true;
   if (model === "mimo-v2-omni") return true;
   return false;  // mimo-v2-pro 漏网
   ```
2. 检查 [src/loop/thinking.ts:14-22](file:///e:/DeepCode/DeepMiCode-Reasonix-v0.53.0/src/loop/thinking.ts#L14-L22) `thinkingModeForModel` — 实际上该函数已经做了正确的通用化（`model.startsWith("mimo-")`），但 `isThinkingModeModel` 没有同步。
3. 同文件内两函数对 Mimo 的判定**不一致**是真正的代码异味。

#### 解决方案

**变更**：[src/loop/thinking.ts:2-10](file:///e:/DeepCode/DeepMiCode-Reasonix-v0.53.0/src/loop/thinking.ts#L2-L10) — 与 `thinkingModeForModel` 对齐
```ts
export function isThinkingModeModel(model: string): boolean {
  if (model.includes("reasoner")) return true;
  if (model === "deepseek-v4-flash" || model === "deepseek-v4-pro") return true;
  if (model.startsWith("mimo-")) return true;  // 全部 Mimo 模型
  return false;
}
```

**测试更新**：[tests/mimo-integration.test.ts:159-172](file:///e:/DeepCode/DeepMiCode-Reasonix-v0.53.0/tests/mimo-integration.test.ts#L159-L172) — 补充 `mimo-v2-omni` 与 `mimo-v2-pro` 断言

#### 修复验证结果

| 验证项 | 状态 | 说明 |
|---|---|---|
| 单元测试 | ✅ 通过 | 18 个 mimo-integration 测试全过 |
| 新增断言 | ✅ 通过 | `mimo-v2-omni`、`mimo-v2-pro`、`deepseek-v4-pro`、`deepseek-chat` 全覆盖 |
| TypeScript 检查 | ✅ 通过 | 0 errors |
| Biome lint | ✅ 通过 | 0 errors |

**相关测试位置**：
- [tests/mimo-integration.test.ts:159-172](file:///e:/DeepCode/DeepMiCode-Reasonix-v0.53.0/tests/mimo-integration.test.ts#L159-L172)

#### 预防措施

- **代码组织**：将 `isThinkingModeModel` 与 `thinkingModeForModel` 在文件顶部用单一列表 `MIMO_MODELS`、`DEEPSEEK_THINKING_MODELS` 维护，两函数都从该列表生成。
- **测试驱动**：每加一个模型到配置（[src/config.ts:32-52](file:///e:/DeepCode/DeepMiCode-Reasonix-v0.53.0/src/config.ts#L32-L52)），必须有相应 thinking-mode 断言测试。

---

### 1.5 [P2] `detectProvider` 模型名前缀优先级 bug

#### 问题描述

| 字段 | 内容 |
|---|---|
| **问题 ID** | DMC-ISSUE-005 |
| **优先级** | 🟡 P2（修复的同时提升测试通过率） |
| **影响范围** | 用户自定义 baseUrl + 显式 deepseek model 的配置组合 |
| **首次发现** | 2026-06-02 模型兼容性评估（通过运行测试发现） |
| **修复版本** | v0.53.0+ |

**问题现象**：
`detectProvider("deepseek-v4-flash", "https://token-plan-ams.xiaomimimo.com/v1")` 返回 `"mimo"`（错误），期望返回 `"deepseek"`。

**复现步骤**：
1. 设置 `MIMO_BASE_URL=https://token-plan-ams.xiaomimimo.com/v1`
2. 同时设置 `model: "deepseek-v4-flash"`（深想用 DeepSeek 走 Mimo 的代理）
3. 实际 provider 被识别为 mimo，导致请求发到 Mimo API 但请求体是 DeepSeek 模型规格

**环境信息**：
- 触发命令：所有 `createProvider` 调用方
- 触发测试：`tests/mimo-integration.test.ts::"Provider Factory > should prefer model name over URL"`

#### 问题分析过程

1. 读取 [src/providers/factory.ts:42-49](file:///e:/DeepCode/DeepMiCode-Reasonix-v0.53.0/src/providers/factory.ts#L42-L49)
2. 现有逻辑：
   ```ts
   if (model && isMimoModel(model)) return "mimo";  // 第 1 步
   if (isMimoEndpoint(baseUrl)) return "mimo";        // 第 2 步：错误地把 deepseek-v4-flash 误判
   return "deepseek";
   ```
3. 期望：模型名前缀应当**显式高于** URL 嗅探。
4. 原 JSDoc 注释 `Priority: explicit provider > model name > base URL > default (deepseek)` 已经声明了这个优先级，但代码**没实现**。

#### 解决方案

**变更**：[src/providers/factory.ts:42-49](file:///e:/DeepCode/DeepMiCode-Reasonix-v0.53.0/src/providers/factory.ts#L42-L49) — 同步显式 deepseek 优先级
```ts
export function detectProvider(model?: string, baseUrl?: string): ProviderKind {
  if (model && isMimoModel(model)) return "mimo";
  if (model?.startsWith("deepseek-")) return "deepseek";
  if (isMimoEndpoint(baseUrl)) return "mimo";
  return "deepseek";
}
```

**说明**：
- 用 `model?.startsWith("deepseek-")`（可选链）符合 Biome `useOptionalChain` 规则。
- 删除内联注释以保持与项目其他工厂函数风格一致。

#### 修复验证结果

| 验证项 | 状态 | 说明 |
|---|---|---|
| 单元测试 | ✅ 通过 | `Provider Factory > should prefer model name over URL` 1 测试通过 |
| TypeScript 检查 | ✅ 通过 | 0 errors |
| Biome lint | ✅ 通过 | 0 errors |

**相关测试位置**：
- [tests/mimo-integration.test.ts:108-113](file:///e:/DeepCode/DeepMiCode-Reasonix-v0.53.0/tests/mimo-integration.test.ts#L108-L113)

#### 预防措施

- **设计层面**：JSDoc 声明的优先级必须**字面对应**代码顺序；代码评审时检查 JSDoc/实现一致性。
- **测试驱动**：每个 provider detection 分支都应有显式断言（model name wins / URL wins / default）。

---

## 2. 已知未修复问题跟踪

| 问题 ID | 描述 | 优先级 | 状态 | 备注 |
|---|---|---|---|---|
| DMC-ISSUE-006 | Mimo 模型价格为 placeholder 值（[src/telemetry/stats.ts:14-19](file:///e:/DeepCode/DeepMiCode-Reasonix-v0.53.0/src/telemetry/stats.ts#L14-L19)） | 🟡 P2 | 跟踪中 | 待 Mimo 官方发布公开费率后对齐 |
| DMC-ISSUE-007 | `Usage` 类在 [src/client.ts](file:///e:/DeepCode/DeepMiCode-Reasonix-v0.53.0/src/client.ts) 与 [src/providers/types.ts](file:///e:/DeepCode/DeepMiCode-Reasonix-v0.53.0/src/providers/types.ts) 中存在重复定义 | 🟢 P3 | 跟踪中 | 类型安全而非运行时问题；重构尝试因 subagent 测试回归被回退（`fromApi()` 行为差异）；维持现状安全 |
| DMC-ISSUE-008 | Ink TUI 渲染测试在 Windows / 无 TTY 环境批量失败（约 50 个测试） | 🟢 P3 | 已知 | 环境相关，非本批次引入 |
| DMC-ISSUE-009 | Dashboard SPA `__DEEPMICODE_TOKEN__` 占位符未在 `server-dashboard.test.ts` 中正确插值 | 🟢 P3 | 已知 | 测试需要先 `npm run build:dashboard` |

---

## 3. 修复工具与方法论

### 3.1 修复流程（推荐）

1. **复现**：写失败的单元测试（Red）。
2. **最小化修复**：改最少的代码让测试变绿（Green）。
3. **重构/验证**：跑 lint + typecheck + 全测试。
4. **提交**：`fix(scope): <message>`。

### 3.2 验证清单

| 项 | 命令 |
|---|---|
| 类型检查 | `npx tsc --noEmit` |
| Lint + Format | `npx biome check <files>` / `npx biome check --write <files>` |
| 单元测试 | `npx vitest run <files>` |
| 完整测试 | `npm run test` |
| 完整 verify | `npm run verify`（含 build） |

### 3.3 提交格式

```
fix(loop): detectProvider should respect explicit deepseek-* prefix over URL hint
test(mimo): cover spawn_subagent Mimo model override
```

### 3.4 工具与测试覆盖

| 工具 | 用途 |
|---|---|
| Vitest 2.x | 单元与集成测试 |
| Stryker | 突变测试（按需） |
| Biome 1.9 | Lint + Format |
| tsc 5.6 | TypeScript 类型检查 |

---

## 4. 复盘与预防措施

### 4.1 本批次问题共性

1. **前缀白名单硬编码**：所有需要接受 `model` 字符串的地方都写了 `startsWith("deepseek-")`，未抽象。
2. **测试覆盖不足**：Mimo 引入后没有同步补齐现有测试的 Mimo 断言。
3. **JSDoc 与实现漂移**：`detectProvider` 注释声明了优先级但代码未实现。
4. **设计抽象不全**：缺少 `isKnownModel()` 之类的统一接口。

### 4.2 体系性预防

| 建议 | 责任方 | 优先级 |
|---|---|---|
| 引入 `MODELS_ENUM` 常量与 `isKnownModel()` 函数，所有 spec 与验证共享 | 维护者 | 🟡 P1 |
| 工具 spec 的 `enum` 自动从 `MODELS_ENUM` 生成（构建时注入） | 维护者 | 🟡 P1 |
| 每个工具参数 `model` 都自动测试 "enum 含全部模型清单" | CI | 🟡 P2 |
| Provider 工厂的 JSDoc/实现一致性 lint 规则 | CI | 🟢 P3 |
| Session 落盘时记录 `provider.kind`，reload 时校验一致性 | 维护者 | 🟢 P3 |

### 4.3 跨平台与构建注意事项

- Windows 上 TUI 渲染测试需要 `--env-options` 或 mock stdin/stdout；本批次未触及。
- 修改 `escalationContract` 等 prompt fragment 时**必须**回归所有 provider 的 system prompt 完整性测试。
- Biome 1.9 的 `useOptionalChain` 会强制 `model?.startsWith(...)` 风格；手写 `model && model.startsWith(...)` 会被报 lint error。

---

## 5. 附录

### 5.1 本批次修改文件清单

| 文件 | 变更内容 |
|---|---|
| [src/loop/thinking.ts](file:///e:/DeepCode/DeepMiCode-Reasonix-v0.53.0/src/loop/thinking.ts) | 扩展 `isThinkingModeModel` 匹配所有 `mimo-*` |
| [src/prompt-fragments.ts](file:///e:/DeepCode/DeepMiCode-Reasonix-v0.53.0/src/prompt-fragments.ts) | `escalationContract` 新增 Mimo 分支 |
| [src/tools/scaffold.ts](file:///e:/DeepCode/DeepMiCode-Reasonix-v0.53.0/src/tools/scaffold.ts) | 工具 spec model enum 扩展 |
| [src/tools/subagent.ts](file:///e:/DeepCode/DeepMiCode-Reasonix-v0.53.0/src/tools/subagent.ts) | 工具 spec model enum 扩展 + 前缀白名单 |
| [src/providers/factory.ts](file:///e:/DeepCode/DeepMiCode-Reasonix-v0.53.0/src/providers/factory.ts) | `detectProvider` 显式尊重 `deepseek-*` 前缀 |
| [tests/mimo-integration.test.ts](file:///e:/DeepCode/DeepMiCode-Reasonix-v0.53.0/tests/mimo-integration.test.ts) | 新增 3 个测试 + 扩展 1 个测试 |
| [tests/subagent.test.ts](file:///e:/DeepCode/DeepMiCode-Reasonix-v0.53.0/tests/subagent.test.ts) | 新增 2 个测试 |

### 5.2 验证统计

| 指标 | 数值 |
|---|---|
| 修复 P0 | 1 |
| 修复 P1 | 2 |
| 修复 P2 | 2 |
| 新增测试 | 5 |
| 扩展测试 | 1 |
| 修改代码行 | ~20 |
| 修改测试行 | ~50 |
| 涉及文件 | 5（src）+ 2（tests） |
| 验证通过率 | 71/71 涉及测试 100% |
| TypeScript 错误 | 0 |
| Biome 错误 | 0 |

### 5.3 验证命令记录

```bash
# 单元与集成测试
npx vitest run tests/mimo-integration.test.ts tests/subagent.test.ts tests/tools-scaffold.test.ts
# → 3 test files, 71 tests passed

# TypeScript 检查
npx tsc --noEmit
# → 0 errors

# Biome lint
npx biome check src/loop/thinking.ts src/prompt-fragments.ts src/tools/scaffold.ts \
  src/tools/subagent.ts src/providers/factory.ts tests/mimo-integration.test.ts \
  tests/subagent.test.ts
# → 7 files checked, 0 errors
```

---

**文档维护者**：AI 助手（协助创建）
**最近更新**：2026-06-02
**下次评审建议**：每次新增 provider / 模型时必须更新本文档
