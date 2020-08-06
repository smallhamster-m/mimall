<template>
  <div class="login">
    <div class="login-header">
      <div class="container">
        <div class="header">
          <a href="/#/index"><img src="/imgs/login-logo.png" alt=""/></a>
        </div>
      </div>
    </div>
    <div class="login-body">
      <div class="container">
        <div class="login-from">
          <h1>
            <span class="checked">帐号登录</span><span class="line">|</span
            ><span>扫码登录</span>
          </h1>
          <div class="input">
            <input type="text" placeholder="请输入帐号" v-model="username" />
          </div>
          <div class="input">
            <input
              type="password"
              placeholder="请输入密码"
              v-model="password"
              @keyup.enter="login"
            />
          </div>
          <div class="btn-box">
            <a href="javascript:;" class="btn" @click="login">登录</a>
          </div>
          <div class="tips">
            <a href="/#/register" class="sms">立即注册</a>
            <div class="reg" @click="message('忘了我也没办法╮(╯▽╰)╭')">
              忘记密码？
            </div>
          </div>
        </div>
      </div>
    </div>
    <login-footer></login-footer>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import LoginFooter from 'components/LoginFooter';
export default {
  name: 'Login',
  components: {
    LoginFooter
  },
  data() {
    return {
      username: '',
      password: '',
      userId: ''
    }
  },  
  methods: {
    ...mapActions(['saveUserName']),
    login() {
      if (this.username && this.password) {
        let { username, password } = this
        this.axios.post('/user/login', {
          username,
          password
        }).then((res) => {
          this.$cookie.set('userId', res.id, { expires: 'Session' })
          //把用户名存到vuex
          // this.$store.dispatch('saveUserName', res.username)
          this.saveUserName(res.username)
          this.$router.push('/index')
        }).catch(err => {
          err
        })
      } else {
        this.message('请输入用户名和密码', 'warning')
      }
    },

  }
}

</script>
<style scoped lang='scss'>
@import 'assets/myscss/base';
@import 'assets/myscss/button';

.login {
  .login-body {
    height: 576px;
    background: url('/imgs/login-bg.jpg') no-repeat center;
    .container {
      position: relative;
      .login-from {
        width: 410px;
        height: 510px;
        background-color: #fff;
        position: absolute;
        top: 30px;
        right: 0;
        padding: 0 31px;
        box-sizing: border-box;
        h1 {
          text-align: center;
          padding: 40px 40px;
          .checked {
            color: #ff6600;
          }
          .line {
            margin: 0 20px;
          }
        }
        .input {
          // display: inline-block;
          width: 348px;
          height: 50px;
          border: 1px solid #ccc;
          // margin: 0 auto;
          margin-bottom: 30px;
          input {
            font-size: 14px;
            box-sizing: border-box;
            border: none;
            width: 100%;
            height: 100%;
            padding: 15px;
          }
        }
        .btn-box {
          text-align: center;
          width: 100%;
          height: 50px;
          a {
            display: inline-block;
            width: 100%;
            height: 100%;
            line-height: 50px;
            font-size: 18px;
          }
        }
        .tips {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
          font-size: 14px;
          .sms {
            color: #ff6600;
            cursor: pointer;
          }
          .reg {
            cursor: pointer;
            color: #999;
            span {
              padding: 0 5px;
            }
          }
        }
      }
    }
  }
}
</style>