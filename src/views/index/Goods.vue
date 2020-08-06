<template>
  <div class="goods">
    <div class="title">
      <h1>手机</h1>
    </div>
    <div class="goods-box">
      <div class="box-left">
        <a href="/#/product/35">
          <img src="/imgs/mix-alpha.jpg" alt="" />
        </a>
      </div>
      <div class="box-list">
        <div class="list" v-for="(list, index) in phoneList" :key="index">
          <div class="list-item" v-for="(item, index) in list" :key="index">
            <span :class="{ 'new-pro': index % 2 == 0 }">新品</span>
            <a :href="'/#/product/' + item.id">
              <img :src="item.mainImage" alt="" />
            </a>
            <div class="info">
              <h3>{{ item.name }}</h3>
              <p>{{ item.subtitle }}</p>
              <p class="price" @click="$emit('addCart',item.id)">{{ item.price }}元</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Goods',
  props: {
    phoneList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {

  }
}

</script>
<style scoped lang='scss'>
@import 'assets/myscss/mixin';
.goods {
  .title {
    height: 60px;
    line-height: 60px;
  }
  .goods-box {
    display: flex;
    .box-left {
      width: 224px;
      margin-right: 16px;
      img {
        width: 100%;
        height: 619px;
      }
    }
    .box-list {
      flex: 1;
      .list {
        display: flex;
        justify-content: space-between;
        margin-bottom: 14px;
        &:last-child {
          margin-bottom: 0;
        }
        .list-item {
          width: 236px;
          height: 302px;
          background-color: #fff;
          text-align: center;
          .new-pro {
            background-color: #7ecf68;
          }
          span {
            font-size: 14px;
            display: inline-block;
            width: 60px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            color: #fff;
          }
          img {
            // margin-top: 2px;
            width: 236px;
            height: 195px;
          }
          .info {
            text-align: center;
            h3 {
              margin-bottom: 5px;
            }
            p {
              color: #999;
            }
            .price {
              font-size: 14px;
              font-weight: bold;
              color: #f20a0a;
              margin-top: 10px;
              cursor: pointer;
              &::after {
                content: '';
                @include bgImg(22px, 22px, '/imgs/icon-cart-hover.png');
                vertical-align: middle;
                margin-left: 5px;
              }
            }
          }
        }
      }
    }
  }
}
</style>