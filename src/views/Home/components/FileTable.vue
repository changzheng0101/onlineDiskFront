<template>
  <el-table :data="tableData">
    <el-table-column
      prop="fileName"
      label="文件名"
      v-if="selectedColumnList.includes('extendName')"
    >
    </el-table-column>
    <el-table-column prop="extendName" label="类型" width="100">
    </el-table-column>
    <el-table-column
      prop="fileSize"
      label="大小"
      width="60"
      v-if="selectedColumnList.includes('fileSize')"
    >
    </el-table-column>
    <el-table-column
      prop="uploadTime"
      label="修改日期"
      width="180"
      v-if="selectedColumnList.includes('uploadTime')"
    >
    </el-table-column>
    <el-table-column label="操作" width="300">
      <template #default="scope">
        <div>
          <el-button
            size="small"
            type="text"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
          <el-button
            size="small"
            type="text"
            @click="handleMove(scope.$index, scope.row)"
            >移动</el-button
          >
          <el-button
            size="small"
            type="text"
            @click="handleRename(scope.$index, scope.row)"
            >重命名</el-button
          >
          <el-button
            size="small"
            type="text"
            @click="handleDownload(scope.$index, scope.row)"
            >下载</el-button
          >
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>
  
<script>
export default {
  name: "FileTable",
  props: {
    tableData: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      // 模拟数据
      // tableData: [
      //   {
      //     fileName: "markdown样式文件",
      //     extendName: "markdown",
      //     fileSize: "10KB",
      //     uploadTime: "2020-10-28 16:33:33",
      //   },
      //   {
      //     fileName: "项目源码",
      //     extendName: "zip",
      //     fileSize: "7MB",
      //     uploadTime: "2020-12-28 20:00:50",
      //   },
      // ],
      operaColumnIsFold: sessionStorage.getItem("operaColumnIsFold") || false, //  表格操作列-是否收缩
    };
  },
  computed: {
    selectedColumnList() {
      return this.$store.getters.selectedColumnList;
    },
  },
  methods: {
    handleDelete(index, row) {
      console.log("handleDelete-->" + index + " " + row);
    },
    handleRename(index, row) {
      console.log("handleRename-->" + index + " " + row);
    },
    handleDownload(index, row) {
      console.log("handleDownload-->" + index + " " + row);
    },
    handleMove(index, row) {
      console.log("handleMove-->" + index + " " + row);
    },
  },
};
</script>