<template>
  <div class="bread-crumb-wrapper">
    <div class="current-path">当前位置：</div>
    <el-breadcrumb separator="/" v-if="fileType" class="breadcrumb">
      <el-breadcrumb-item>{{ fileTypeMap[fileType] }}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 按路径查看文件时 -->
    <el-breadcrumb class="breadcrumb" v-else separator="/">
      <!-- 当点击面包屑导航栏中的某一级时，改变路由 -->
      <el-breadcrumb-item v-for="(item, index) in breadCrumbList" :key="index"
        :to="{ query: { fileType: 0, filePath: item.path } }">{{ item.name }}</el-breadcrumb-item>
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
    };
  },
  computed: {
    // 依据路径查看时 当前路径拆分的面包屑数据，data 中原有的 breadCrumbList 需要删掉
    breadCrumbList() {
      let path = this.$route.query.filePath; //  路径示例 /实验楼/
      let pathList = path ? path.split("/").slice(1, -1) : []; // 路径列表，取第二个 ~ 倒数第二个，因为第一个和最后一个数组项都是空字符串
      let res = [{ name: "全部文件", path: "/" }];
      pathList.forEach((element, index) => {
        res.push({
          name: element,
          path: `${res[index].path}${element}/`,
        });
      });
      return res;
    },
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