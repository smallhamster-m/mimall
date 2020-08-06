<template>
  <div class="swiper-menu">
    <ul class="menu-wrap">
      <li class="menu-item" v-for="(item, index) in menu" :key="index">
        <a class="icon" href="javascript:;">{{ item }}</a>
        <div class="children">
          <ul v-for="(item, i) in menuList" :key="i">
            <li v-for="(sub, j) in item" :key="j">
              <a :href="sub ? '/#/product/' + sub.id : ''">
                <img :src="sub ? sub.img : '/imgs/item-box-1.png'" alt="" />
                {{ sub ? sub.name : '小米9' }}
              </a>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'SwiperMenu',
  data() {
    return {
      menu: ['手机 电话卡', '电视 盒子', '笔记本 平板',
        '家电 插线板', '出行 穿戴', '智能 路由器',
        '电源 配件', '生活 箱包',],
      menuList: [
        [
          {
            id: 30,
            img: '/imgs/item-box-1.png',
            name: '小米CC9',
          }, {
            id: 31,
            img: '/imgs/item-box-2.png',
            name: '小米8青春版',
          }, {
            id: 32,
            img: '/imgs/item-box-3.jpg',
            name: 'Redmi K20 Pro',
          }, {
            id: 33,
            img: '/imgs/item-box-4.jpg',
            name: '移动4G专区',
          }
        ],
        [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
    }
  }
}

</script>
<style scoped lang='scss'>
@import 'assets/myscss/mixin';
.swiper-menu {
  .menu-wrap {
    width: 264px;
    height: 451px;
    box-sizing: border-box;
    background-color: skyblue;
    padding: 26px 0px;
    background-color: #55585a7a;
    .menu-item {
      height: 50px;
      line-height: 50px;
      // position: relative;
      &:hover {
        background-color: #ff6600;
        .children {
          display: block;
        }
      }
      .icon {
        display: block;
        height: 100%;
        font-size: 16px;
        color: #fff;
        padding-left: 30px;
        position: relative;
        &::before {
          content: '';
          @include positionImg(
            absolute,
            17.5px,
            30px,
            10px,
            15px,
            '/imgs/icon-arrow.png'
          );
        }
      }
      .children {
        width: 962px;
        height: 451px;
        border: 1px solid #e5e5e5;
        background-color: #fff;
        display: none;
        @include position(absolute, 0px, 264px);
        ul {
          height: 75px;
          display: flex;
          li {
            width: 25%;
            padding-left: 23px;
            line-height: 75px;
            a {
              display: inline-block;
              box-sizing: border-box;
              font-size: 14px;
              color: #333;
              width: 100%;
              height: 100%;
              padding-left: 30px;
              // text-align: center;
              img {
                width: 42px;
                height: 35px;
                vertical-align: middle;
              }
            }
          }
        }
      }
    }
  }
}
</style>