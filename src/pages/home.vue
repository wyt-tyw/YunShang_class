<template>
  <div class="home">
    <!-- 头部 -->
    <Header />
    <!-- tab 组件 -->
    <Tab v-model:activatedIndex="activatedIndex">
      <!-- 首页主体内容 -->
      <TabItem
        v-for="(tab, index) in tabs"
        :key="`tab-${tab}-${index}`"
        :title="tab.title"
        :activated="index === activatedIndex"
      >
        <home-content
          v-if="shouldShowPage(index)"
          :tab="tab"
          :activated="index === activatedIndex"
        />
      </TabItem>
    </Tab>
  </div>
</template>
<script>
import { ref } from "vue";
// 引入 Header 组件
import Header from "../components/header.vue";
// 引入 Tab 组件
import { Tab, TabItem } from "../components/tab";
// 引入主页面 Tab 内容组件
import HomeContent from "../components/home-content";
// 引入 HOME_TABS 常量
import { HOME_TABS } from "../constants/page";
export default {
  name: "Home",
  components: {
    Header, // 注册 Header 组件
    Tab,
    TabItem,
    HomeContent,
  },
  setup() {
    // 所有的 tabs
    const tabs = ref(HOME_TABS);
    // 当前选中的 tab
    let activatedIndex = ref(0);
    // 只显示（前一个选项、当前选项、后一个选项）
    const shouldShowPage = (index) => {
      return [
        activatedIndex.value - 1,
        activatedIndex.value,
        activatedIndex.value + 1,
      ].includes(index);
    };
    return {
      tabs,
      activatedIndex,
      shouldShowPage,
    };
  },
};
</script>
<style scoped></style>