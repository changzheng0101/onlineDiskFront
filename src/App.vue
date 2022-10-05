<template>
  <div id="app">
    <header-vue></header-vue>
    <router-view />
  </div>
</template>

<script>
import HeaderVue from "./components/Header.vue";
export default {
  components: {
    HeaderVue,
  },
};
</script>

<style>
</style>