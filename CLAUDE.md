# DeepMiCode 项目指导文件

## 品牌名称

**DeepMiCode** - 融合 DeepSeek + Mimo 的 AI 编码助手

- **Deep** - 来自 DeepSeek 的核心技术
- **Mi** - 来自 Mimo 的多模态能力
- **Code** - 编码助手

## 核心策略

> **"在巨人肩膀上开发，不要从零开始造轮子"**

**DeepMiCode 是 DeepSeek-Reasonix 的二次开发版本，不是从零开始的项目。**

---

## 一、基础项目

### 选择 DeepSeek-Reasonix 作为基础

**原因**：
1. ✅ 核心引擎已验证（缓存命中率 90%+、错误恢复、上下文管理）
2. ✅ 工具系统完整（20+ 高级工具）
3. ✅ 桌面应用完整（Tauri + React，49 个前端文件）
4. ✅ 版本稳定（v0.52.0，已经过测试）
5. ✅ 用户深度使用过（效果良好，响应快，不中断）

**基础项目路径**：`E:\DeepCode\DeepSeek-Reasonix-main`
**项目路径**：`E:\DeepCode\DeepMiCode-Reasonix-v0.53.0`

## Git 仓库

**GitHub 仓库**：https://github.com/Brown226/DeepMiCode.git

**重要规则**：每次修改代码后必须及时进行 Git 提交，确保代码版本可控。

```bash
# 进入项目目录
cd E:/DeepCode/DeepMiCode-Reasonix-v0.53.0

# 查看状态
git status

# 添加修改
git add -A

# 提交修改
git commit -m "描述修改内容"

# 推送到远程
git push
```

---

## 二、二次开发策略

### 不要重写的部分（直接用）

| 模块 | 说明 | 理由 |
|------|------|------|
| **核心引擎** | ImmutablePrefix、CacheFirstLoop、StreamProcessor、ErrorRecovery、ToolCallRepair、ContextManager | 已验证，缓存命中率 90%+ |
| **工具系统** | filesystem、shell、web、skills、subagent、plan、choice、todo、memory | 20+ 工具，功能完整 |
| **桌面应用** | Tauri + React，完整 UI | 49 个前端文件，160KB CSS |
| **配置系统** | config.ts（58KB） | 配置项丰富 |
| **国际化** | i18n（5 种语言） | 已完成 |
| **会话管理** | session、memory | 已完成 |

### 需要修改的部分

| 部分 | 修改内容 | 工作量 | 优先级 |
|------|----------|--------|--------|
| **品牌** | 名称、logo、颜色、标题 | 1-2 天 | P0 |
| **API** | 添加 Mimo 支持 | 2-3 天 | P0 |
| **配置** | 添加 Mimo 配置项 | 1 天 | P0 |
| **文档** | 更新 README、文档 | 1 天 | P1 |
| **功能** | 添加自定义功能 | 按需 | P2 |

---

## 三、实施步骤

### 第一步：复制项目（10 分钟）

```bash
# 复制 DeepSeek-Reasonix
cp -r E:/DeepCode/DeepSeek-Reasonix-main E:/DeepCode/DeepMyCode

# 进入项目目录
cd E:/DeepCode/DeepMyCode
```

### 第二步：修改品牌（1-2 天）

1. **修改 package.json**
   ```json
   {
     "name": "deepmycode",
     "version": "1.0.0",
     "description": "DeepMyCode - AI coding assistant"
   }
   ```

2. **修改桌面应用品牌**
   - `desktop/src-tauri/tauri.conf.json` - 修改 productName
   - `desktop/src/theme.ts` - 修改主题颜色
   - `desktop/src/App.tsx` - 修改标题
   - `desktop/src/ui/about.tsx` - 修改关于信息

3. **修改 CLI 品牌**
   - `src/cli/index.ts` - 修改命令名称
   - `src/cli/ui/` - 修改 CLI 界面

### 第三步：添加 Mimo 支持（2-3 天）

1. **创建 Mimo 客户端**
   ```typescript
   // src/client-mimo.ts
   // 复制 src/client.ts，修改：
   // - API 端点：https://token-plan-ams.xiaomimimo.com/v1
   // - 模型：mimo-v2.5, mimo-v2.5-pro
   // - 认证方式
   ```

2. **修改配置系统**
   ```typescript
   // src/config.ts
   // 添加 Mimo 配置项：
   // - mimoApiKey
   // - mimoBaseUrl
   // - mimoModel
   ```

3. **修改客户端选择逻辑**
   ```typescript
   // src/client.ts 或 src/loop.ts
   // 根据配置选择 DeepSeek 或 Mimo
   ```

### 第四步：测试验证（1-2 天）

1. **安装依赖**
   ```bash
   npm install
   ```

2. **运行 CLI**
   ```bash
   npm run dev
   ```

