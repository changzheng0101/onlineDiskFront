<!-- eslint-disable vue/no-mutating-props -->
<template>
  <!-- 移动文件-选择目录模态框 -->
  <el-dialog title="选择目录" v-model="dialogMoveFile.visible" width="600px">
    <div class="el-dialog-div">
      <el-tree
        :data="dialogMoveFile.fileTree"
        :props="defaultProps"
        :highlight-current="true"
        default-expand-all
        @node-click="selectNodeClick"
      ></el-tree>
    </div>
    <template #footer class="dialog-footer">
      <el-button @click="$emit('handleMoveFile', false)">取 消</el-button>
      <el-button type="primary" @click="$emit('confirmMoveFile')"
        >确 定</el-button
      >
    </template>
  </el-dialog>
</template>
  
<script>
export default {
  name: "MoveFileDialog",
  props: {
    dialogMoveFile: Object,
  },
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    //  移动文件模态框：选择目录事件
    selectNodeClick(data) {
      let selectFilePath = data.attributes.filePath
        ? data.attributes.filePath
        : "/";
      console.log(selectFilePath);
      this.$emit("setSelectFilePath", selectFilePath);
    },
  },
};
</script>
  
<style  scoped>
</style>