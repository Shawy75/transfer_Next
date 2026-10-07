# 项目交接说明（Sumi 水墨博客主题）

> 这份文档整理了截至 2026-10-07 的全部进度、决策和对话要点，换电脑后从这里接着做。
> 分支：`claude/clever-heisenberg-9eesoq`，最新提交见 `git log`。

## 一、现在到哪了

一个**可以直接用的 Astro 7 博客主题**，暂定名 **Sumi**（墨）。风格是宣纸配水墨，首页有一排游戏道具风格的**道具栏**（10 格）。代码已全部推送到上面的分支，从零克隆、`npm ci`、构建都测过，可以通过。

两个在线预览（claude.ai Artifact，默认只有你自己能看，要分享需在页面的「分享」菜单里设置）：

- 主题完整 demo（可以点击浏览全站）：https://claude.ai/artifact/9n9Y2epH9YSCv7JwyoXehA
- 首页设计原型（单页，迭代用）：https://claude.ai/artifact/KGvXeP1ZBTZpt9dUcvc6uW

原型的源文件也放进了仓库：`design/prototypes/`，双击用浏览器就能打开。

## 二、在自己电脑上运行

1. 装 **Node.js 22.12 以上**（原来的 20.9 不行）：从 https://nodejs.org 下载 22 LTS，或者用 `nvm install 22`。装完运行 `node -v` 确认。
2. 拉代码：
   ```bash
   git clone -b claude/clever-heisenberg-9eesoq https://github.com/Shawy75/transfer_Next.git sumi
   cd sumi
   npm install
   npm run dev          # 打开 http://localhost:4321
   ```
3. 想看搜索功能（开发模式下没有搜索索引）：
   ```bash
   npm run build
   npm run preview
   ```

其他命令：`npm run new -- "标题"` 新建草稿；`npm run og` 重新生成分享图；`npm run check` 只做类型检查。

## 三、商业方向（已经定下来的）

**版权**
- 参考的 Jekyll 版 NexT（Simpleyyt/jekyll-theme-next）没有许可证，不能复制它的代码。
- 原版 hexo-theme-next 是 MIT；后来的 NexT 分支据说改成了 AGPL（没核实），不碰。
- 所以 Sumi 的代码全部从头写，名字也不叫 NexT。图标是原创的，没有复制任何游戏素材。

**IP 提醒**：宣传时不要出现「麦晓雯 / 骇爪 / 三角洲 / 怪物猎人」这些名字。可以说「水墨风」「游戏道具栏风格图标」。

**平台：Astro**（不选 Next.js：Next.js 博客模板被一个免费的 MIT 模板占了好几年，付费的很难卖）。

**销售渠道和价格**（2026 年调研，来源见第十节）
- Astro 官方主题库 astro.build/themes：可以上架付费主题，链接到自己的付款页，官方不抽成。查的时候暂停收新主题，上架前要再确认。
- 付款页：Gumroad（直销抽 10% + $0.50）或 Lemon Squeezy。
- ThemeForest：自带买家，但抽成高，竞争挤。
- Astro 主题常见价格：单个 $29–79，精品 $75–150。
- 有据可查的参考：getastrothemes（只卖 Astro 主题）累计 $35,549，最近 30 天 $811。反例：有人做了 5 个 Next.js 模板，没有曝光，收入 $0。
- **结论：卖得好不好主要看曝光，不是代码。**

**我的预估**（估计，不是数据）：定价 $39–59，推广到位的话首月几单到十几单，之后每月几单，适合当副业收入。

**建议的验证方式**（还没做）：先录道具栏和墨迹效果的 GIF，发到 r/astrojs、X、V2EX、少数派，附一个邮件等候名单。两周内有 50 人左右报名再全力做 Pro。图标也可以单独打包，放到 Gumroad / Figma 社区卖。

## 四、设计方向是怎么定下来的

