import { createApp } from "vue";
import App from "./App"; // 引入 App.vue 组件
// 引入公共样式
import "./assets/style/index.scss";
const app = createApp(App); // 创建 App 根组件
app.mount("#app"); // 渲染 App