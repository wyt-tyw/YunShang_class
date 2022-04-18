<template>
  <div class="header-container">
    <!-- 左边侧边栏模块 -->
    <i
      class="header-container__menu icon-menu"
      @click="toggleMenu"
    />
    <!-- 中间 logo -->
    <img
      class="header-container__image"
      src="https://yunke-static.lanqiao.cn/lanqiao/mobile/frontend/dist/img/lanqiao-header-yunke-logo.9b2adbf.svg"
    >
    <!-- 右边菜单模块 -->
    <div class="header-container__right">
      <!-- 字体图片 notice -->
      <i class="header-container__right--notice icon-notice" />
      <!-- 字体图片 search -->
      <i class="header-container__right--search icon-search" />
      <!-- 用户头像 -->
      <img
        class="header-container__right--img"
        src="https://static-qiniu.lanqiao.cn/avatar/uid2381436-20220301-1646150151950?imageView2/1/w/45/h/45/"
      >
    </div>
  </div>
  <!-- 侧边菜单 -->
  <teleport to="body">
    <side-menu
      :show-menu="showMenu"
      @bg-click="toggleMenu"
    />
  </teleport>
</template>

<script>
  import { ref } from "vue";
  // 引入侧边菜单组件
  import SideMenu from "./side-menu";
  export default {
    name: "Header",
    components: {
      SideMenu,
    },
    setup() {
      let showMenu = ref(false); // 是否显示侧边菜单，默认不显示
      // 切换侧边菜单显示
      const toggleMenu = () => {
        showMenu.value = !showMenu.value;
      };
      return {
        showMenu,
        toggleMenu,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
    // 左边菜单按钮
    &__menu {
      flex: 1;
      font-size: 26px;
      color: #666;
    }
    // 中间 logo 图片
    &__image {
      width: 147px;
      height: 20px;
      object-fit: fill;
    }
    // 右边菜单模块
    &__right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      // 通知图标
      &--notice {
        font-size: 18px;
        color: #666;
      }
      // 搜索图标
      &--search {
        font-size: 18px;
        color: #666;
        margin-left: 10px;
      }
      // 用户头像
      &--img {
        margin-left: 20px;
        width: 34px;
        height: 34px;
        object-fit: fill;
        border-radius: 50%;
        overflow: hidden;
        align-self: flex-end;
      }
    }
  }
</style>