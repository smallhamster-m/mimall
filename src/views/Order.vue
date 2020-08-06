<template>
  <div class="order">
    <router-view></router-view>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavFooter from 'components/NavFooter'


export default {
  name: 'Order',
  components: {
    NavFooter
  }
}
</script>
<style>
</style>