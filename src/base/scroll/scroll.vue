<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'

  export default {
    props:{
      /**
       * 1 滚动的时候会派发scroll事件，会截流。
       * 2 滚动的时候实时派发scroll事件，不会截流。
       * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
       */
      /*
      *
      * */
      probeType:{
        type:Number,
        default:1
      },
      /*
      * 点击列表是否触发click时间
      * */
      click:{
        type:Boolean,
        default:true
      },
      /**
       * 是否开启横向滚动
       */
      scrollX: {
        type: Boolean,
        default: false
      },
      /**
       * 是否派发滚动事件
       */
      listenScroll: {
        type: Boolean,
        default: false
      },
      /**
       * 列表的数据
       */
      data:{
        type:Array,
        default:null
      }
    },
    mounted(){
      this.$nextTick(function () {
        this._initScroll()
      })
    },
    methods:{
      _initScroll(){
        if(!this.$refs.wrapper){
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper,{
          probeType:this.probeType,
          click:this.click
        })

      },
      enable(){
        this.scroll && this.scroll.enable()
      },
      disable(){
        this.scroll && this.scroll.disable()
      },
      refresh(){
        this.scroll && this.scroll.refresh()
      }

    },
    watch:{
      data(){
        this.$nextTick(function () {
          this.refresh()
        })
      }

    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
