<template>
  <div class="recommend">
    <!--<scroll ref="scroll" class="recommend-content" :data="hotLists">-->
      <scroll ref="scroll" class="recommend-content" :data="hotLists">
        <!--swiper插件-->
        <!--两种方式-->
        <!--直接渲染-->
        <div>
          <div class="swiper-box" ref="swiperBox"  v-if="recommends.length" style="height: 150px;">
            <swiper class="box-container" :options="swiperOption" ref="mySwiper">
              <!--slides-->
              <swiper-slide v-for="item in recommends" :key="item.id">
                <a :href="item.linkUrl">
                  <img  class="swiper-image" :src="item.picUrl">
                </a>
              </swiper-slide>
              <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
              <!--<div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>-->
              <!--<div class="swiper-button-next swiper-button-white" slot="button-next"></div>-->
            </swiper>
          </div>

          <!--单独组件引用-->
          <!--<div class="swiper-box" ref="swiperBox"  v-if="recommends.length" >-->
          <!--<app-banner :recommends="recommends"></app-banner>-->
          <!--</div>-->

          <div class="recommend-list">
            <h1 class="list-title">热门歌单推荐</h1>
            <ul>
              <li class="host-item item" v-for="item in hotLists" :key="item.mv_id">
                <div class="host-left icon">
                  <img v-lazy="item.picurl" alt="" >
                </div>
                <div class="host-right text">
                  <h3 class="host-name">{{item.singer_name}}</h3>
                  <p class="host-p">
                    {{item.mvtitle}}
                  </p>
                  <p>{{item.mvdesc}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

      </scroll>

    <!--</scroll>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import Banner from 'base/banner/banner.vue'
  import {getDiscList} from 'api/recommend'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
//  const axios = require('axios')
  export default {
    components: {
      swiper,
      swiperSlide,
      'app-banner': Banner,
      Scroll
    },
    data() {

      return {
        recommends: [],
        hotLists:[],
        swiperOption: {
          // 所有配置均为可选（同Swiper配置）
          initialSlide: 0,
          pagination:'.swiper-pagination',
          // pagination: {
          //  el: '.swiper-pagination'
          // },
          loop: true,
          speed: 400,
          direction: 'horizontal',
          paginationClickable: true,
          mousewheelControl: true,
          autoplay: 1000,
          //autoplay: true,
          autoplayDisableOnInteraction: false,
          observer: true,
          observeParents: true,
          debugger: true,
          onTransitionStart (swiper) {
//            console.log(swiper)
          }
        }
      }
    },

    created() {
      this._getRecommend();
      this._getHostList()
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    methods: {
      _getRecommend() {
//        const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
        //这里做了跨域处理 修改config/index.js文件 修改proxyTable配置
        /*-------axios请求-------*/
        this.$http({
          method: 'get',
          url: "/api/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg",
          data: {
            g_tk: 5381,
            uin: 0,
            format: 'json',
            inCharset: 'utf-8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'h5',
            uin: 0,
            needNewCode: 1
          }
        }).then(res => {
          // 返回数据 json， 返回的数据就是json格式
          if (res.data.code == 0) {
            console.log(res.data.data.slider)
            this.recommends = res.data.data.slider
          }

        }).catch(err => {
            console.log(err)
        })

      },
      _getHostList(){
        this.$jsonp('/api/mv/fcgi-bin/getmv_by_tag',
          {
            g_tk:5381,
            callbackName:'MusicJsonCallback',
            loginUin:0,
            hostUin:0,
            format:'jsonp',
            inCharset:'utf8',
            outCharset:'GB2312',
            notice:0,
            platform:'yqq',
            needNewCode:0,
            cmd:'shoubo',
            lan:'all'
          }
        ).then(res => {
          console.log(res)
          if(res.code==0){
            this.hotLists = res.data.mvlist;
          }
          // 返回数据 json， 返回的数据就是json格式
        }).catch(err => {
          console.log(err)
        })

      }
     /* _getHostList(){
       getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            console.log(res.data.list)
          }
        })
      }*/
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
      .swiper-wrapper
        img
          width 100%
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
        .host-item
          display flex
          box-sizing border-box
          align-items center
          padding 0 20px 20px 20px
          .icon
            flex 0 0 60px
            width 60px
            padding-right 20px
            img
              width 60px
              height 60px
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
