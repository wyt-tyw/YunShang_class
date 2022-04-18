<template>
  <div class="tab-container">
    <!--  导航列表  -->
    <div class="tab-container__nav-wrapper">
      <!-- 遍历所有的子元素 -->
      <div
        v-for="(tab, index) in tabs"
        :key="`tab-${tab?.props?.title}-${index}`"
        :class="[
          'tab-container__nav-wrapper--item',
          {
            'tab-container__nav-wrapper--item--activated':
              activatedIndex === index,
          },
        ]"
        @click="onItemClick(index, $event)"
      >
        <!-- 显示选项的标题 -->
        {{ tab?.props?.title }}
      </div>
    </div>
    <!--  tab 页面内容  -->
    <div :ref="setTabRef" class="tab-container__content">
      <slot />
    </div>
  </div>
</template>
<script>
  import { ref, Fragment, watch } from "vue";
  import { animalScrollLeft } from "../../utils/scroll";
  export default {
    name: "Tab",
    props: {
      // 当前被激活的 tab
      activatedIndex: {
        type: Number,
        default: 0, // 默认第一个
      },
    },
    emits: ["update:activatedIndex"], // 声明自定义事件
    setup(props, { emit, slots }) {
      // 定义 tabRef
      let tabRef = null;
      // 当前点击的选项元素
      let currItemEle = null;
      // 获取所有的 tab 选项
      const tabs = ref([]);
      slots?.default().forEach((slot) => {
        // 只获取 v-for 内容
        if (slot.type === Fragment && slot?.children instanceof Array) {
          tabs.value = slot.children;
        }
      });
      // 设置 tabRef
      const setTabRef = (ref) => {
        tabRef = ref;
      };
      // 选项点击事件
      const onItemClick = (index, event) => {
        // 设置当前点击的元素
        currItemEle = event.target;
        // 触发 update:activatedIndex 事件
        emit("update:activatedIndex", index);
      };
      // 切换到指定的页面
      const scrollPage = (index) => {
        if (tabRef) {
          tabRef.style.marginLeft = `-${tabRef.offsetWidth * index}px`;
        }
      };
      // 改变选项标题位置
      const scrollTab = () => {
        if (currItemEle) {
          const parent = currItemEle.parentElement;
          // 动画滚动到指定位置
          animalScrollLeft(
            parent,
            currItemEle.offsetLeft -
              (parent.offsetWidth - currItemEle.offsetWidth) / 2
          );
        }
      };
      // 监听 activatedIndex 属性的变化
      watch(
        () => props.activatedIndex,
        (curr, pre) => {
          if (curr !== pre) {
            // 切换页面
            scrollPage(curr);
            // 改变选项标题位置
            scrollTab();
          }
        },
        {
          immediate: true, // 立即执行一次
        }
      );
      return {
        onItemClick,
        tabs,
        setTabRef,
      };
    },
  };
</script>
<style lang="scss" scoped>
  .tab-container {
    overflow: hidden;
    // 导航模块
    &__nav-wrapper {
      height: 50px;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      overflow: auto;
      transition: 1s all;
      margin: 0 10px;
      &::-webkit-scrollbar {
        height: 0;
        width: 0;
        color: transparent;
      }
      // 导航的每一个项
      &--item {
        flex-shrink: 0;
        text-align: center;
        padding: 5px;
        color: #999;
        font-size: 14px;
        border-bottom: 1px solid transparent;
        // 被激活的导航
        &--activated {
          color: #0067b1;
          border-bottom: 1px solid #0067b1;
        }
      }
    }
    // tab 页面内容父元素
    &__content {
      display: flex;
      align-items: flex-start;
      width: 100%;
      transition: margin-left 0.2s ease-in-out;
    }
  }
</style>