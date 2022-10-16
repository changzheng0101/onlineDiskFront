<template>
  <div class="select-column">
    <el-button
      type="info"
      size="default"
      plain
      icon="el-icon-s-operation"
      @click="handleClickSelectColumn"
      >设置显示列</el-button
    >
    <!-- 对话框 当点击"设置显示列"按钮时弹出对话框 -->
    <el-dialog title="设置表格列显隐" width="40%" v-model="dialogVisible">
      <!-- 多选框组件 勾选需要在表格中显示的列 -->
      <el-checkbox-group v-model="selectedColumn">
        <el-checkbox
          v-for="item in columnOptions"
          :key="item.value"
          :label="item.value"
          >{{ item.label }}</el-checkbox
        >
      </el-checkbox-group>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogOk()">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
  
  <script>
export default {
  name: "SelectColumn",
  props: {},
  data() {
    return {
      dialogVisible: false,
      selectedColumn: [], //  被选中的表格需要显示的列
      columnOptions: [
        {
          value: "extendName",
          label: "类型",
        },
        {
          value: "fileSize",
          label: "大小",
        },
        {
          value: "uploadTime",
          label: "修改日期",
        },
      ],
    };
  },
  methods: {
    // 设置显示列按钮 - 点击事件
    handleClickSelectColumn() {
      this.selectedColumn = this.$store.getters.selectedColumnList;
      this.dialogVisible = true;
    },
    // 对话框 确定按钮
    dialogOk() {
      this.$store.commit("changeSelectedColumnList", this.selectedColumn);
      this.dialogVisible = false;
      console.log(this.selectedColumn);
    },
  },
};
</script>