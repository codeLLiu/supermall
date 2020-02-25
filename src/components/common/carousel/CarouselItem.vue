<template>
  <div class="slide">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "CarouselItem"
};
</script>
<style scoped>
.slide {
  width:100%;
  /* background-color: red; */
  flex-shrink: 0;
}
.slide img {
  width: 100%;
  /* background-color: yellow; */
}
</style>