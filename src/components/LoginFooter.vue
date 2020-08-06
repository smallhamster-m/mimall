<template>
  <div class="login-footer">
    <div class="container">
      <div class="footer-list">
        <ul>
          <li><a href="javascript:;">简体</a><span>|</span></li>
          <li><a href="javascript:;">繁体</a><span>|</span></li>
          <li><a href="javascript:;">English</a><span>|</span></li>
          <li><a href="javascript:;">常见问题</a><span>|</span></li>
          <li><a href="javascript:;">隐私策略</a></li>
        </ul>
      </div>
      <div class="footer-info">
        小米公司版权所有-京ICP备10046444-<a href="javascript:;"
          ><span
            ><img
              src="https://account.xiaomi.com/static/res/9204d06/account-static/respassport/acc-2014/img/ghs.png"
              alt=""
            />京公网安备11010802020134号</span
          ></a
        >-京ICP证110507号
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LoginFooter',
}

</script>
<style lang='scss'>
.login-footer {
  height: 80px;
  // text-align: center;
  padding-top: 100px;
  background-color: #f5f5f5;
  .footer-list {
    ul {
      display: flex;
      justify-content: center;
      li {
        text-align: center;
        a {
          display: inline-block;
          font-size: 14px;
          color: #757575;
        }
        span {
          padding: 0 15px;
        }
      }
    }
  }
  .footer-info {
    text-align: center;
    font-size: 14px;
    color: #757575;
    margin-top: 10px;
    a {
      color: #757575;
    }
  }
}
</style>