<template>
  <div class="loading">
    <img src="/imgs/loading-svg/loading-spinning-bubbles.svg" alt="" />
    <slot name="tip"></slot>
  </div>
</template>

<script>

export default {
  name: 'Loading',
}

</script>
<style lang='scss'>
.loading {
  padding: 100px;
  // margin:  0 auto;
  text-align: center;
  font-size: 20px;
  div {
    margin-top: 20px;
  }
}
</style>