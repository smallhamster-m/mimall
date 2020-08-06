<template>
  <transition name="slide">
    <div class="modal" v-show="isShow">
      <div class="mask"></div>
      <div class="dialog">
        <div class="dialog-header">
          <span>{{ title }}</span>
          <a href="javascript:;" class="icon-close" @click="$emit('close')"></a>
        </div>
        <div class="dialog-body">
          <slot name="body"></slot>
        </div>
        <div class="dialog-footer">
          <a href="javascript:;" class="btn" v-if="btnType == 1" @click="$emit('submit')">{{
            sureText
          }}</a>
          <a href="javascript:;" class="btn" v-if="btnType == 2" @click="$emit('close')">{{
            cancelText
          }}</a>
          <div class="btn-group" v-if="btnType == 3">
            <a href="javascript:;" class="btn" @click="$emit('submit')">{{ sureText }}</a>
            <a href="javascript:;" class="btn btn-default" @click="$emit('close')">{{ cancelText }}</a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'Modal',
  props: {
    title: String,
    // 弹框类型：小small、中middle、大large、表单form
    modleType: {
      type: String,
      default: 'from'
    },
    // 按钮类型: 1:确定按钮 2：取消按钮 3：确定/取消
    btnType: String,
    sureText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.isShow = false
    }
  }
}

</script>
<style scoped lang='scss'>
@import 'assets/myscss/mixin';
@import 'assets/myscss/button';
.modal {
  @include position(fixed);
  width: 100%;
  height: 100%;
  z-index: 11;
  transition: all 0.5s;
  &.slide-enter-active {
    top: 0;
  }
  &.slide-leave-active {
    top: -100%;
  }
  &.slide-enter {
    top: -100%;
  }
  .mask {
    @include position(fixed);
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.5;
    z-index: 11;
  }
  .dialog {
    width: 660px;
    @include position(absolute, 40%, 50%);
    transform: translate(-50%, -50%);
    z-index: 12;
    .dialog-header {
      color: #333;
      position: relative;
      height: 60px;
      line-height: 60px;
      font-size: 16px;
      background-color: #f5f5f5;
      padding: 0 25px;
      .icon-close {
        @include positionImg(
          absolute,
          23px,
          25px,
          14px,
          14px,
          '/imgs/icon-close.png'
        );
      }
    }
    .dialog-body {
      padding: 42px 40px 54px;
      font-size: 14px;
      background-color: #fff;
      border: 1px solid #f5f5f5;
    }
    .dialog-footer {
      height: 82px;
      background-color: #f5f5f5;
      text-align: center;
      line-height: 82px;
    }
  }
}
</style>