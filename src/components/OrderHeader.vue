<template>
  <div class="order-header">
    <div class="container cl">
      <div class="header-logo fl">
        <a href=""></a>
      </div>
      <div class="title fl">
        <h1>
          {{title}} <slot name="tip"></slot>
        </h1>
      </div>
      <div class="username fr">
        <a href="javascript:;">{{this.$store.state.username}}</a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'OrderHeader',
  props: {
    title:String
  }
}

</script>
<style scoped lang='scss'>
@import 'assets/myscss/base';
.order-header {
  padding: 30px 0;
  line-height: 55px;
  border-bottom: 2px solid #ff6600;
  .container {
    .title {
      margin-left: 55px;
      h1 {
        font-size: 28px;
      }
      span {
        font-size: 14px;
        color: #999;
        margin-left: 15px;
        font-weight: 200;
      }
    }
    .username {
      a {
        font-size: 16px;
        color: #666;
      }
    }
  }
}
</style>