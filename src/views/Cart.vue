<template>
  <div class="cart">
    <order-header title="我的购物车">
      <template v-slot:tip
        ><span
          >温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span
        ></template
      >
    </order-header>
    <div class="wrapper">
      <div class="container">
        <loading v-if="showLoading">
          <template v-slot:tip>
            <div>购物车加载中...</div>
          </template>
        </loading>
        <div class="cart-box">
          <ul class="box-header cl">
            <li class="col1">
              <span
                class="checkbox"
                :class="{ checked: selectedAll }"
                @click="toggleAll"
              ></span
              >全选
            </li>
            <li class="col3">商品名称</li>
            <li class="col1">单价</li>
            <li class="col2">数量</li>
            <li class="col1">小计</li>
            <li class="col1">操作</li>
          </ul>
          <ul class="box-list">
            <li class="list-item" v-for="(item, index) in list" :key="index">
              <div class="col1 item-check">
                <span
                  class="checkbox"
                  :class="{ checked: item.productSelected }"
                  @click="updateCart(item)"
                ></span>
              </div>
              <div class="col3 item-name">
                <img :src="item.productMainImage" alt="" /><span>{{
                  item.productName + ' , ' + item.productSubtitle
                }}</span>
              </div>
              <div class="col1 item-price">
                {{ item.productPrice }}
              </div>
              <div class="col2 item-num">
                <div class="num-box">
                  <a href="javascript:;" @click="updateCart(item, '-')">-</a>
                  <span>{{ item.quantity }}</span>
                  <a href="javascript:;" @click="updateCart(item, '+')">+</a>
                </div>
              </div>
              <div class="col1 item-total">{{ item.productTotalPrice }}</div>
              <div class="col1 item-del" @click="sureDel(index)"></div>
            </li>
          </ul>
          <div class="order-wrap ">
            <div class="cart-tip">
              <a href="">继续选购</a>
              共<span>{{ list.length }}</span
              >件商品，已选择<span>{{ checkedNum }}</span
              >件
            </div>
            <div class="cart-total">
              合计：<span> {{ cartTotalPrice }} </span> 元
              <a href="javascript:;" class="btn btn-large" @click="order"
                >去结算</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>

    <modal
      title="删除商品"
      btnType="3"
      :isShow="isShow"
      @submit="submit(currentDel)"
      @close="isShow = false"
    >
      <template v-slot:body>确认要删除该商品吗?</template>
    </modal>
  </div>
</template>

<script>
import OrderHeader from 'components/OrderHeader'
import NavFooter from 'components/NavFooter'
import Modal from 'components/Modal'
import Loading from 'components/Loading'

