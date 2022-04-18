<template>
  <div class="home-content">
    <!-- 渲染课程列表 -->
    <CourseList v-if="courses?.length > 0" :courses="courses" />
    <div v-if="noMore" class="home-content__nomore">- 没有更多了 -</div>
  </div>
</template>

<script>
  import { ref, onMounted, onUnmounted } from "vue";
  import CourseList from "./list/course-list";
  import { getHomeData } from "../services/home-service";
  import { PAGE_SIZE } from "../constants/page";
  import { addReachEndListener, removeReachEndListener } from "../utils/scroll";
  export default {
    name: "HomeContent",
    components: {
      CourseList,
    },
    props: {
      tab: {
        type: Object,
        default: () => ({}),
      }, // 当前页面对于的 tab 选项
      activated: Boolean, // 当前页面是否被激活
    },
    setup(props) {
      // 课程列表数据
      let courses = ref([]);
      // 当前数据页数
      let currPage = ref(1);
      // 是否正在加载数据
      let isLoading = false;
      // 没有更多数据了
      let noMore = ref(false);
      // 刷新当前页面数据
      const refreshList = () => {
        noMore.value = false;
        currPage.value = 1;
        getCourseList();
      };
      // 请求课程列表数据
      const getCourseList = () => {
        // 正在请求数据
        isLoading = true;
        // 课程列表接口请求参数
        let params = {
          category: props?.tab?.title || "全部", // tab 标题
          page_size: PAGE_SIZE, // 每页数据个数
          page: currPage.value, // 当前数据页数
        };
        getHomeData(params)
          .then((response) => {
            // 数据加载结束
            isLoading = false;
            if (response?.results?.length >= 0) {
              // 如果是第一页，直接将数据给数组
              if (currPage.value === 1) {
                courses.value = response.results;
              } else {
                // 非第一页的时候就叠加数据
                courses.value.push(...response.results);
              }
              // 如果当前页面的数据 < 请求的数量
              if (response.results.length < PAGE_SIZE) {
                // 认为已经没有数据了
                noMore.value = true;
              }
            } else if (currPage.value > 1) {
              currPage.value--;
            }
          })
          .catch(() => {
            // 数据加载结束
            isLoading = false;
            // 如果当前页面 > 1,出错后状态需要回到上一个页面
            if (currPage.value > 1) {
              currPage.value--;
            }
          });
      };
      // 到底页面底部监听
      let reachEndHandler = null;
      // mounted 生命周期
      onMounted(() => {
        // 页面第一次渲染的时候刷新页面
        refreshList();
        // 监听页面到达底部
        if (!reachEndHandler) {
          reachEndHandler = addReachEndListener(() => {
            // 后面还有数据 && 没有正在加载中 && 当前 tab 正在显示
            if (!noMore.value && !isLoading && props.activated) {
              currPage.value++;
              getCourseList();
            }
          });
        }
      });
      // unmounted 生命周期
      onUnmounted(() => {
        // 移除到达底部监听
        if (reachEndHandler) {
          removeReachEndListener(reachEndHandler);
        }
      });
      return {
        courses,
        noMore,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .home-content {
    white-space: normal;
    font-size: 20px;
    &__nomore {
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #999999;
      font-size: 14px;
    }
  }
</style>