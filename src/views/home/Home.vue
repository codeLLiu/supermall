<template>
  <div id="home">
    <nav-bar class="home-bar">
      <div slot="center">购物车</div>
    </nav-bar>
    <home-carousel :banners="banners"></home-carousel>
    <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
import HomeCarousel from "./childComps/HomeCarousel";
import RecommendView from "./childComps/RecommendView";
import { getHomeMultidata } from "networks/home";
export default {
  name: "Home",
  components: {
    NavBar,
    HomeCarousel,
    RecommendView
  },
  data() {
    return {
      banners: [],
      recommends: []
    };
  },
  created() {
    getHomeMultidata().then(res => {
      // console.log(res.data);
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
      // console.log(this.banners);
    });
     
  }
 
};
</script>
<style scoped>
.home-bar {
  background-color: var(--color-tint);
  display: flex;
}
</style>