<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">
        <swiper-menu class="swiper-menu"></swiper-menu>
        <my-swiper class="my-swiper" :slideList="slideList"></my-swiper>
      </div>
      <advert></advert>
      <banner></banner>
    </div>
    <div class="product-box">
      <div class="container">
        <goods :phoneList="phoneList" @addCart="addCart"></goods>
      </div>
    </div>
    <modal
      title="提示"
      btnType="3"
      sureText="查看购物车"
      cancelText="关闭"
      :isShow="isShow"
      @close="isShow = false"
      @submit="goToCart"
    >
      <template v-slot:body><p>商品添加成功！</p></template>
    </modal>
  </div>
</template>

<script>
import mySwiper from './mySwiper'
import SwiperMenu from './SwiperMenu'
import Advert from './Advert'
import Banner from './Banner'
import Goods from './Goods'
import Modal from 'components/Modal'

export default {
  name: 'Index',
  components: {
    mySwiper,
    SwiperMenu,
    Advert,
    Banner,
    Goods,
    Modal
  },
  data() {
    return {
      slideList: [
        {
          id: '42',
          img: '/imgs/slider/slide-1.jpg'
        },
        {
          id: '45',
          img: '/imgs/slider/slide-2.jpg'
        },
        {
          id: '46',
          img: '/imgs/slider/slide-3.jpg'
        },
        {
          id: '',
          img: '/imgs/slider/slide-4.jpg'
        },
        {
          id: '',
          img: '/imgs/slider/slide-1.jpg'
        }
      ],
      phoneList: [],
      isShow: false
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.axios.get('/products', { 
        params: {
          categoryId: 100012,
          pageSize: 14
        }
      }).then(res => {
        res.list = res.list.slice(6, 14);
        this.phoneList = [res.list.slice(0, 4), res.list.slice(4, 8)];
      })
    },
    addCart(id) {
      this.axios.post('/carts', {
        productId: id,
        selected: true
      }).then(res => {
        this.isShow = true
        this.$store.dispatch('saveCartCount', res.cartTotalQuantity);
      })
    },
    goToCart() {
      this.$router.push('/cart')
    }
  }
}

</script>
<style scoped lang='scss'>
@import 'assets/myscss/base';
@import 'assets/myscss/mixin';
.index {
  .container {
    .swiper-box {
      @include position();
      .swiper-menu {
        @include position(absolute, 0, 0);
        z-index: 9;
      }
    }
  }
  .product-box {
    background-color: #f5f5f5;
    // height: 1000px;
    // margin-bottom: 50px;
    padding-bottom: 50px;
  }
}
</style>