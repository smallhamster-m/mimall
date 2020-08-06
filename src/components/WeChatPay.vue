<template>
  <div class="wechat-pay">
    <div class="wrapper">
      <div class="mask"></div>
      <div class="item-wrap">
        <div class="img"></div>
        <div class="pay">
          <div class="title cl">
            <p class="fl">微信支付</p>
            <span class="fr icon-close" @click="$emit('closePay')"></span>
          </div>
          <div class="qrcode">
            <img
              :src="payImg " alt=""
            />
          </div>
          <div class="tip">
            <p>请使用微信扫一扫</p>
            <p>二维码完成支付</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'WeChatPay',
  props:['payImg']
}

</script>
<style lang='scss'>
@import 'assets/myscss/base';
.wechat-pay {
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    opacity: 0.6;
    background-color: #000000;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .item-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .img {
      background-color: #fff;
      width: 296px;
      height: 485px;
      background: url('/imgs/pay/icon-scan.png') no-repeat center;
      background-size: cover;
    }
    .pay {
      background-color: #fff;
      width: 370px;
      font-size: 14px;
      color: #333;
      .title {
        height: 60px;
        line-height: 60px;
        background-color: #f5f5f5;
        font-size: 18px;
        padding: 0 20px;
        position: relative;
        span {
          display: inline-block;
          position: absolute;
          top: 23.5px;
          right: 20px;
          width: 15px;
          height: 15px;
          background: url('/imgs/icon-close.png') no-repeat center;
          background-size: cover;
          cursor: pointer;
        }
      }
      .qrcode {
        text-align: center;
        padding: 44px 0 26px;
        img {
          width: 237px;
          height: 240px;
        }
      }
      .tip {
        height: 60px;
        text-align: center;
      }
    }
  }
}
</style>