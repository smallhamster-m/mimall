<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <a href="javascript:;">小米商城</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">MIUI</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <div class="topbar-user">
          <a href="javascript:;" v-if="username">{{ username }}</a>
          <a href="javascript:;" v-if="username" @click="logout">退出登录</a>
          <a href="javascript:;" @click="login" v-if="!username">登录</a>
          <a href="/#/order/list" v-if="username">我的订单</a>
          <a href="/#/register" v-if="!username">注册</a>
          <a href="javascript:;" class="my-cart" @click="goToCart">
            <span class="icon-cart"></span>
            购物车({{ cartCount }})
          </a>
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <div class="header-logo">
          <a href=""></a>
        </div>
        <div class="header-menu">
          <div
            class="item-menu"
            @mouseover="enter(index)"
            @mouseout="leave(index)"
            v-for="(item, index) in headerMenu"
            :key="index"
          >
            <span>{{ item }}</span>
            <div class="children">
              <ul>
                <li v-for="item in productList[currentIndex]" :key="item.id">
                  <a :href="'/#/product/' + item.id" target="_blank">
                    <div class="pro-img">
                      <img
                        :src="item.mainImage"
                        :alt="item.subtitle"
                        @click="goDetail(item.id)"
                      />
                    </div>
                    <div class="pro-name">{{ item.name }}</div>
                    <div class="pro-price">{{ item.price | price }}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="header-search">
          <input type="text" />
          <a href="javascript:;"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
export default {
  name: 'NavHeader',
  data() {
    return {
      headerMenu: ['小米手机', 'RedMi红米', '小米电视'],
      isShow: false,
      productList: [],
      currentIndex: 0,
      // username: this.$store.state.username
      //(这样写不行,因为在用户刷新页面后,在App.vue中又重新拉取用户信息,请求有延迟,这样就导致了渲染后才有数据(不合理),所以就显示不出用户名。所以需要计算属性，这样当数据有了之后,才能重新渲染用户名)
    }
  },
  computed: {
    // username() {
    //   return this.$store.state.username
    // },
    // cartCount() {
    //   return this.$store.state.cartCount
    // }
    ...mapState(['username', 'cartCount'])
  },
  filters: {
    price(pri) {
      return '¥' + pri.toFixed(2) + '元'
    }
  },
  created() {
    this.getProductList()
    if (this.$cookie.get('userId')) {
      this.getCartCount() //在登录页面登录成功后跳转到首页时再获取一次购物车数量（且只有这种情况才调用），否则购物车数量为0
    }
  },
  methods: {
    ...mapActions(['saveUserName', 'saveCartCount']),
    getProductList() {
      this.axios.get('/products', {
        params: {
          categoryId: '100012',
          pageNum: 1,
          pageSize: 12
        }
      }).then(res => {
        this.productList = [res.list.slice(0, 6), res.list.slice(6, 12)]
      })
    },
    getCartCount() {
      this.axios.get('/carts/products/sum').then((res = 0) => {
        this.saveCartCount(res)
      })
    },
    enter(index) {
      // console.log(index+'鼠标进入')
      this.currentIndex = index
    },
    leave(index) {
      // console.log(index+'鼠标离开')
      this.currentIndex = index
    },
    login() {
      this.$router.push('/login')
    },
    logout() {
      this.axios.post('/user/logout').then(() => {
        this.message('退出登录成功', 'success')
        this.$cookie.set('userId', '', { expires: '-1' });
        this.saveUserName('')
        this.saveCartCount('0')
      })
    },
    goToCart() {
      this.$router.push('/cart')
    }
  }

}

</script>
<style lang="scss">
@import 'assets/myscss/config';
@import 'assets/myscss/base';
@import 'assets/myscss/mixin';
.header {
  .nav-topbar {
    height: 39px;
    line-height: 39px;
    background-color: $colorB;
    .container {
      @include flex();
      a {
        display: inline-block;
        color: #b0b0b0;
        margin-right: 17px;
      }
      .my-cart {
        width: 110px;
        background-color: $colorA;
        color: #fff;
        text-align: center;
        margin-right: 0;
        .icon-cart {
          display: inline-block;
          height: 12px;
          width: 16px;
          background: url('/imgs/icon-cart-checked.png') no-repeat center;
          background-size: contain;
        }
      }
    }
  }
  .nav-header {
    height: 112px;
    // background-color: skyblue;
    .container {
      height: 112px;
      position: relative;
      @include flex();
      .header-logo {
        height: 55px;
        width: 55px;
        background-color: $colorA;
        overflow: hidden;
        a {
          display: inline-block;
          height: 55px;
          width: 110px;
          transition: all 0.3s;
          &:before {
            content: '';
            display: inline-block;
            width: 55px;
            height: 55px;
            background: url('/imgs/mi-logo.png') no-repeat center;
            background-size: 55px;
          }
          &:after {
            content: '';
            display: inline-block;
            width: 55px;
            height: 55px;
            background: url('/imgs/mi-home.png') no-repeat center;
            background-size: 55px;
          }
          &:hover {
            margin-left: -55px;
            transition: all 0.3s;
          }
        }
      }
      .header-menu {
        flex: 1;
        height: 100%;
        padding-left: 209px;
        .item-menu {
          display: inline-block;
          margin-right: 50px;
          font-size: 16px;
          height: 112px;
          line-height: 112px;
          font-weight: bold;
          span {
            cursor: pointer;
          }
          &:hover {
            color: $colorA;
            .children {
              // background-color: #fff;
              height: 220px;
              opacity: 1;
            }
          }
          .children {
            height: 0px;
            overflow: hidden;
            opacity: 0;
            transition: all 0.5s;
            width: 1226px;
            box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
            border-top: 1px solid #e5e5e5;
            position: absolute;
            top: 112px;
            left: 0;
            display: flex;
            z-index: 10;
            background-color: #fff;
            ul {
              width: 100%;
              display: flex;
              justify-content: space-around;
              li {
                position: relative;
                height: 220px;
                text-align: center;
                a {
                  display: inline-block;
                  position: relative;
                  width: 100%;
                  height: 100%;
                  .pro-img {
                    height: 137px;
                    img {
                      width: auto;
                      height: 111px;
                      margin-top: 26px;
                    }
                  }
                  .pro-name,
                  .pro-price {
                    height: 20px;
                    line-height: 20px;
                  }
                  .pro-name {
                    font-size: 14px;
                    font-weight: bold;
                    color: #333;
                    margin: 6px 0;
                  }
                  .pro-price {
                    color: $colorA;
                    font-weight: bold;
                  }
                }
                &::after {
                  content: '';
                  position: absolute;
                  top: 28px;
                  right: -20px;
                  width: 1px;
                  // border-right: 1px solid #d7d7d7;
                  border-right: 1px solid #d7d7d7;
                  height: 100px;
                }
                &:last-child:after {
                  display: none;
                }
              }
            }
          }
        }
      }
      .header-search {
        display: flex;
        align-items: center;
        width: 319px;
        // background-color: red;
        height: 50px;
        border: 1px solid #e0e0e0;
        input {
          box-sizing: border-box;
          width: 264px;
          line-height: 50px;
          border: none;
          border-right: 1px solid #e0e0e0;
          padding-left: 14px;
        }
        a {
          display: inline-block;
          height: 18px;
          width: 18px;
          background: url('/imgs/icon-search.png') no-repeat center;
          background-size: contain;
          margin-left: 17px;
        }
      }
    }
  }
}
</style>