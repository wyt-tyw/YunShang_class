<template>
  <transition-group
    v-if="courses && courses.length > 0"
    :appear="true"
    name="scale"
    tag="div"
    class="course-list"
  >
    <!-- 渲染课程列表 -->
    <CourseListItem
      v-for="(course, index) in courses"
      :key="`course-item-${index}`"
      :title="course.name"
      :count="course.students_count"
      :image="course.picture_url"
      :label="course.label"
      :level="getLevelFromCode(course.level)"
      :tag="getTagFromCode(course.fee_type).tag"
      :tag-color="getTagFromCode(course.fee_type).tagColor"
      @click="onItemClick(course)"
    />
  </transition-group>
</template>

<script>
  import CourseListItem from "./course-list-item";
  import { LEVEL_MAP, TAG_MAP } from "../../constants/page";
  export default {
    name: "CourseList",
    components: {
      CourseListItem,
    },
    props: {
      courses: {
        // 课程列表
        type: Array,
        default: () => [],
      },
    },
    setup() {
      // 课程等级映射
      const getLevelFromCode = (code) => {
        return LEVEL_MAP[code] || "";
      };
      // 课程附加信息映射
      const getTagFromCode = (code) => {
        return TAG_MAP[code] || {};
      };
      // 点击每个课程的时候跳转到对应的课程详情页
      const onItemClick = (course) => {
        window.location.href = `https://www.lanqiao.cn${course.html_url}`;
      };
      return {
        getLevelFromCode,
        getTagFromCode,
        onItemClick,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .course-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 15px;
    background: #efefef;
  }
</style>