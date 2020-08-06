<template>
  <div class="product">
    <product-nav :productInfo="productInfo">
      <template v-slot:btn
        ><button class="btn" @click="buy">立即购买</button></template
      >
    </product-nav>
    <div class="pro-bg1">
      <h1>{{ productInfo.name }}</h1>
      <h2>{{ productInfo.subtitle }}</h2>
      <p>
        <span>全球首款双频 GP</span><span>|</span> <span>骁龙845</span
        ><span>|</span> <span>AI 变焦双摄</span><span>|</span>
        <span>红外人脸识别</span>
      </p>
      <div class="price">
        ￥<em>{{ productInfo.price }}</em>
      </div>
    </div>
    <div class="pro-bg2"></div>
    <div class="pro-bg3"></div>
    <div class="pro-swiper">
      <div class="swiper-box">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item, index) in swiperImgs" :key="index">
            <img :src="item" />
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <p>小米8 AI变焦双摄拍摄</p>
    </div>
    <div class="pro-video">
      <h1>
        60帧超慢动作摄影
        <br />
        慢慢回味每一瞬间的精彩
      </h1>
      <h2>
        后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！
        <br />
        更能AI 精准分析视频内容，15个场景智能匹配背景音效。
      </h2>
      <div class="video-bg" @click="isShow = true"></div>
      <div class="video-box">
        <div class="overlay" v-show="isShow"></div>
        <div class="video" :class="{ slide: isShow }">
          <span class="icon-close" @click="isShow = false"></span>
          <video src="/imgs/product/video.mp4" controls muted autoplay></video>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductNav from 'components/ProductNav';
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  name: 'Product',
  data() {
    return {
      swiperImgs: ["/imgs/product/gallery-2.png",
        "/imgs/product/gallery-3.png",
        "/imgs/product/gallery-4.png",
        "/imgs/product/gallery-5.jpg",
        "/imgs/product/gallery-6.jpg"],
      swiperOption: {
        autoplay: true,
        // loop:true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        slidesPerView: 3,
        spaceBetween: 30
      },
      isShow: false,
      navShow: false,
      navTop: 0,
      id: this.$route.params.id,
      productInfo: {}
    }
  },
  components: {
    ProductNav,
    swiper,
    swiperSlide
  },
  created() {
    this.getProductInfo()
  },
  methods: {
    // 获取产品信息
    getProductInfo() {
      this.axios.get(`/products/${this.id}`).then(res => {
        this.productInfo = res
      })
    },
    buy() {
      this.$router.push(`/detail/${this.id}`)
    }
  }
}

</script>
<style scoped lang='scss'>
@import 'assets/myscss/mixin';
@import 'assets/myscss/button';
.product {
  text-align: center;
  .btn {
    margin-left: 10px;
  }
  .pro-bg1 {
    @include bgImg(100%, 718px, '/imgs/product/product-bg-1.png', cover);
    h1 {
      font-size: 80px;
      padding-top: 55px;
    }
    h2 {
      font-size: 22px;
      letter-spacing: 8px;
    }
    p {
      font-size: 16px;
      color: #333;
      margin: 20px 0 40px;
      span {
        padding-right: 15px;
      }
    }
    .price {
      font-size: 30px;
      em {
        font-size: 38px;
        font-style: normal;
      }
    }
  }
  .pro-bg2 {
    @include bgImg(100%, 480px, '/imgs/product/product-bg-2.png', cover);
    background-size: 1226px auto;
  }
  .pro-bg3 {
    @include bgImg(100%, 638px, '/imgs/product/product-bg-3.png', cover);
  }
  .pro-swiper {
    margin: 36px 0 52px;
    img {
      // height: 340px;
      width: 100%;
    }
    p {
      font-size: 18px;
      color: #333;
    }
  }
  .pro-video {
    height: 1044px;
    background-color: #000;
    color: #fff;
    text-align: center;
    letter-spacing: 3px;
    h1 {
      font-size: 60px;
      padding: 40px 0 50px;
    }
    h2 {
      font-size: 24px;
      margin-bottom: 58px;
    }
    .video-bg {
      background: url('/imgs/product/gallery-1.png') no-repeat center;
      background-size: cover;
      width: 1226px;
      height: 540px;
      margin: 0 auto 120px;
      cursor: pointer;
    }
    .video-box {
      .overlay {
        @include position(fixed);
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: 0.6;
        z-index: 9;
      }
      .video {
        @include position(fixed, 50%, 50%);
        transform: translate(-50%, -50%);
        width: 1000px;
        height: 0;
        z-index: 9;
        opacity: 0;
        transition: all 0.6s;

        &.slide {
          height: 536px;
          opacity: 1;
        }
        .icon-close {
          @include bgImg(20px, 20px, '/imgs/icon-close.png', cover);
          z-index: 10;
          position: absolute;
          top: 20px;
          right: 20px;
          cursor: pointer;
        }
        video {
          width: 100%;
          height: 100%;
          outline: none;
          object-fit: cover;
        }
      }
    }
  }
}
</style>