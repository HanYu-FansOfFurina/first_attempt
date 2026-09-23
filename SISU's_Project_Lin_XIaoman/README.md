# 林小满 · 上外新生智能体网站

## 文件说明

- `index.html`：网站主页面，包含顶部菜单栏、首页产品展示，不含对话区。
- `campus.html`：校园信息首页，列出 14 个可点击模块，每个模块打开独立详情页，含聊天气泡。
- `campus-map.html`：校园地图详情页，展示松江/虹口校区地图图片，支持点击放大，含聊天气泡。
- `campus-transport.html`：松江大学城出行攻略详情页，展示上海地铁线路图，支持点击放大，含聊天气泡。
- 其它详情页：`campus-basic.html`、`campus-food.html`、`campus-dorm.html`、`campus-course.html`、`campus-library.html`、`campus-card.html`、`campus-psy.html`、`campus-wenhui.html`、`campus-register.html`、`campus-training.html`、`campus-scholar.html`、`campus-qa.html`，均含聊天气泡。
- `chat.html`：独立的“和林小满聊聊”页面，带菜单栏和聊天区域。
- `chat-sdk.html`：实际加载 HiAgent WebSDK 的独立页面，被 `chat.html` 内嵌，避免 SDK 覆盖菜单。
- `style.css`：全站样式。
- `main.js`：菜单交互与导航高亮。
- `images/`：`images/carousel/` 存放首页人物轮播图；`images/maps/` 存放校园地图和地铁线路图。
- `复制轮播图.bat`：一键从“写实风人物形象”文件夹复制 7 张轮播图到 `images/carousel/`。

## 使用步骤

1. 双击运行 `复制轮播图.bat`，自动把 7 张人物图复制到 `images/carousel/`。
2. 用浏览器直接打开 `index.html`，或使用 HBuilderX 内置服务器预览。
3. 如果智能体 appKey 有变化，修改 `chat-sdk.html` 中的 `appKey`。

## 后续部署建议

- 将 `images/carousel/` 里的图片上传到图床/对象存储，然后把 `index.html` 中对应的 `<img src="images/carousel/x.jpg">` 换成可公开访问的图片 URL。
- 若网站使用 HTTPS，请确认 HiAgent WebSDK 的 `baseUrl` 也支持 HTTPS，避免混合内容被浏览器拦截。
- 目前菜单有“首页 / 校园信息 / 和学姐聊聊”。校园信息页已按上外知识库内容素材扩充为 14 个模块；校园地图和松江大学城出行攻略保留独立页面，内容未改动。
