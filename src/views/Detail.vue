<template>
  <div class="detail">
    <product-nav :productInfo="productInfo"></product-nav>
    <div class="wrapper">
      <div class="container cl">
        <div class="swiper-box">
          <swiper :options="swiperOption">
            <swiper-slide v-for="(item, index) in swiperImgs" :key="index">
              <img :src="item" />
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
        <div class="content">
          <h1 class="item-title">{{ productInfo.name }}</h1>
          <p class="item-info">
            相机全新升级 / 960帧超慢动作 / 手持超级夜景 / 全球首款双频GPS /
            骁龙845处理器 / 红外人脸解锁 / AI变焦双摄 / 三星 AMOLED 屏
          </p>
          <div class="item-delivery">小米自营</div>
          <div class="item-price">
            {{ productInfo.price }}元<span class="del">1999元</span>
          </div>
          <div class="item-line"></div>
          <div class="item-addr">
            <span class="icon-addr"></span
            ><span>北京 北京市 朝阳区 安定门街道</span>
            <div class="stock">有现货</div>
          </div>
          <div class="item-version cl">
            <h3>选择版本</h3>
            <div
              class="phone fl"
              :class="{ checked: version == 1 }"
              @click="version = 1"
            >
              6GB+64GB 全网通
            </div>
            <div
              class="phone fr"
              :class="{ checked: version == 2 }"
              @click="version = 2"
            >
              4GB+64GB 移动4G
            </div>
          </div>
          <div class="item-color">
            <h3>选择颜色</h3>
            <div class="phone checked">
              <span class="color"></span>
              深空灰
            </div>
          </div>
          <div class="item-total">
            <div class="phone-info cl">
              <div class="fl">
                {{ productInfo.name }}
                {{ version == 1 ? '6GB+64GB 全网通' : '4GB+64GB 移动4G' }}
                深灰色
              </div>
              <div class="fr">{{ productInfo.price }}元</div>
            </div>
            <div class="phone-total">总计：{{ productInfo.price }}元</div>
          </div>
          <div class="item-btn">
            <a href="javascript:;" class="btn btn-huge" @click="addCart"
              >加入购物车</a
            >
          </div>
        </div>
      </div>
    </div>
    <div class="price-info">
      <div class="container">
        <h2>价格说明</h2>
        <div class="desc">
          <img src="/imgs/detail/item-price.jpeg" alt="" />
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
  name: 'Detail',
  data() {
    return {
      id: this.$route.params.id,
      productInfo: {},
      swiperImgs: ["/imgs/detail/phone-1.jpg",
        "/imgs/detail/phone-2.jpg",
        "/imgs/detail/phone-3.jpg",
        "/imgs/detail/phone-4.jpg"],
      swiperOption: {
        autoplay: true,
        // loop:true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
      version: 1
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
    getProductInfo() {
      this.axios.get(`/products/${this.id}`).then(res => {
        this.productInfo = res
      })
    },
    addCart() {
      this.axios.post('/carts', {
        productId: this.id,
        selected: true
      }).then((res) => {
        // console.log(res)
        this.$store.dispatch('saveCartCount', res.cartTotalQuantity)
        this.$router.push('/cart');
      })
    }
  }
}

</script>
<style scoped lang='scss'>
@import 'assets/myscss/base';
@import 'assets/myscss/button';

.detail {
  .wrapper {
    .container {
      display: flex;
      .swiper-box {
        width: 642px;
        height: 617px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .content {
        flex: 1;
        h3 {
          margin-bottom: 20px;
        }
        .phone {
          display: inline-block;
          width: 287px;
          height: 50px;
          line-height: 50px;
          font-size: 16px;
          color: #333333;
          border: 1px solid #e5e5e5;
          box-sizing: border-box;
          text-align: center;
          cursor: pointer;
        }
        .item-title {
          font-size: 28px;
        }
        .item-info {
          font-size: 14px;
          color: #333;
          margin: 15px 0 20px;
        }
        .item-delivery {
          font-size: 16px;
          color: #ff6600;
          // margin-bottom: 1m5px;
          margin: 15px 0;
        }
        .item-price {
          color: #ff6600;
          font-size: 20px;
          margin-bottom: 15px;
          .del {
            font-size: 16px;
            color: #999;
            text-decoration: line-through;
            padding-left: 10px;
          }
        }
        .item-line {
          height: 1px;
          width: 100%;
          // border: 1px solid red;
          // color: bgcred;
          background-color: #e5e5e5;
        }
        .item-addr {
          height: 108px;
          box-sizing: border-box;
          background-color: #fafafa;
          padding-left: 30px;
          padding-top: 30px;
          margin: 30px 0;
          font-size: 14px;
          color: #666;
          border: 1px solid #e5e5e5;
          .icon-addr {
            display: inline-block;
            height: 20px;
            width: 20px;
            background: url('/imgs/detail/icon-loc.png') no-repeat center;
            vertical-align: middle;
            background-size: contain;
            padding-right: 20px;
          }
          .stock {
            color: #ff6600;
            padding-left: 40px;
            padding-top: 15px;
          }
        }
        .item-version,
        .item-color {
          font-size: 16px;
          color: #333;
          .checked {
            border: 1px solid #ff6600;
            color: #ff6600;
          }
        }
        .item-color {
          margin: 30px 0;
          .phone {
            .color {
              display: inline-block;
              width: 15px;
              height: 15px;
              background-color: #666;
              margin-right: 5px;
            }
          }
        }
        .item-total {
          height: 108px;
          padding: 25px;
          box-sizing: border-box;
          background-color: #fafafa;
          .phone-info {
            font-size: 14px;
            color: #333;
          }
          .phone-total {
            color: #ff6600;
            font-size: 24px;
            margin-top: 20px;
          }
        }
        .item-btn {
          margin: 20px 0;
        }
      }
    }
  }
  .price-info {
    height: 340px;
    background-color: #f3f3f3;
    h2 {
      font-size: 24px;
      color: #333;
      padding-top: 30px;
      margin-bottom: 30px;
    }
  }
}
</style>