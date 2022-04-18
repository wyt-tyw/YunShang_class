import axios from "axios";
/**
 * 根据类型获取首页数据
 * @param params 参数
 */
export function getHomeData(params = {}) {
  return axios({
    method: "get",
    url: "/api/courses",
    params,
  }).then((res) => res.data);
}