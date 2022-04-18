<template>
  <div class="app">
    <!-- 渲染主页组件 -->
    <home />
  </div>
</template>
<script>
  // 引入主页组件
  import Home from "./pages/home";
  export default {
    name: "App",
    components: {
      Home, //注册主页组件
    },
  };
</script>
<style scoped lang="scss"></style>