3. **运行桌面应用**
   ```bash
   cd desktop
   npm install
   npm run tauri dev
   ```

4. **测试功能**
   - 测试 DeepSeek API
   - 测试 Mimo API
   - 测试工具系统
   - 测试桌面应用

### 第五步：打包发布（1 天）

1. **构建桌面应用**
   ```bash
   cd desktop
   npm run tauri build
   ```

2. **构建 CLI**
   ```bash
   npm run build
   ```

---

## 四、目录结构

```
DeepMyCode/
├── src/                    # 核心代码（来自 DeepSeek-Reasonix）
│   ├── core/              # 核心引擎
│   ├── tools/             # 工具系统
│   ├── client.ts          # DeepSeek 客户端
│   ├── client-mimo.ts     # Mimo 客户端（新增）
│   ├── config.ts          # 配置系统
│   ├── loop.ts            # 主循环
│   └── ...
├── desktop/               # 桌面应用（来自 DeepSeek-Reasonix）
│   ├── src/               # React 前端
│   ├── src-tauri/         # Tauri 后端
│   └── ...
├── package.json           # 项目配置
└── CLAUDE.md              # 本文件
```

---

## 五、关键文件说明

### 核心引擎（不要修改）

- `src/memory/runtime.ts` - ImmutablePrefix
- `src/loop.ts` - CacheFirstLoop
- `src/loop/streaming.ts` - StreamProcessor
- `src/loop/errors.ts` - ErrorRecovery
- `src/loop/healing.ts` - ToolCallRepair
- `src/context-manager.ts` - ContextManager

### 工具系统（不要修改）

- `src/tools/filesystem.ts` - 文件系统工具
- `src/tools/shell.ts` - Shell 工具
- `src/tools/web.ts` - Web 工具
- `src/tools/skills.ts` - 技能系统
- `src/tools/subagent.ts` - 子代理系统
- `src/tools/plan-core.ts` - 计划系统

### 桌面应用（不要修改核心）

- `desktop/src/App.tsx` - 主应用
- `desktop/src/ui/` - UI 组件
- `desktop/src/styles.css` - 样式

### 需要修改的文件

- `package.json` - 项目名称
- `desktop/src-tauri/tauri.conf.json` - 桌面应用配置
- `src/config.ts` - 添加 Mimo 配置
- `src/client.ts` - 添加 Mimo 支持

---

## 六、时间计划

| 阶段 | 任务 | 时间 | 交付物 |
|------|------|------|--------|
| **1** | 复制项目 + 修改品牌 | 2 天 | 可运行的 DeepMyCode |
| **2** | 添加 Mimo 支持 | 3 天 | 支持 Mimo API |
| **3** | 测试验证 | 2 天 | 测试通过 |
| **4** | 打包发布 | 1 天 | 安装包 |
| **总计** | | **8 天** | 完整产品 |

---

## 七、注意事项

### 不要做的事

1. ❌ **不要从零开始写核心引擎** - DeepSeek-Reasonix 已经很完善
2. ❌ **不要重写工具系统** - 20+ 工具已经够用
3. ❌ **不要重写桌面应用** - Tauri + React 已经很完整
4. ❌ **不要过度修改** - 保持与上游同步的可能性

### 要做的事

1. ✅ **直接复制 DeepSeek-Reasonix** - 作为基础
2. ✅ **只修改品牌和 API** - 最小化修改
3. ✅ **添加 Mimo 支持** - 核心差异化功能
4. ✅ **保持与上游同步** - 获取更新

---

## 八、与上游同步

### 保持与 DeepSeek-Reasonix 同步

```bash
# 添加上游仓库
git remote add upstream https://github.com/esengine/DeepSeek-Reasonix.git

# 获取更新
git fetch upstream

# 合并更新
git merge upstream/main
```

### 处理冲突

- 品牌相关文件 - 保留自己的版本
- 核心引擎 - 优先使用上游版本
- Mimo 相关代码 - 保留自己的版本

---

## 九、总结

### 核心理念

> **"二次开发，不要从零开始"**

### 实施策略

1. **基础**：DeepSeek-Reasonix（已验证）
2. **修改**：品牌 + API（最小化）
3. **添加**：Mimo 支持（差异化）
4. **时间**：8 天（而不是 3-6 个月）

### 预期效果

- ✅ 核心引擎：缓存命中率 90%+、响应快、不中断
- ✅ 工具系统：20+ 高级工具
- ✅ 桌面应用：完整 UI
- ✅ Mimo 支持：差异化功能
- ✅ 开发时间：8 天

---

## 十、立即行动

### 第一步

```bash
cp -r E:/DeepCode/DeepSeek-Reasonix-main E:/DeepCode/DeepMyCode
```

### 第二步

修改 `package.json` 中的名称和描述

### 第三步

添加 Mimo 客户端支持

### 第四步

测试验证

### 第五步

打包发布

---

**方向已明确，开始行动！**
