/**
 * 动画滚动到指定位置
 * @param target 目标元素
 * @param position 滚动的位置
 */
 export function animalScrollLeft(target, position) {
    // 计算的次数
    const offset = 10;
    // 总长度
    const distance = position - target.scrollLeft;
    // 每次增加的长度
    const step = distance / offset;
    let count = 0;
    function scrollToPosition() {
      if (count++ != offset) {
        target.scrollLeft = target.scrollLeft + step;
        window.requestAnimationFrame(scrollToPosition);
      }
    }
  
    window.requestAnimationFrame(scrollToPosition);
  }
  /**
   * 监听到达页面底部回调
   * @param callBack 到达底部回调
   * @param offset 判断到达底部的偏移量（0-1），默认 0.9，也就是距离底部 1/10 位置的时候开始回调
   * @returns {scrollHandler} 回调函数
   */
  export function addReachEndListener(callBack, offset = 0.9) {
    const scrollHandler = () => {
      // 垂直滑动的距离
      const scrollTop = document.documentElement.scrollTop;
      // 子内容高度
      const scrollHeight = document.documentElement.scrollHeight;
      // 窗口高度
      const clientHeight = document.documentElement.clientHeight;
      // 窗口 + 垂直滑动的距离 >= 子内容高度 * 偏移量 的时候就认为到底部了
      if (clientHeight + scrollTop >= scrollHeight * offset) {
        callBack && callBack();
      }
    };
    document.addEventListener("scroll", scrollHandler);
    return scrollHandler;
  }
  
  /**
   * 移除到达页面底部监听
   * @param handler
   */
  export function removeReachEndListener(handler) {
    return document.removeEventListener("scroll", handler);
  }