**1. 参考来源**
- 《三角洲行动》骇爪（麦晓雯）的至臻外观「水墨云图」，英文名 Inky Reflections，2025-01-24 上线。
- 搜到的信息（看不到图和视频，只有搜索摘要）：
  - 官方视频标题是「数据流转 两仪相生」
  - 有专属流光效果
  - 打响指后出现水墨风格的扫描
  - 数据飞刀命中时有黑色闪光
  - 处决时先出现一只小猫跳到目标身上
  - 有玩家认为「白为主、黑为辅」的水墨才贴切

  这次会话的云端环境屏蔽了 bilibili、百度、TapTap 等网站，所以只能读到搜索摘要。
- 怪物猎人的物品图标：粗描边剪影，同一种外形用颜色区分等级。Sumi 改成黑白，用四档填充表示稀有度：
  - 留白 = 普通
  - 网点 = 稀有
  - 斜线 = 珍贵
  - 浓墨 = 传说

**2. 原型迭代和你的反馈**（以后改设计要遵守）

| 版本 | 你的反馈 |
| ---- | -------- |
| v1 | 我对「水墨云图」的理解不对，要求认真查资料 |
| v2（扫描、墨猫、两仪切换） | 首页不要这些特效。结合 NexT 的简约风格，只留标题和简介；去掉中文 |
| v2 | **物品栏很好**；但描述卡片高度会跳，要固定；稀有度图例看不懂 |
| v3 | 标题悬停改成「一滴墨滴进水里，从左往右扩散」 |
| v4 | 墨迹边缘太尖锐 → 先模糊、再扭曲、再模糊 |
| v5 | 墨迹被裁切了，不好看 → 不要裁切；烟雾做小一点；换可读性更高的字体 |
| v6 | 烟雾改成**印章那种朱砂红**（同一个 accent 颜色） |
| 主题 | 物品栏去掉外框，加背后阴影，物品做稍微突出的动画，要丝滑 |
| 主题 | 大物品栏太重，**改成一排 10 格的道具栏就够了**（每个图标一格，三瓶药合并成一瓶「阅读时长」） |

**3. 沟通约定**
- 总结类的回复用中文。
- 你要看 demo，不要只给截图。

## 五、主题现在有什么

- **首页**：居中的页头（印章 + 标题 + 小字副标题 + 简介）→ 带道具图标的导航 → 道具栏 → 近作列表（墨入水悬停）→ 分页。
- **道具栏**：一排 10 格，每个图标一格，数字都是构建时从文章自动算出来的：
  - 文章、归档、分类、标签：数量和对应统计
  - 阅读时长（药瓶）：按 <5 / 5–15 / >15 分钟分档统计
  - 代码矿：代码块数量
  - 搜索、关于
  - 订阅号角：RSS
  - 夜读灯：点击直接切换暗色

  鼠标悬停显示小卡片（名称、数量、说明、统计），点击直接跳转。阅读时长和代码矿各有列表页：`/items/reading/`、`/items/code/`。手机上排成两行，每行 5 个，不显示悬停卡片。
- **文章页**：单栏阅读，右边是跟着滚动高亮的目录，窄屏变成可折叠的一块；代码高亮带复制按钮；KaTeX 数学公式；标签、版权声明、上一篇 / 下一篇。
- **其他页面**：归档时间轴、分类（带图标）、标签云、关于（带头像）、搜索、404、RSS、站点地图、robots.txt。
- **基础能力**：
  - 暗色模式（不闪屏）
  - 中英文界面切换
  - 中文文章自动按中文分词，中英混合的博客也能搜到
  - 支持部署到子路径（`base` 设置）
  - 字体打包在主题里，不依赖 Google
  - SEO：Open Graph、JSON-LD、canonical
- **配置都在 `src/site.config.ts`**：标题、副标题、简介、印章文字、作者、强调色、导航（道具图标）、社交链接、分类对应的图标、目录深度、页脚署名开关等。

**关键文件**