export default {
  name: 'Cart',
  components: {
    OrderHeader,
    Modal,
    NavFooter,
    Loading
  },
  data() {
    return {
      list: [],//商品列表
      cartTotalPrice: 0,//商品总价格
      selectedAll: false,//是否全选
      checkedNum: 0,//选中的数量
      isShow: false,
      currentDel: {}, //当前要删除的商品
      showLoading: true
    }
  },
  created() {
    this.getCartList()
  },
  methods: {
    // 删除按钮的点击事件
    sureDel(index) {
      this.isShow = true
      this.currentDel = this.list[index]
    },
    // 弹出的对话框的’确定按钮‘的点击事件
    submit(currentDel) {
      this.delProduct(currentDel)
      this.isShow = false
    },
    // 获取购物车列表的数据
    getCartList() {
      this.axios.get('/carts').then(res => {
        this.renderData(res)
        this.showLoading = false
      })
    },
    // 全选按钮的事件
    toggleAll() {
      this.selectedAll = !this.selectedAll
      if (this.selectedAll) {
        this.axios.put('/carts/selectAll').then((res) => {
          this.renderData(res)
        })
      } else {
        this.axios.put('/carts/unSelectAll').then((res) => {
          this.renderData(res)
        })
      }
    },
    // 删除商品方法
    delProduct(item) {
      this.isShow = true
      this.axios.delete(`/carts/${item.productId}`).then(res => {
        // alert('商品删除成功~')
        this.message('商品删除成功~', 'success')
        this.renderData(res)
      })
    },
    // 购物车数量的加减和单选的事件
    updateCart(item, type) {
      let quantity = item.quantity,
        selected = item.selected
      if (type == '+') {
        if (quantity > item.productStock) {
          this.message('当前商品的数量不能超过库存哦~', 'warning')
          return
        }
        ++quantity
      } else if (type == '-') {
        if (quantity == 1) {
          this.message('该商品数量不能在减少了哦~', 'warning')
          return
        }
        --quantity
      } else {
        selected = !item.productSelected
      }
      this.axios.put(`/carts/${item.productId}`, {
        quantity,
        selected
      }).then(res => {
        this.renderData(res)
      })
    },

    // toggleOne(item) { //单选事件
    //   item.productSelected = !item.productSelected
    //   this.axios.put(`/carts/${item.productId}`, {
    //     quantity: item.quantity,
    //     selected: item.productSelected
    //   }).then(res => {
    //     this.renderData(res)
    //   })
    // },
    // add(item) { //商品+1事件
    //   if (item.quantity <= item.productStock) {
    //     item.quantity += 1
    //     this.axios.put(`/carts/${item.productId}`, {
    //       quantity: item.quantity,
    //       selected: item.productSelected
    //     }).then(res => {
    //       this.renderData(res)
    //     })
    //   }else{
    //     alert('该商品数量已超过库存~')
    //   }
    // },
    // sub(item) { //商品-1事件
    //   if (item.quantity > 1) {
    //     item.quantity -= 1
    //     this.axios.put(`/carts/${item.productId}`, {
    //       quantity: item.quantity,
    //       selected: item.productSelected
    //     }).then(res => {
    //       this.renderData(res)
    //     })
    //   }else{
    //     alert('不能再减了哦~')
    //   }
    // },

    // 更新数据
    renderData(res) {
      this.list = res.cartProductVoList || []
      this.selectedAll = res.selectedAll
      this.cartTotalPrice = res.cartTotalPrice
      this.checkedNum = this.list.filter(item => item.productSelected).length
    },
    // 结算按钮事件
    order() {
      if (this.checkedNum) {
        this.$router.push('/order/confirm')
      } else {
        // alert('请选择一件商品哦~')
        // this.$message({
        //   showClose: true,
        //   message: '请选择一件商品哦~',
        //   type: 'warning',
        //   duration: 2000
        // })
        this.message('请选择一件商品哦~')
      }
    }
  }
}

</script>
<style scoped lang='scss'>
@import 'assets/myscss/base';
@import 'assets/myscss/button';
.cart {
  .wrapper {
    background-color: #f5f5f5;
    padding: 30px 0 114px;
    .container {
      background-color: #fff;
      .cart-box {
        font-size: 14px;
        color: #999;
        text-align: center;
        .checkbox {
          display: inline-block;
          width: 22px;
          height: 22px;
          border: 1px solid #e5e5e5;
          vertical-align: middle;
          margin-right: 17px;
          cursor: pointer;
          &.checked {
            background: url('/imgs/icon-gou.png') #ff6600 no-repeat center;
            background-size: 16px 12px;
            border: none;
          }
        }
        .box-header {
          display: flex;
          height: 79px;
          line-height: 79px;
          font-size: 16px;
        }
        .box-list {
          .list-item {
            display: flex;
            height: 125px;
            align-items: center;
            border-top: 1px solid #e5e5e5;
            .item-name {
              display: flex;
              align-items: center;
              font-size: 18px;
              color: #333;
              img {
                width: 80px;
                height: 80px;
                vertical-align: middle;
              }
            }
            .item-price {
              font-size: 16px;
              color: #333;
            }
            .item-num {
              .num-box {
                display: inline-block;
                width: 150px;
                height: 40px;
                line-height: 40px;
                border: 1px solid #e5e5e5;
                span,
                a {
                  display: inline-block;
                  font-size: 15px;
                  width: 50px;
                  height: 40px;
                  color: #333;
                }
              }
            }
            .item-total {
              font-size: 16px;
              color: #ff6600;
            }
            .item-del {
              width: 16px;
              height: 16px;
              background: url('/imgs/icon-close.png') no-repeat center;
              background-size: 14px 12px;
              cursor: pointer;
            }
          }
        }
        .order-wrap {
          background-color: #f5f5f5;
          display: flex;
          justify-content: space-between;
          height: 50px;
          line-height: 50px;
          // margin-top: 20px;
          padding-top: 25px;
          font-size: 16px;

          .cart-tip {
            margin-left: 30px;
            color: #666;
            a {
              color: #666;
              margin-right: 35px;
              letter-spacing: 2px;
            }
            span {
              color: #ff6600;
              padding: 0 10px;
              font-size: 16px;
            }
          }
          .cart-total {
            color: #ff6600;
            span {
              font-size: 26px;
            }
            a {
              margin-left: 35px;
            }
          }
        }
      }
    }
  }
}
</style>