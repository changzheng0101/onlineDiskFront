<template>
  <el-pagination class="file-pagination" background layout="sizes, total, prev, pager, next"
    @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="pageData.currentPage"
    :page-count="pageData.pageCount" :total="pageData.total" :page-sizes="[10, 20, 50, 100]" />
</template>

<script>
export default {
  name: "FilePagination",
  props: {
    pageData: {
      type: Object,
      required: true,
    },
  },
  emits: ["changePageData"],
  data() {
    return {};
  },
  methods: {
    // 分页组件 当前页码改变
    handleCurrentChange(currentPage) {
      this.$emit("changePageData", {
        ...this.pageData,
        currentPage,
      });
    },
    // 分页组件 每页显示条目个数改变
    handleSizeChange(pageCount) {
      this.$emit("changePageData", {
        ...this.pageData,
        pageCount,
      });
    },
  },
};
</script>

<style scoped>
.file-pagination {
  margin-top: 16px;
  margin-left: auto;
  margin-right: 40px;
}
</style>