<template>
  <el-menu class="el-menu-vertical-demo" :default-active="activeIndex" :router="true" :collapse="isCollapse"
    background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
    <div class="fold-wrapper">
      <el-icon v-if="isCollapse" @click="toggleNav">
        <Expand />
      </el-icon>
      <el-icon v-if="!isCollapse" @click="toggleNav">
        <Fold />
      </el-icon>
    </div>

    <el-menu-item index="0" :route="{ name: 'Home', query: { fileType: 0, filePath: '/' } }">
      <el-icon>
        <Menu />
      </el-icon>
      <template #title>全部</template>
    </el-menu-item>
    <el-menu-item index="1" :route="{ name: 'Home', query: { fileType: 1 } }">
      <el-icon>
        <PictureFilled />
      </el-icon>
      <template #title>图片</template>
    </el-menu-item>
    <el-menu-item index="2" :route="{ name: 'Home', query: { fileType: 2 } }">
      <el-icon>
        <Document />
      </el-icon>
      <template #title>文档</template>
    </el-menu-item>
    <el-menu-item index="3" :route="{ name: 'Home', query: { fileType: 3 } }">
      <el-icon>
        <VideoCameraFilled />
      </el-icon>
      <template #title>视频</template>
    </el-menu-item>
    <el-menu-item index="4" :route="{ name: 'Home', query: { fileType: 4 } }">
      <el-icon>
        <Headset />
      </el-icon>
      <template #title>音乐</template>
    </el-menu-item>
    <el-menu-item index="5" :route="{ name: 'Home', query: { fileType: 5 } }">
      <el-icon>
        <TakeawayBox />
      </el-icon>
      <template #title>其他</template>
    </el-menu-item>
  </el-menu>
</template>
  
<script>
export default {
  name: "SideMenu",
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    toggleNav() {
      this.isCollapse = !this.isCollapse;
    },
  },
  created() {
    if (!this.$router.query) {
      this.$router.replace({
        name: "Home",
        query: { fileType: 0, filePath: "/" },
      });
    }
  },
  computed: {
    // 当前激活菜单的 index
    activeIndex() {
      return String(this.$route.query.fileType); //  获取当前路由参数中包含的文件类型
    },
  },
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-width: 200px;
  min-height: 100vh;
}

.el-menu--collapse {
  min-height: 100vh;
}

.fold-wrapper {
  font-size: 2rem;
  color: aliceblue;
  text-align: right;
  cursor: pointer;
  padding: 0 20px;
  height: 56px;
  line-height: 56px;
}

.fold-wrapper:hover {
  color: grey;
}
</style>