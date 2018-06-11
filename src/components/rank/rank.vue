<template>


  <div class="toplist_wrap">
    <scroll ref="scroll" class="recommend-content" :data="rankLists">
        <ul v-if="rankLists.length">
          <li class="topic_item" v-for="list in rankLists" :key="list.id">
            <div class="rankList-left">
              <img :src="list.picUrl" alt="">
            </div>
            <div class="rankList-right">
              <div class="topic_cont">
                <h3 class="topic_tit">{{list.topTitle}}</h3>
                <p v-for="(item,index) in list.songList">{{index}} .{{item.songname}} -{{item.singername}} </p>

              </div>
            </div>
          </li>
        </ul>

    </scroll>

  </div>


</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'

  export default {
    components: {
      Scroll
    },
    data() {

      return {
        rankLists: []
      }
    },
    created() {
      this._getRecommend()
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    methods: {
      _getRecommend() {
        const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg';
        //这里做了跨域处理 修改config/index.js文件 修改proxyTable配置
        /*-------axios请求-------*/
        this.$http({
          method: 'get',
          url: "/api/v8/fcg-bin/fcg_myqq_toplist.fcg",
          data: {
            g_tk: 5381,
            uin: 0,
            format: 'json',
            inCharset: 'utf-8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'h5',
            needNewCode: 1
          }
        }).then(res => {
          // 返回数据 json， 返回的数据就是json格式
          if (res.status == 200) {
            let s = res.data.split("MusicJsonCallback(")[1];
            let a = JSON.parse(s.substr(0, s.length - 1))
            this.rankLists = a.data.topList;
            console.log(a)
          }

        }).catch(err => {
//            console.log(err)
        })

      }
    }
  }
</script>

<style type="text/css">
  .recommend-content {
    height: 100%;
    overflow: hidden
  }

  .toplist_wrap {
    margin: 10px;
  }

  .topic_item {
    margin-bottom: 10px;
    overflow: hidden;

  }

  .topic_item {
    display: flex;
    background: #fff;
    justify-content: space-between;
    color: #000;
  }

  .rankList-left {
    position: relative;
    width: 100px;
    height: 100px;
    display: block;
  }

  .rankList-left img {
    width: 100px;
    height: 100px;
    display: block;
  }

  .rankList-right {
    flex: 1
  }

  .topic_cont {
    -webkit-box-flex: 1;
    margin: 0 10px 0 15px;
  }

  .topic_cont .topic_tit {
    font-size: 16px;
    margin-bottom: 5px;
    line-height: 24px;
  }

  .topic_cont p {
    font-size: 14px;
    line-height: 21px;
  }
</style>
