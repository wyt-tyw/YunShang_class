<template>
  <!-- 渲染 Tab 每个选项的内容 -->
  <div :class="['tab-item', { 'tab-item--deactivated': !activated }]">
    <slot />
  </div>
</template>
<script>
  export default {
    name: "TabItem",
    props: {
      title: {
        type: String,
        default: "",
      }, // Tab 选项标题
      activated: Boolean, // 当前选项是否被选中
    },
  };
</script>
<style lang="scss" scoped>
  .tab-item {
    width: 100%;
    flex-shrink: 0;
    overflow-x: hidden;
    font-size: 14px;

    // 隐藏那些没选中的 tab
    &--deactivated {
      height: 0;
      overflow: hidden;
    }
  }
</style>