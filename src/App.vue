<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>

import { mapActions } from 'vuex';

export default {
  name: 'App',
  components: {

  },
  created() {
    if (this.$cookie.get('userId')) { //当登录的时候才调用，没登录不调用
      this.getUser()
      this.getCartCount()
    }
  },
  methods: {
    ...mapActions(['saveUserName', 'saveCartCount']),
    // 用户刷新页面后，vuex里的数据会丢失，为了能够继续显示用户名及购物车数量，需要重新拉取用户信息并保持到vuex
    getUser() {
      this.axios.get('/user').then((res = {}) => {
        // 把用户信息保存到vuex中
        // this.$store.state.username = res.username（不要直接修改state里面的东西）
        // this.$store.dispatch('saveUserName', res.username)
        this.saveUserName(res.username)
      })
    },
    getCartCount() {
      this.axios.get('/carts/products/sum').then((res = 0) => {
        // 把购物车总数量保存到vuex中
        // this.$store.dispatch('saveCartCount', res)
        this.saveCartCount(res)
      })
    },
  }
}

</script>
<style lang='scss'>
@import 'assets/myscss/reset';
</style>
