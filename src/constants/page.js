// 侧边菜单数据
export const MENUS = [
  {
    title: "首页", // 标题
    target: "", // 目标地址
  },
  {
    title: "实验楼",
    target: "",
  },
  {
    title: "蓝桥杯大赛",
    target: "",
  },
  {
    title: "社区",
    target: "",
  },
  {
    title: "1+X证书",
    target: "",
  },
  {
    title: "高校实验教学",
    target: "",
  },
  {
    title: "企业内训",
    target: "",
  },
];
// 首页的 Tab 列表数据
export const HOME_TABS = [
  {
    title: "全部",
    type: "all",
  },
  {
    title: "后端开发",
    type: "server",
  },
  {
    title: "Linux 运维",
    type: "linux",
  },
  {
    title: "云计算与大数据",
    type: "data",
  },
  {
    title: "数据库",
    type: "database",
  },
  {
    title: "信息安全",
    type: "safe",
  },
  {
    title: "Web 前端开发",
    type: "frontend",
  },
  {
    title: "计算机专业课",
    type: "computer",
  },
  {
    title: "人工智能",
    type: "robot",
  },
];
// 首页每次请求的数量
export const PAGE_SIZE = 15;
// 课程等级映射
export const LEVEL_MAP = {
  1: "入门",
  2: "初级",
  3: "中级",
  4: "高级",
};
// 附加信息映射
export const TAG_MAP = {
  free: {
    tag: "免费",
    tagColor: "#5cab5c",
  },
  limit_free: {
    tag: "限免",
    tagColor: "#ff6200",
  },
  member: {
    tag: "会员",
    tagColor: "#ffaa00",
  },
  bootcamp: {
    tag: "训练营",
    tagColor: "#ff0000",
  },
};