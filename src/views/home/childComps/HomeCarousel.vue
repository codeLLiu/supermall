<template>
  <carousel>
    <!-- <carousel-item>
      <img src="~assets/img/home/1.jpg" />
    </carousel-item>
    <carousel-item>
      <img src="~assets/img/home/2.jpg" />
    </carousel-item>
    <carousel-item>
      <img src="~assets/img/home/3.jpg" />
    </carousel-item>
    <carousel-item>
      <img src="~assets/img/home/4.jpg" />
    </carousel-item> -->
    <carousel-item v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image"/>
      </a>
    </carousel-item>
  </carousel>
</template>
<script>
import Carousel from "components/common/carousel/Carousel";
import CarouselItem from "components/common/carousel/CarouselItem";

export default {
  name: "HomeCarousel",
  components: {
    Carousel,
    CarouselItem
  },
  props:{
    banners: Array
  }
};
</script>
<style scoped>
</style>