<template>
  <div>
    <div class="pro-nav">
      <div class="container">
        <div class="pro-title">
          {{ productInfo.name }}
        </div>
        <div class="pro-param">
          <a href="javascript:;">概述</a>
          <span>|</span>
          <a href="javascript:;">参数</a>
          <span>|</span>
          <a href="javascript:;">用户评价</a>
          <slot name="btn"></slot>
        </div>
      </div>
    </div>
    <div class="pro-nav pronav" v-show="navShow">
      <div class="container">
        <div class="pro-title">
          {{ productInfo.name }}
        </div>
        <div class="pro-param">
          <a href="javascript:;">概述</a>
          <span>|</span>
          <a href="javascript:;">参数</a>
          <span>|</span>
          <a href="javascript:;">用户评价</a>
          <slot name="btn"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ProductNav',
  props: {
    productInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      navShow: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.initHeight)
    this.navTop = this.$el.offsetTop
  },
  destroyed() {
    window.removeEventListener('scroll', this.initHeight, false)
  },
  methods: {
    // 监听滚动的高度
    initHeight() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.navShow = scrollTop > this.navTop ? true : false
      // console.log(scrollTop)
    }
  }
}

</script>
<style scoped lang='scss'>
@import 'assets/myscss/base';
@import 'assets/myscss/mixin';
// @import 'assets/myscss/button';

.pronav {
  background-color: #fff;
  position: fixed;
  z-index: 9;
  width: 100%;
  top: 0;
  box-shadow: 0 5px 5px #cccccc;
}
.pro-nav {
  height: 70px;
  line-height: 70px;
  border-top: 1px solid #e5e5e5;
  .container {
    @include flex();
    .pro-title {
      font-weight: bold;
      font-size: 18px;
      color: #333;
    }
    .pro-param {
      a {
        font-size: 14px;
        color: #666;
      }
      span {
        // margin: 0 10px;
        padding: 0 10px;
      }
    }
  }
}
</style>