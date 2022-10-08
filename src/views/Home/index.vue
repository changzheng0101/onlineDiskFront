<template>
  <div class="home">
    <side-menu-vue class="home-left"></side-menu-vue>
    <div class="home-right">
      <div class="operation-wrapper">
        <operation-menu-vue
          :fileType="fileType"
          :filePath="filePath"
          @getTableData="getFileData"
          @handleUploadFile="handleUploadFile"
        ></operation-menu-vue>
        <select-column-vue></select-column-vue>
      </div>
      <bread-crumb-vue :fileType="fileType"></bread-crumb-vue>
      <file-table-vue
        :tableData="tableData"
        :loading="loading"
      ></file-table-vue>
      <file-pagination-vue
        :pageData="pageData"
        @changePageData="changePageData"
      ></file-pagination-vue>
      <file-uploader-vue
        ref="globalUploader"
        @getTableData="getFileData"
      ></file-uploader-vue>
    </div>
  </div>
</template>
  
  <script>
import { getFileListByPath, getFileListByType } from "@/request/file.js";
import BreadCrumbVue from "./components/BreadCrumb.vue";
import FilePaginationVue from "./components/FilePagination.vue";
import FileTableVue from "./components/FileTable.vue";
import FileUploaderVue from "./components/FileUploader.vue";
import OperationMenuVue from "./components/OperationMenu.vue";
import SelectColumnVue from "./components/SelectColumn.vue";
import SideMenuVue from "./components/SideMenu.vue";
export default {
  name: "Home",
  components: {
    SideMenuVue,
    BreadCrumbVue,
    FileTableVue,
    FilePaginationVue,
    SelectColumnVue,
    OperationMenuVue,
    FileUploaderVue,
  },
  data() {
    return {
      loading: false,
      tableData: [], //  文件列表
      pageData: {
        currentPage: 1, //   页码
        pageCount: 20, //  每页显示条目个数
        total: 0, //  总数
      },
    };
  },

  mounted() {
    this.getFileData(); //  获取文件列表
  },
  computed: {
    fileType() {
      return this.$route.query.fileType
        ? Number(this.$route.query.fileType)
        : 0;
    },
    filePath() {
      return this.$route.query.filePath;
    },
  },
  watch: {
    filePath() {
      if (this.fileType === 0) {
        this.getFileData(); //  获取文件列表
      }
    },
  },
  methods: {
    // 获取文件列表
    getFileData() {
      this.loading = true; // 打开表格loading状态
      if (this.fileType === 0) {
        // 左侧菜单选择的为 全部 时，根据路径，获取文件列表
        this.loading = false;
        this.getFileDataByPath();
      } else {
        // 左侧菜单选择的为 除全部以外 的类型时，根据类型，获取文件列表
        this.getFileDataByType();
      }
    },
    // 根据路径获取文件列表
    getFileDataByPath() {
      getFileListByPath({
        filePath: this.filePath,
        currentPage: this.pageData.currentPage,
        pageCount: this.pageData.pageCount,
      }).then(
        (res) => {
          this.loading = false; //  关闭表格loading状态
          if (res.success) {
            this.tableData = res.data.list; // 表格数据赋值
            this.pageData.total = res.data.total; //  分页组件 - 文件总数赋值
          } else {
            this.$message.error(res.message);
          }
        },
        (error) => {
          this.loading = false;
          console.log(error);
        }
      );
    },
    // 根据类型获取文件列表
    getFileDataByType() {
      getFileListByType({
        fileType: this.fileType, //  文件类型
        currentPage: this.pageData.currentPage, //  当前页码
        pageCount: this.pageData.pageCount, //  每页条目数
      }).then(
        (res) => {
          this.loading = false; //  关闭表格loading状态
          if (res.success) {
            this.tableData = res.data.list; // 表格数据赋值
            this.pageData.total = res.data.total; //  分页组件 - 文件总数赋值
          } else {
            this.$message.error(res.message);
          }
        },
        (error) => {
          this.loading = false;
          console.log(error);
        }
      );
    },
    // 分页组件 - 页码或当页条目数改变时
    changePageData(pageData) {
      this.pageData.currentPage = pageData.currentPage; // 页码赋值
      this.pageData.pageCount = pageData.pageCount; //  每页条目数赋值
      this.getFileData(); // 获取文件列表
    },
  },
};
</script>
<style scoped>
.home {
  display: flex;
}

.home-right {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
}

.operation-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
}
</style>