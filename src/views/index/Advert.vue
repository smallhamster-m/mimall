<template>
  <div class="advert">
    <a
      :href="'/#/product/' + item.id"
      v-for="(item, index) in advList"
      :key="index"
    >
      <img :src="item.img" alt="" />
    </a>
  </div>
</template>

<script>

export default {
  name: 'Advert',
  data() {
    return {
      advList: [
        {
          id: 33,
          img: '/imgs/ads/ads-1.png'
        }, {
          id: 48,
          img: '/imgs/ads/ads-2.jpg'
        }, {
          id: 45,
          img: '/imgs/ads/ads-3.png'
        }, {
          id: 47,
          img: '/imgs/ads/ads-4.jpg'
        }
      ],
    }
  }
}

</script>
<style scoped lang='scss'>
.advert {
  margin-top: 14px;
  margin-bottom: 31px;
  display: flex;
  justify-content: space-between;
  a {
    display: inline-block;
    img {
      width: 296px;
      height: 167px;
    }
  }
}
</style>