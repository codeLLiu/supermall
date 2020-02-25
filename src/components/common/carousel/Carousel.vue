<template>
  <div id="hy-carousel">
    <div class="carousel" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot></slot>
    </div>
    <slot name="indicator"></slot>
    <!-- 这里是小圆圈 -->
    <div class="indicator">
      <slot name="indicator" v-if="showIndicator && slideCount>1">
        <div v-for="(item,index) in slideCount" class="indi-item" :class="{active: index === currentIndex-1}" :key="index"></div>
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "Carousel",
  props: {
    interval: {
      type: Number,
      default: 3000
    },
    animDuration: {
      type: Number,
      default: 300
    },
    moveRatio: {
      type: Number,
      default: 0.25
    },
    showIndicator: {
      type: Boolean,
      default: true
    }
  },
  data: function() {
    return {
      slideCount: 0, //元素的个数
      totalWidth: 0, //carousel的宽度
      carouselStyle: {}, //carousel的样式
      currentIndex: 1, //当前的index
      scrolling: false //是否正在滚动
    };
  },
  mounted: function() {
    setTimeout(() => {
      this.handleDom();
      this.startTimer();
    }, 200);
  },
  methods: {
    // 操作DOM，在DOM前后添加Slide
    // 如果本身有4个，相当于操作DABCDA这样子，然后每个还对应了相对的位移
    handleDom: function() {
      let carouselEl = document.querySelector(".carousel");
      let slidesEls = carouselEl.getElementsByClassName("slide");
      this.slideCount = slidesEls.length;

      if (this.slideCount > 1) {
        let cloneFirst = slidesEls[0].cloneNode(true);
        let cloneLast = slidesEls[this.slideCount - 1].cloneNode(true);

        carouselEl.insertBefore(cloneLast, slidesEls[0]);
        carouselEl.appendChild(cloneFirst);

        this.totalWidth = carouselEl.offsetWidth;
        this.carouselStyle = carouselEl.style;
      }
      // console.log(this.totalWidth); //320
      this.setTransform(-this.totalWidth);
    },
    //设置滚动的位置（位移）
    setTransform(position) {
      this.carouselStyle.transform = `translate3d(${position}px,0,0)`;
      this.carouselStyle[
        "-webkit-transform"
      ] = `translate3d(${position}px,0,0)`;
      this.carouselStyle["-ms-transform"] = `translate3d(${position}px,0,0)`;
      //  console.log(this.currentIndex)
      // console.log(this.carouselStyle.transform)
      // console.log(this.carouselStyle)
    },
    //定时器开始
    startTimer() {
      // console.log(this.playTimer);
      this.playTimer = window.setInterval(() => {
        this.currentIndex++;
        this.scrollContent(-this.currentIndex * this.totalWidth);
      }, this.interval);
    },
    // 停止定时器
    stopTimer() {
      window.clearInterval(this.playTimer);
    },
    // 滚轮到正确位置，设置了滚动状态，位移的过渡的长度，当滚到最后一个或者第一个的操作
    scrollContent(currentPosition) {
      // 设置正在滚动
      this.scrolling = true;

      // 滚动的过渡时间,注意这里的transform后面有个空格
      this.carouselStyle.transition = "transform " + this.animDuration + "ms";
      // 传入滚动的位移
      this.setTransform(currentPosition);
      //判断滚轮滚到的位置，如果是在头和尾要进行处理
      this.checkPosition();
      // 滚动完成
      this.scrolling = false;
    },
    // 校验滚动在头和尾的位置操作
    checkPosition() {
      window.setTimeout(() => {
        // this.carouselStyle.transition = "0ms";
        // DABCDA，当到了A的时候，在跳转到第一A，并设第一个A的位置
        if (this.currentIndex >= this.slideCount + 1) {
          // 这里设置过渡时间为0，这样就马上切换图片，而看不出
          this.carouselStyle.transition = "0ms";
          this.currentIndex = 1;
          this.setTransform(-this.currentIndex * this.totalWidth);
        } else if (this.currentIndex <= 0) {
          // DABCDA，当到了第一D的时候，在跳转到第二个D，并设第二个D的位置
          this.carouselStyle.transition = "0ms";
          this.currentIndex = this.slideCount;
          this.setTransform(-this.currentIndex * this.totalWidth);
        }

        // 结束移动后的回调
        // this.$emit('transitionEnd',this.currentIndex-1);
      }, this.animDuration);
    },
    // 拖动事件处理
    touchStart(e) {
      // 当触点与触控设备表面接触时触发touchstart 事件.
      // console.log(this.scrolling);
      //如果正在滚动，不可以拖动
      if (this.scrolling) return;

      // 停止定时器
      this.stopTimer();

      //对这个vue定了startX的属性，并把一开始的触摸点的绝对X坐标赋值，坐标包括滚动条的值
      //保存开始滚动的位置
      this.startX = e.touches[0].pageX;
      // console.log('startX '+this.startX);
    },
    touchMove(e) {
      //touchMove的e.touches[0].pageX记录了滑动整个路径的横坐标pageX
      this.currentX = e.touches[0].pageX;
      // console.log('currentX '+this.currentX);

      // 这里记录开始到滑到最后的距离值,这个值是一直计算的
      this.distance = this.currentX - this.startX;
      // console.log("distance " + this.distance);
      //获取当前图片的位置
      let currentPosition = -this.currentIndex * this.totalWidth;

      let moveDistance = this.distance + currentPosition;

      //渲染你拖动的位置
      this.setTransform(moveDistance);
    },
    touchEnd(e) {
      // 获取移动的位置，返回的是绝对值
      // console.log(this.scrolling);
      let currentMove = Math.abs(this.distance);

      // 判断是向左移动还是向右移动,设置下标
      if (this.distance === 0) {
        return;
      } else if (
        this.distance > 0 &&
        currentMove > this.totalWidth * this.moveRatio
      ) {
        // 右边移动超过0.5
        this.currentIndex--;
      } else if (
        this.distance < 0 &&
        currentMove > this.totalWidth * this.moveRatio
      ) {
        // 向左移动超过0.5
        this.currentIndex++;
      }

      //根据下标渲染位置
      // this.setTransform(-this.currentIndex * this.totalWidth);
      this.scrollContent(-this.currentIndex * this.totalWidth);
      this.startTimer();
    },
    pervious() {
      this.changeItem(-1);
    },
    next() {
      this.changeItem(1);
    },
    changeItem(num) {
      this.stopTimer();

      this.currentIndex += num;
      this.scrollContent(-this.currentIndex * this.totalWidth);

      this.startTimer();
    }
  }
};
</script>
<style scoped>
#hy-carousel {
  /* background-color: blue; */
  /* height: 150px; */
  position:relative;
  overflow: hidden;
}
.carousel {
  /* background-color: green; */
  /* height: 150px; */
  display: flex;
}
.indicator {
  display: flex;
  justify-content: center;
  position: absolute;
  width:100%;
  /* border:1px solid red; */
  bottom: 8px;
}
.indi-item{
  width:8px;
  height: 8px;
  border-radius: 4px;
  background-color: #fff;
  line-height: 8px;
  box-sizing: border-box;
  /* text-align: center;
  font-size: 12px; */
  margin: 0 5px;
}
.indi-item.active{
  background-color: rgba(212, 62, 46, 1.0);
}
</style>