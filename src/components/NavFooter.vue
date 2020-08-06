<template>
  <div class="nav-footer">
    <div class="service">
      <ul>
        <li><span class="icon-setting"></span>预约维修服务</li>
        <li><span class="icon-7day"></span>7天无理由退货</li>
        <li><span class="icon-15day"></span>15天免费换货</li>
        <li><span class="icon-post"></span>满150元包邮</li>
      </ul>
    </div>
    <div class="footer">
      <div class="logo">
        <img src="/imgs/logo-footer.png" alt="" />
        <p>小米商城</p>
      </div>
      <div class="copyright">
        Copyright ©2019 <span class="domain">mi.futurefe.com</span> All Rights
        Reserved.
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'NavFooter',
}

</script>
<style scoped lang='scss'>
@import 'assets/myscss/base';

@import 'assets/myscss/mixin';
.nav-footer {
 
  .service {
    padding: 33px 0;
    color: #666666;
    font-size: 16px;
    li {
      display: inline-block;
      width: 24.9%;
      text-align: center;
      border-right: 1px solid #e5e5e5;
      &:last-child {
        border-right: none;
      }
      span {
        display: inline-block;
        width: 20px;
        height: 20px;
        vertical-align: middle;
        margin-right: 8px;
      }
      .icon-setting {
        @include bgImg(20px, 20px, '/imgs/icon-setting.png');
      }
      .icon-7day {
        @include bgImg(20px, 20px, '/imgs/icon-7day.png');
      }
      .icon-15day {
        @include bgImg(20px, 20px, '/imgs/icon-15day.png');
      }
      .icon-post {
        @include bgImg(20px, 20px, '/imgs/icon-post.png');
      }
    }
  }
  .footer {
    height: 206px;
    background-color: #333;
    border-top: 4px solid #ff6600;
    text-align: center;
    color: #999;
    font-size: 16px;
    .logo {
      margin-top: 46px;
      margin-bottom: 28px;
      img {
        width: 53px;
        height: 36px;
        margin-bottom: 10px;
      }
    }
    .copyright {
      .domain {
        color: #ff6600;
      }
    }
  }
}
</style>