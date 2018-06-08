<template>
  <div class="recommend">
    <div  class="recommend-content" >
      <div v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="banner in recommends">
            <img :src="banner">
          </div>
        </div>
        <div class="swiper-pagination swiper-pagination-bullets"></div>
      </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>

          </ul>
        </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
//  import
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    export default {
      components: {
        swiper,
        swiperSlide
      },
      data(){

        return{
          recommends:[],
          swiperOption: {
            notNextTick: true,   //可以在第一时间获取到swiper对象
            autoplay: true,
            loop: true,
            slidesPerView: 'auto',
            centeredSlides: true,
            grabCursor: true,
            autoplayDisableOnInteraction: true, //和loop联合形成无缝滚动
            direction: 'horizontal', //水平 垂直:vertical
            paginationType: 'progress', //分液器样式类型,bullets圆点(默认),fraction分式,progress进度条,custom自定义
            paginationClickable: true,
            spaceBetween: 30,
            pagination: '.swiper-pagination',
//          prevButton:'.swiper-button-prev',
//          nextButton:'.swiper-button-next',
//          scrollbar:'.swiper-scrollbar',//滚动条
            observeParents: true //将observe应用于Swiper的父元素 ,当Swiper的父元素变化时,例如window.resize,Swiper更新

          }
        }
      },
      created(){
        this._getRecommend()
      },
      methods:{
        _getRecommend(){
          const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
          //这里做了跨域处理 修改config/index.js文件 修改proxyTable配置
          /*-------axios请求-------*/
          this.$http({
            method: 'get',
            url: "/api/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg",
            data: {
              g_tk:5381,
              uin:0,
              format:'json',
              inCharset:'utf-8',
              outCharset:'utf-8',
              notice:0,
              platform:'h5',
              uin:0,
              needNewCode:1
            }
          }).then(res => {
            console.log(res)
            // 返回数据 json， 返回的数据就是json格式
            if(res.code == 0){
              this.recommends = res.data.slider
            }

          }).catch(err => {
            console.log(err)
          })

        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  body {
    touch-action: none;
  }

  .recommend
    position fixed
    width 100%
    top 88px
    bottom 0
    .recommend-content
      height 100%
      overflow hidden
      .slider-wrapper
        position relative
        width 100%
        /*height 200px*/
        overflow hidden
        .el-carousel__button
          width 10px
          height 10px
          border-radius 10px
        img
          width: 100%
        /*height: 250px*/

        .swiper-pagination-bullet-active
          background #fff

      .recommend-list
        .list-title
          height 65px
          line-height 65px
          text-align center
          font-size $font-size-medium
          color $color-theme
        .item
          display flex
          box-sizing border-box
          align-items center
          padding 0 20px 20px 20px
          .icon
            flex 0 0 60px
            width 60px
            padding-right 20px
          .text
            display flex
            flex-direction column
            justify-content center
            flex 1
            line-height 20px
            overflow hidden
            font-size $font-size-medium
            .name
              margin-bottom 10px
              color $color-text-d
              .desc
                color $color-text-d
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
                -webkit-line-clamp 2
                -webkit-box-orient vertical
                -webkit-line-clamp 2
      .loading-container
        position absolute
        width 100%
        top 50%
        transform translateY(-50%)

</style>
<style type=text/css>
  .el-carousel__button {
    width: 10px;
    height: 10px;
    border-radius: 10px;
  }

</style>
