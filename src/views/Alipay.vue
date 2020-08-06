<template>
  <div class="ali-pay">
    <order-header title="订单支付">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多</span>
      </template>
    </order-header>
    <div class="container">
      <loading>
        <template v-slot:tip>
          <div>正在跳转支付页面...</div>
        </template>
      </loading>
    </div>
    <div v-html="content" class="form"></div>
  </div>
</template>

<script>
import OrderHeader from 'components/OrderHeader'
import Loading from 'components/Loading'

export default {
  name: 'Alipay',
  components: {
    OrderHeader,
    Loading
  },
  data() {
    return {
      orderId: this.$route.query.orderNo,
      content: ''
    }
  },
  mounted() {
    this.paySubmit()
  },
  methods: {
    paySubmit() {
      this.axios.post('/pay', {
        orderId: this.orderId,
        orderName: 'Vue 小米商城', //扫码支付时订单名称
        amount: 0.01, //单位元
        payType: 1 //1支付宝，2微信
      }).then(res => {
        this.content = res.content
        setTimeout(() => {
          document.forms[0].submit() //提交支付宝表单，跳转到支付宝支付页面
        }, 100)
      })
    }
  }
}

</script>
<style lang='scss'>
@import 'assets/myscss/base';
</style>