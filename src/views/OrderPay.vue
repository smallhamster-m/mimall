<template>
  <div class="order-pay">
    <order-header title="订单支付">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-wrap">
          <div class="item-order">
            <div class="icon-succ"></div>
            <div class="order-info">
              <h2>订单提交成功！去付款咯～</h2>
              <p>请在<span>30分</span>内完成支付, 超时后将取消订单</p>
              <p>收货信息：{{ addressInfo }}</p>
            </div>
            <div class="order-total">
              <p>
                应付总额：<span>{{ payment }}</span
                >元
              </p>
              <p>
                订单详情<em
                  class="icon-down"
                  :class="{ up: showDetail }"
                  @click="showDetail = !showDetail"
                ></em>
              </p>
            </div>
          </div>
          <div class="item-detail" v-show="showDetail">
            <div class="item">
              <div class="detail-title">订单号：</div>
              <div class="detail-info theme-color">{{ orderNo }}</div>
            </div>
            <div class="item">
              <div class="detail-title">收货信息：</div>
              <div class="detail-info">
                {{ addressInfo }}
              </div>
            </div>
            <div class="item good">
              <div class="detail-title">商品名称：</div>
              <div class="detail-info">
                <ul>
                  <li v-for="(item, index) in orderItemVoList" :key="index">
                    <img :src="item.productImage" alt="" />{{
                      item.productName
                    }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="item">
              <div class="detail-title">发票信息：</div>
              <div class="detail-info">电子发票 个人</div>
            </div>
          </div>
        </div>
        <div class="item-pay">
          <h3>选择以下支付方式付款</h3>
          <div class="pay-way">
            <p>支付平台</p>
            <div
              class="pay pay-ali"
              :class="{ checked: payType == 1 }"
              @click="paySubmit(1)"
            ></div>
            <div
              class="pay pay-wechat"
              :class="{ checked: payType == 2 }"
              @click="paySubmit(2)"
            ></div>
          </div>
        </div>
        <div class="look-order">
          <a href="/#/order/list" class="btn btn-large" >我的订单</a>
        </div>
      </div>
    </div>
    <we-chat-pay
      :payImg="payImg"
      v-if="showWxPay"
      @closePay="closePay"
    ></we-chat-pay>
    <modal
      title="支付确认"
      btnType="3"
      sureText="查看订单"
      cancelText="未支付"
      :isShow="showModal"
      @close="showModal = false"
      @submit="goOrderList"
    >
      <template v-slot:body>
        <p>您确认是否完成支付？</p>
      </template></modal
    >
  </div>
</template>

<script>
import OrderHeader from 'components/OrderHeader'
import WeChatPay from 'components/WeChatPay'
import Modal from 'components/Modal'

import QRCode from 'qrcode'
export default {
  name: 'OrderPay',
  components: {
    OrderHeader,
    WeChatPay,
    Modal
  },
  data() {
    return {
      showDetail: true, //是否显示订单详情
      payType: 1, //支付方式：1支付宝 2微信
      orderNo: this.$route.query.orderNo, //订单号
      addressInfo: '', //收货信息
      orderItemVoList: [], //商品列表
      payment: 0, //订单总金额
      timer: '', //定时器
      showWxPay: false, //是否显示微信支付二维码
      payImg: '',//微信支付的二维码地址
      showModal: false, //是否显示支付确认弹框
    }
  },
  created() {
    // let
    this.getOrderDetail()
  },
  methods: {
    getOrderDetail() {
      this.axios.get(`/orders/${this.orderNo}`).then((res) => {
        let info = res.shippingVo
        this.addressInfo = `${info.receiverName} ${info.receiverMobile} ${info.receiverCity} ${info.receiverDistrict} ${info.receiverAddress} ${info.receiverZip}`
        this.orderItemVoList = res.orderItemVoList
        this.payment = res.payment
      })
    },
    paySubmit(payType) {
      this.payType = payType
      if (payType == 1) {
        this.loopOrderState()
        window.open(`/#/order/alipay?orderNo=${this.orderNo}`, '_blank')
      } else {
        this.showWxPay = true
        this.axios.post('/pay', {
          orderId: this.orderNo,
          orderName: 'Vue 小米商城', //扫码支付时订单名称
          amount: 0.01,//单位元
          payType: 2 //1支付宝，2微信
        }).then(res => {
          QRCode.toDataURL(res.content)
            .then(url => {
              this.payImg = url
              this.loopOrderState()
            })
            .catch(() => {
              this.message('微信支付二维码生成失败，请稍后重试', 'error')
            })
        })
      }
    },
    loopOrderState() { //轮询当前订单支付状态
      this.timer = setInterval(() => {
        this.axios.get(`/orders/${this.orderNo}`).then(res => {
          if (res.status == 20) { //支付完成
            clearInterval(this.timer)
            this.goOrderList()
          }
        })
      }, 1000);
    },
    closePay() { //关闭微信支付二维码事件
      this.showModal = true
      this.showWxPay = false
      clearInterval(this.timer)

    },
    goOrderList() {
      this.$router.push('/order/list')
    }
  }
}

</script>
<style lang='scss'>
@import 'assets/myscss/base';
@import 'assets/myscss/button';
.order-pay {
  .wrapper {
    background-color: #f5f5f5;
    padding-top: 30px;
    padding-bottom: 61px;
    .container {
      .order-wrap {
        padding: 62px 50px;
        background-color: #fff;
        font-size: 14px;
        margin-bottom: 30px;
        .item-order {
          display: flex;
          align-items: center;
          .icon-succ {
            background: url('/imgs/icon-gou.png') #80c58a no-repeat center;
            background-size: 50px;
            margin-right: 40px;
            width: 90px;
            height: 90px;
            border-radius: 50%;
          }
          .order-info {
            margin-right: 248px;
            h2 {
              font-size: 24px;
              color: #333333;
              margin-bottom: 20px;
            }
            p {
              // margin-bottom: 10px;
              color: #666666;
              span {
                color: #ff6700;
              }
            }
            & :last-child {
              margin-top: 10px;
            }
          }
          .order-total {
            & > p:first-child {
              margin-bottom: 30px;
            }
            span {
              font-size: 28px;
              color: #ff6700;
            }
            .icon-down {
              display: inline-block;
              width: 14px;
              height: 10px;
              background: url('/imgs/icon-down.png') no-repeat center;
              background-size: contain;
              margin-left: 9px;
              transition: all 0.5s;
              cursor: pointer;
              &.up {
                transform: rotate(180deg);
              }
            }
          }
        }
        .item-detail {
          border-top: 1px solid #d7d7d7;
          padding-top: 47px;
          padding-left: 130px;
          font-size: 14px;
          margin-top: 45px;
          .item {
            margin-bottom: 19px;
            .detail-title {
              float: left;
              width: 100px;
            }
            .detail-info {
              display: inline-block;
              li {
                margin-bottom: 5px;
                img {
                  width: 30px;
                  vertical-align: middle;
                }
              }
            }
          }
        }
      }
      .item-pay {
        padding: 26px 50px 26px;
        background-color: #ffffff;
        color: #333333;
        h3 {
          font-size: 20px;
          font-weight: 200;
          color: #333333;
          padding-bottom: 24px;
          border-bottom: 1px solid #d7d7d7;
          margin-bottom: 26px;
        }
        .pay-way {
          font-size: 18px;
          .pay {
            display: inline-block;
            width: 188px;
            height: 64px;
            border: 1px solid #d7d7d7;
            cursor: pointer;
            &:last-child {
              margin-left: 20px;
            }
            &.checked {
              border: 1px solid #ff6700;
            }
          }
          .pay-ali {
            background: url('/imgs/pay/icon-ali.png') no-repeat center;
            background-size: 103px 38px;
            margin-top: 19px;
          }
          .pay-wechat {
            background: url('/imgs/pay/icon-wechat.png') no-repeat center;
            background-size: 103px 38px;
          }
        }
       
      }
       .look-order {
          // margin-top: 10px;
          background-color: #fff;
          padding-top: 10px;
          padding-right: 10px;
          padding-bottom: 10px;
          text-align: right;
        }
    }
  }
}
</style>