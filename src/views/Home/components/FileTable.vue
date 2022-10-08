<template>
  <el-table :data="tableData" @selection-change="handleSelectRow">
    <!-- 勾选框 -->
    <el-table-column
      type="selection"
      width="56"
      align="center"
    ></el-table-column>
    <el-table-column label prop="isDir" width="60" align="center">
      <template v-slot="scope">
        <img :src="setFileImg(scope.row)" style="width: 30px" />
      </template>
    </el-table-column>
    <el-table-column
      prop="fileName"
      label="文件名"
      v-if="selectedColumnList.includes('extendName')"
    >
      <template v-slot="scope">
        <div style="cursor: pointer" @click="handleFileNameClick(scope.row)">
          {{ scope.row.fileName }}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="所在路径" prop="filePath" v-if="fileType !== 0">
      <template v-slot="scope">
        <div
          style="cursor: pointer"
          title="点击跳转"
          @click="
            $router.push({
              query: { fileType: 0, filePath: scope.row.filePath },
            })
          "
        >
          {{ scope.row.filePath }}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="extendName" label="类型" width="100">
      <template v-slot="scope">
        <span>{{
          scope.row.extendName ? scope.row.extendName : "文件夹"
        }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="fileSize"
      label="大小"
      width="60"
      v-if="selectedColumnList.includes('fileSize')"
    >
      <template v-slot="scope">
        <span>{{ calculateFileSize(scope.row.fileSize) }}</span>
      </template>
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
            v-if="scope.row.isDir === 0"
          >
            <a
              :href="`/api/filetransfer/downloadfile?userFileId=${scope.row.userFileId}`"
              target="_blank"
              style="display: block; color: inherit"
              >下载</a
            ></el-button
          >
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>
  
<script>
import { deleteFile, renameFile } from "../../../request/file";
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
    fileType: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      //  文件图片Map映射
      fileImgMap: {
        apk: require("@/assets/image/apk.png"),
        csv: require("@/assets/image/csv.png"),
        doc: require("@/assets/image/doc.png"),
        excel: require("@/assets/image/excel.png"),
        exe: require("@/assets/image/exe.png"),
        fold: require("@/assets/image/fold.png"),
        gif: require("@/assets/image/gif.png"),
        html: require("@/assets/image/html.png"),
        json: require("@/assets/image/json.png"),
        mp3: require("@/assets/image/mp3.png"),
        mp4: require("@/assets/image/mp4.png"),
        other: require("@/assets/image/other.png"),
        pdf: require("@/assets/image/pdf.png"),
        ppt: require("@/assets/image/ppt.png"),
        rar: require("@/assets/image/rar.png"),
        svg: require("@/assets/image/svg.png"),
        txt: require("@/assets/image/txt.png"),
        zip: require("@/assets/image/zip.png"),
      },
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
    //  计算文件大小
    calculateFileSize(size) {
      const B = 1024;
      const KB = Math.pow(1024, 2);
      const MB = Math.pow(1024, 3);
      const GB = Math.pow(1024, 4);
      if (!size) {
        return "_";
      } else if (size < KB) {
        return (size / B).toFixed(0) + "KB";
      } else if (size < MB) {
        return (size / KB).toFixed(1) + "MB";
      } else if (size < GB) {
        return (size / MB).toFixed(2) + "GB";
      } else {
        return (size / GB).toFixed(3) + "TB";
      }
    },
    // 文件名点击事件
    handleFileNameClick(row) {
      //  若是目录则进入目录
      if (row.isDir) {
        this.$router.push({
          query: {
            filePath: `${row.filePath}${row.fileName}/`,
            fileType: 0,
          },
        });
      }
    },
    handleDelete(index, row) {
      // 消息弹框提示用户
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 确定按钮 点击事件 调用删除文件接口
          deleteFile(row).then((res) => {
            if (res.success) {
              this.$emit("getTableData"); //  刷新文件列表
              this.$message.success("删除成功");
            } else {
              this.$message.error(res.message);
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
    handleRename(index, row) {
      let fileName = row.fileName;
      this.$prompt("请输入文件名", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: fileName,
        inputPattern: /\S/, //  文件名不能为空
        inputErrorMessage: "请输入文件名",
        closeOnClickModal: false,
      })
        .then(({ value }) => {
          // 确定按钮 调用重命名接口
          renameFile({
            ...row,
            fileName: value,
          }).then((res) => {
            if (res.success) {
              this.$emit("getTableData"); //  刷新文件列表
              this.$message.success("文件已重命名");
            } else {
              this.$message.error(res.message);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消",
          });
        });
    },
    handleDownload(index, row) {
      console.log("handleDownload-->" + index + " " + row);
    },
    handleMove(index, row) {
      this.$emit("handleSelectFile", false, row); // true/false 操作类型：批量移动/单文件操作；row 当前行文件数据
      this.$emit("handleMoveFile", true); // true/false 打开/关闭移动文件对话框
    },
    handleSelectRow(selection) {
      this.$emit("handleSelectFile", true, selection); // true/false 批量移动/单文件操作；selection 勾选的表格行数据
    },
    //  根据文件扩展名设置文件图片
    setFileImg(row) {
      if (!row.extendName) {
        //  文件夹
        return this.fileImgMap.fold;
      } else if (["jpg", "png", "jpeg"].includes(row.extendName)) {
        // 图片类型，直接显示缩略图
        return this.downloadImgMin(row);
      } else {
        const fileTypeMap = {
          pptx: "ppt",
          doc: "word",
          docx: "doc",
          xls: "excel",
          xlsx: "excel",
        };
        //  可以识别文件类型的文件
        return (
          this.fileImgMap[row.extendName] ||
          this.fileImgMap[fileTypeMap[row.extendName]] ||
          this.fileImgMap.other
        );
      }
    },
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>