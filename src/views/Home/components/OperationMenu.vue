<template>
  <div class="operation-menu-wrapper" v-if="filePath">
    <!-- 按钮组 -->
    <el-button-group class="operate-group">
      <!-- disabled 只在全部类型页面 才可新建文件夹 -->
      <el-button size="small" type="primary" icon="plus" :disabled="fileType !== 0"
        @click="addFolderDialog.visible = true">新建文件夹</el-button>
      <el-button size="small" type="primary" icon="upload" @click="handleUploadFileClick()" :disabled="fileType !== 0">
        上传文件</el-button>
      <el-button size="small" type="primary" icon="delete" :disabled="!selectedFiles.length"
        @click="handleDeleteFileClick()">删除</el-button>
      <!-- disabled 当表格勾选项为空时，禁用移动按钮 | v-if 当左侧菜单选择全部时，才显示移动按钮 -->
      <el-button size="small" type="primary" icon="rank" :disabled="!selectedFiles.length" v-if="fileType === 0"
        @click="handleMoveFileClick()">移动</el-button>
      <el-button size="small" type="primary" icon="download" :disabled="!selectedFiles.length"
        @click="handleDownloadFileClick()">下载</el-button>
    </el-button-group>

    <!-- 对话框 - 新建文件夹 -->
    <!-- @closed 对话框关闭动画结束时 重置表单并清空所有表单校验 -->
    <el-dialog title="新建文件夹" width="600px" v-model="addFolderDialog.visible"
      @closed="$refs.addFolderForm.resetFields()">
      <el-form :model="addFolderForm" :rules="addFolderRules" label-position="top" ref="addFolderForm">
        <el-form-item label="文件夹名称" prop="name">
          <el-input v-model="addFolderForm.name"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="addFolderDialog.visible = false">取 消</el-button>
        <el-button type="primary" :loading="addFolderDialog.loading" @click="handleAddFolderSubmit('addFolderForm')">提 交
        </el-button>
      </template>
    </el-dialog>

    <!-- 多选文件下载，页面隐藏,通过模仿点击a标签进行下载 -->
    <a v-for="(item, index) in selectedFiles" :key="index"
      :href="`http://localhost:8081/localFile/downloadFile/logo.jpg`" download :ref="`downloadLink${index}`"></a>
  </div>
</template>
  
<script>
import { batchDeleteFile, createFile } from "@/request/file.js";

export default {
  name: "OperationMenu",
  props: {
    // 文件类型
    fileType: {
      type: Number,
      required: true,
    },
    // 文件路径
    filePath: {
      required: true,
    },
  },
  data() {
    return {
      // 新建文件夹对话框数据
      addFolderDialog: {
        visible: false, //  对话框显隐状态
        loading: false,
      },
      // 新建文件夹表单
      addFolderForm: {
        name: "",
      },
      // 新建文件夹表单校验规则
      addFolderRules: {
        name: [
          {
            required: true,
            message: "请输入文件夹名称",
            trigger: "blur, change",
          },
        ],
      },
    };
  },
  computed: {
    selectedFiles() {
      return this.$store.getters.selectedFiles;
    },
  },
  methods: {
    // 新建文件夹对话框 - 提交按钮
    handleAddFolderSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addFolderDialog.loading = true; //  对话框的确定按钮打开loading状态
          // 表单校验通过 - 调用新建文件夹接口
          createFile({
            fileName: this.addFolderForm.name,
            filePath: this.filePath, //  文件路径
            isDir: 1, //  是否为文件夹：1 表示文件夹 0 表示文件
          }).then(
            (res) => {
              this.addFolderDialog.loading = false; //  对话框的确定按钮关闭loading状态
              if (res.success) {
                this.$message.success("添加成功");
                this.addFolderDialog.visible = false; //  关闭对话框
                this.$emit("getTableData"); // 重新获取文件列表
              } else {
                this.$message.warning(res.message);
              }
            },
            (error) => {
              this.addFolderDialog.loading = false; //  对话框的确定按钮关闭loading状态
              console.log(error);
            }
          );
        } else {
          return false;
        }
      });
    },
    handleUploadFileClick() {
      this.$emit("handleUploadFile", true);
    },
    // 删除文件按钮 - 点击事件
    handleDeleteFileClick() {
      // 消息弹框提示用户
      this.$confirm("此操作将永久删除文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 确定按钮 点击事件 调用批量删除文件接口
          batchDeleteFile({
            files: JSON.stringify(this.selectedFiles),
          }).then((res) => {
            if (res.success) {
              this.$message({
                message: res.message,
                type: "success",
              });
              this.$emit("getTableData"); //  刷新文件列表
            } else {
              this.$message.error("失败" + res.message);
            }
          });
        })
        .catch(() => {
          //  取消
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 移动文件按钮 - 点击事件
    handleMoveFileClick() {
      this.$emit("handleMoveFile", true); // true/false 打开/关闭移动文件对话框
    },
    // 下载文件按钮 - 模仿一系列点击事件来下载
    handleDownloadFileClick() {
      console.log(this.$store.getters.selectedFiles);
      // console.log(JSON.stringify(this.$store.getters.selectedFiles));
      console.log(JSON.stringify(this.$store.getters.selectedFiles));
      // for (let i = 0; i < this.operationFileList.length; i++) {
      //   console.log(this.operationFileList[i].values);
      //   this.$refs[`downloadLink${i}`][0].click(); //  依次调用 a 标签的点击事件来下载文件
      // }
    },
  },
};
</script>