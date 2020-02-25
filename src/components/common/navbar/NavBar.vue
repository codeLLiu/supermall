<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "NavBar"
};
</script>
<style scoped>
.nav-bar {
  height: 40px;
  line-height: 40px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
  font-size: var(--font-size);
  color: #fff;
  display: flex;
  text-align: center;
}
.center {
  /* background-color: palegoldenrod; */
  flex: 1;
}
.left,
.right {
  width: 60px;
  /* background-color: pink; */
}
</style> 