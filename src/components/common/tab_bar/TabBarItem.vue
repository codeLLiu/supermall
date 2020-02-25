<template>
  <div class="tab-bar-item" @click="btnClick()">
    <div v-show="!isActive">
      <slot name="tab-icon"></slot>
    </div>
    <div v-show="isActive">
      <slot name="tab-icon-active"></slot>
    </div>
    <div :style="activeColor">
      <slot name="tab-text"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabBarItem",
  data(){
      return {
        //   isActive: true
      }
  },
  props:{
      link: String,
      active_color:{
          type: String,
          default: 'red'
      }
  },
  methods:{
      btnClick(){ 
          this.$router.replace(this.link)
      }
  },
  computed:{
      isActive(){
        // return  this.$route.path == this.link
        return this.link.indexOf(this.$route.path) != -1
      },
    activeColor(){
        return this.isActive ? {color: this.active_color} : {}
    }
  }
};
</script>
<style scoped>
.tab-bar-item {
  font-size: 14px;
  flex: 1;
  text-align: center;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-top: 3px;
  margin-bottom: 2px;
}
.active{
    color:red
}
</style>