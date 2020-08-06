<template>
  <div class="register">
    <div class="wrapper">
      <div class="container">
        <div class="box">
          <div class="logo">
            <a href="javascript:;"></a>
          </div>
          <h1>注册小米账号</h1>
          <div class="input">
            <input type="text" placeholder="请输入用户名" v-model="username" />
          </div>
          <div class="input">
            <input type="text" placeholder="请输入密码" v-model="password" />
          </div>
          <div class="btn " @click="register">立即注册</div>
          <div class="msg">
            已阅读并同意：小米<span>用户协议</span>和<span>隐私政策</span>
          </div>
        </div>
      </div>
    </div>
    <login-footer></login-footer>
  </div>
</template>

<script>
import LoginFooter from 'components/LoginFooter';

export default {
  name: 'Register',
  components: {
    LoginFooter
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  created() {
    // this.register()
  },
  methods: {
    register() {
      if (this.username && this.password) {
        this.axios.post('/user/register', {
          username: this.username,
          password: this.username,
          email: `${this.username}@qq.com`
        }).then(() => {
          this.message('注册成功', 'success')
          // window.open('/#/login','_self')
          this.$router.push('/login')
        })
      } else {
        this.message('请输入用户名或密码', 'error')
      }

    }
  }
}

</script>
<style lang='scss'>
@import 'assets/myscss/base';
@import 'assets/myscss/button';

.register {
  background-color: #f5f5f5;
  .wrapper {
    width: 100%;
    background-color: #f5f5f5;
    padding-top: 120px;
    .box {
      width: 854px;
      height: 560px;
      background-color: #fff;
      margin: 0 auto;
      text-align: center;
      .logo {
        text-align: center;
        a {
          display: inline-block;
          width: 50px;
          height: 50px;
          background: url('/imgs/milogo.png') no-repeat center;
          background-color: #ff6600;
          // padding-bottom: 40px;
          margin-bottom: 40px;
        }
      }
      h1 {
        font-size: 30px;
        font-weight: normal;
      }
      .input {
        // display: inline-block;
        margin: 30px auto;
        width: 348px;
        height: 50px;
        border: 1px solid #ccc;
        input {
          font-size: 14px;
          box-sizing: border-box;
          border: none;
          width: 100%;
          height: 100%;
          padding: 15px;
        }
      }
      .btn {
        width: 350px;
        height: 42px;
        line-height: 42px;
        margin: 10px 0;
      }
      .msg {
        padding-top: 40px;
        font-size: 14px;
        span {
          cursor: pointer;
          font-weight: bold;
          color: #333;
        }
      }
    }
  }
}
</style>