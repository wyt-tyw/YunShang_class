/**
 * 课程列表接口
| 接口 url     | `/api/courses`             |
| ------------ | -------------------------- |
| 请求方法     | GET、POST、HEAD、OPTIONS  |
| 是否支持跨域 | 否                         |
| **参数**     |                            |
| sort         | 排序方式，默认传 default   |
| category     | 分类（全部、后端开发等等） |
| page         | 当前页，从 1 开始          |
| page_size    | 页面数据条数               |
 */
const MOCK_COURSE = {
    id: 63,
    name: "新手入门指南之玩转蓝桥云课",
    picture_url:
      "https://doc.shiyanlou.com/courses/byscript-20211217-1639724433719",
    description:
      "本课程为蓝桥云课新手入门指南，我们将带你了解蓝桥云课的常用功能和环境使用方法。课程将通过不同的小例子，让每位学员亲自体验到蓝桥云课线上环境的便捷性和易用性。",
    students_count: 459415,
    fee_type: "free",
    price: 0,
    real_price: 0,
    html_url: "/courses/63",
    api_url: "https://www.lanqiao.cn/api/v2/courses/63/",
    follow_url: "https://www.lanqiao.cn/api/v2/courses/63/follow/",
    online_type: "online_public",
    label: "新人必学",
    max_interest_free_period: 0,
    points: [
      "Linux 环境介绍",
      "蓝桥云课设计理念",
      "蓝桥云课学习界面",
      "Linux 桌面环境使用",
      "WebIDE 环境使用",
      "Notebook 环境使用",
    ],
    purchase_seconds_info: null,
    level: 2,
    is_important_course: false,
    project_type: 0,
    average_score: "9.4",
  };
  module.exports = function (req, res) {
    const {
      sort = "default",
      category = "全部",
      page = 1,
      page_size = 15,
    } = req.query; // 接受一个参数 name
    const result = {
      code: "200", // 返回码
      msg: "请求成功", // 返回消息
      sort,
      category,
      results: [], // 返回课程结果
    };
    // 本地模拟 3 页数据
    if (page <= 3) {
      for (let i = 0; i < page_size; i++) {
        const id = (page - 1) * page_size + (i + 1); // 模拟课程 id
        result.results.push({
          ...MOCK_COURSE,
          id: id,
          name: `测试课程名称-${id}`,
        });
      }
    }
    res.json(result); // json 格式返回 result
  };