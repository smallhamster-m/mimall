<template>
  <div class="swiper-box">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item, index) in slideList" :key="index">
        <a v-bind:href="'/#/product/' + item.id"
          ><img v-bind:src="item.img"
        /></a>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  name: 'mySwiper',
  components: {
    swiper,
    swiperSlide
  },
  props: {
    slideList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      swiperOption: {
        autoplay: true,
        loop: true,
        effect: 'cube',
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      },

    }
  }

}

</script>
<style lang='scss' scoped>
.swiper-button-prev {
  left: 274px;
}
.swiper-box {
  width: 1226px;
  margin: 0 auto;
  img {
    width: 100%;
    height: 451px;
  }
}
</style>