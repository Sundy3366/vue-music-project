<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">我是歌手</h1>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .m-header{
    position relative;
    height 44px;
    text-align center;
    color: $color-theme;
    font-size: 0px;
  }

    .icon
      display inline-block
      vertical-align top
      margin-top 6px
      width 30px
      height 32px
      margin-right 9px
      bg-image('logo')
      background-size: 30px 32px
    .text
      display inline-block
      vertical-align top
      line-height 44px
      font-size: $font-size-large
      color B99C55
      .mine
        position absolute
        top 0
        right 0px
        .icon-mine
          display block
          padding 12px
          font-size 20px
          color $color-theme

</style>
