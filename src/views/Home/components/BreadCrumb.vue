<template>
  <div class="bread-crumb-wrapper">
    <div class="current-path">当前位置：</div>
    <el-breadcrumb separator="/" v-if="fileType" class="breadcrumb">
      <el-breadcrumb-item>{{ fileTypeMap[fileType] }}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 按路径查看文件时 -->
    <el-breadcrumb class="breadcrumb" v-else separator="/">
      <!-- 当点击面包屑导航栏中的某一级时，改变路由 -->
      <el-breadcrumb-item
        v-for="(item, index) in breadCrumbList"
        :key="index"
        :to="{ query: { fileType: 0, filePath: item.path } }"
        >{{ item.name }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: {
    fileType: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      fileTypeMap: {
        1: "全部图片",
        2: "全部文档",
        3: "全部视频",
        4: "全部音乐",
        5: "其他",
      },
      // 依据路径查看时 先模拟路径数据
      breadCrumbList: [
        { name: "全部文件", path: "/" },
        { name: "实验楼", path: "/实验楼/" },
      ],
    };
  },
};
</script>

<style scoped>
.bread-crumb-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  background-color: #fcfcfc;
  padding-left: 1rem;
}
.breadcrumb {
  padding: 1rem;
}
</style>