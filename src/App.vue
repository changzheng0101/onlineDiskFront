<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">首页</router-link> |
      <router-link to="/login">登录页面</router-link> |
      <router-link to="/register">注册页面</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>