| 文件 | 用途 |
| ---- | ---- |
| `src/components/ItemBar.astro` | 道具栏（数据计算 + 悬停卡片） |
| `src/components/item-icons.ts` | 10 个黑白道具图标；新增图标的规则见示例文章《Designing the Item Bar》 |
| `src/components/InkDefs.astro` | 网点 / 斜线填充图案，以及墨入水效果用到的 SVG 滤镜 |
| `src/styles/global.css` | 配色、字体、文章排版、墨入水样式（`.ink-title`） |
| `src/components/Masthead.astro`、`Nav.astro`、`PostRow.astro` | 页头、导航、文章行 |
| `scripts/search-index.mjs` | 构建搜索索引（有中文时统一按中文分词） |
| `design/prototypes/` | 设计原型 |
| `design/tools/` | 做在线 demo 和查死链用的辅助脚本 |

## 六、质量检查（每次大改后都跑过）

- `astro check`：0 错误
- 可访问性：axe-core 按 WCAG 2 AA 扫描，亮色 / 暗色 × 桌面 / 手机，0 问题
- 死链：根路径和 `/blog` 子路径两种部署方式，都是 0
- 中英文搜索：正常，子路径下也正常
- 道具栏：悬停卡片在两端不会超出屏幕，悬停动画逐帧检查过
- `npm audit`：0 漏洞（KaTeX 用 overrides 固定在 0.19.0）
- 从零克隆 → `npm ci` → `npm run build`：通过
- GitHub CI（`.github/workflows/ci.yml`）：每次推送自动构建

## 七、还没决定的事（需要你拍板）

1. **名字**：Sumi 是临时名，没查过有没有重名。
2. **许可证**：仓库里还没有 LICENSE。如果免费引流就用 MIT，收费就用商业许可。
3. **Lite / Pro 怎么分**，比如：
   - 方案 A：Lite = 水墨风格去掉物品栏，Pro = 物品栏 + 图标包 + 更多功能
   - 方案 B：只卖这一个完整版
4. **页脚「Theme Sumi」链接**：现在指向这个仓库，有产品页后改 `src/components/Footer.astro` 里的 `THEME_URL`。
5. **仓库是否公开**：付费版本要放私有仓库。

## 八、下一步可以做的

- 录道具栏和墨迹效果的 GIF，写推广帖和产品页文案。
- 把 demo 部署到 Netlify / Vercel，换成正式域名（Artifact demo 只适合自己看）。
- Pro 候选功能：
  - 评论、统计插件
  - 多语言内容
  - 每篇文章自动生成分享图
  - 更多道具图标
  - 道具栏可配置（自定义哪些格子、顺序）
- 示例文章里没有超过 15 分钟的长文，阅读时长页的「秘卷药」一栏是空的，需要的话加一篇。
- 定好上面第七节的事情后，加 LICENSE，改 README 里的产品信息。

## 九、注意事项

- Astro 7 默认的 Markdown 处理器换成了 Sätteri。这里用 `@astrojs/markdown-remark` 的 `unified()`，才能用 remark-math / rehype-katex。
- KaTeX 的样式和渲染器版本必须一致，否则公式下标会错位；已经用 `overrides` 锁定。
- 在线 demo 是把构建结果用 `design/tools/portable.mjs` 转成相对链接后发布的。正式部署不需要这一步。
- 可访问性检查和截图用的是 Playwright 加 axe-core（临时装在别处，没有加进项目依赖）。

## 十、调研来源

- Astro 主题目录更新：https://astro.build/blog/themes-catalog-updates/
- Astro Themes：https://astro.build/themes/
- getastrothemes 收入：https://trustmrr.com/startup/getastrothemes
- Next.js 模板 $0 收入案例：https://www.indiehackers.com/post/next-js-templates-months-of-work-0-in-revenue-here-is-what-i-got-wrong-25d7012907
- 模板售卖平台对比：https://dev.to/martinsblu38/where-template-creators-can-sell-in-2026-and-where-they-just-get-seen-3bh2
- Gumroad 费率：https://checkoutpage.com/blog/gumroad-fees
- 水墨云图系列外观实录（数据流转 两仪相生）：https://www.bilibili.com/video/BV1mJfnYoErm/
- 麦晓雯水墨云图皮肤特效介绍（九游）：https://www.9game.cn/sjzxd/10801014.html
- Inky Reflections（Sportskeeda）：https://www.sportskeeda.com/esports/hackclaw-appearance-inky-reflections-delta-force-obtain-rewards
