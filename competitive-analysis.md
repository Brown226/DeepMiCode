# DeepMiCode 竞品分析

> 扫描时间：2026-05-29
> 核心准则：**锦上添花，不是推倒重来**
> DeepMiCode 定位：基于 DeepSeek-deepmicode 的二次开发，最小化修改，保持与上游同步

---

## 一、扫描项目概览

| 项目 | 定位 | 核心技术 |
|------|------|----------|
| **CodeWhale** | 终端原生 AI 编程智能体 | 纯 Rust、宪法治理架构 |
| **cc-haha** | Claude Code 桌面端工作台 | IM 适配器、59 个工具集 |
| **claude-code-rust** | Claude Code Rust 重构版 | 极致性能、多形态编译 |
| **deepmicode-model-switch** | 多模型管理 CLI 工具 | Provider 抽象、代理模式 |

---

## 二、评估结论：不借鉴任何特性

经过全面扫描和务实评估，这四个项目的特性都不适合迁移到 DeepMiCode。

### 不借鉴的理由

| 特性 | 来源 | 不借鉴原因 |
|------|------|-----------|
| 宪法治理架构 | CodeWhale | 过度设计，破坏上游同步 |
| 三种行动模式 | CodeWhale | 与现有 editMode 重叠 |
| IM 适配器 | cc-haha | 非核心功能，增加复杂度 |
| 多 Agent 协调 | cc-haha | 与现有子代理重叠 |
| Skills 插件 | cc-haha | 与现有 Skills 重叠 |
| 性能优化 | claude-code-rust | Rust 特有，无法借鉴 |
| Feature flag | claude-code-rust | TypeScript 不需要 |
| 前缀缓存 | CodeWhale | 已有，不需要替换 |
| Token 可视化 | cc-haha | 已有，不需要替换 |
| Mimo 配置参数 | deepmicode-model-switch | 已有独立配置文件 |

---

## 三、Mimo 配置参数（独立来源）

Mimo 的配置参数来自独立配置文件，不需要从 deepmicode-model-switch 借鉴：

```
Mimo 模型：
- Key: tp-e82vm1g24o4lnjmjo83qn0blrc3qbe803dxmx2cc0t0798yh
- URL: https://token-plan-ams.xiaomimimo.com/v1
- Model: mimo-v2.5（多模态）、mimo-v2.5-pro

DeepSeek 模型：
- Key: sk-f6baf485e46d40449d8f79ea764ee9d6
- URL: https://api.deepseek.com
- Model: deepseek-v4-flash、deepseek-v4-pro
```

---

## 四、DeepMiCode 的核心优势（保持不变）

1. **核心引擎** — CacheFirstLoop、StreamProcessor、ErrorRecovery、ToolCallRepair
2. **工具系统** — 25+ 工具，功能完整
3. **桌面应用** — Tauri + React，完整 UI
4. **配置系统** — config.ts，配置项丰富
5. **国际化** — 5 种语言
6. **会话管理** — session、memory
7. **前缀缓存** — ImmutablePrefix，缓存命中率 90%+
8. **editMode** — review/auto/yolo/plan

---

## 五、需要修改的（差异化）

1. **品牌** — 名称、logo、颜色
2. **Mimo 支持** — 集成 Mimo API
3. **配置系统** — 添加 Mimo 配置项

---

## 六、核心理念

> **"二次开发，不要从零开始"**
>
> DeepMiCode 是 DeepSeek-deepmicode 的二次开发版本，不是从零开始的项目。
> 我们只做最小化修改，保持与上游同步的可能性。
> 那些看起来很酷的特性，如果与现有功能重叠或增加复杂度，就不迁移。
> 真正的价值在于 Mimo 支持，这才是 DeepMiCode 的核心差异化。

---

**文档版本**：v3.0（精简版）
**更新时间**：2026-05-29
**核心准则**：锦上添花，不是推倒重来
