<template>
    <div class="home_wrapper">
        <Weather></Weather> 
        <div class="nav_box">
            <Nav @selectData="selectData"></Nav>
            <div class="picker">
              <el-color-picker v-model="color" class="picker" @change="change"/>
            </div>
        </div>
        <div class="right_box">
          <div class="right_top" :style="{'background-color': color}">
            <TagRouter></TagRouter>
            <div class="weather_box">
               <iframe width="400" scrolling="no" height="60" frameborder="0" allowtransparency="true" src="https://i.tianqi.com?c=code&id=35&color=%23000000&icon=4&site=34"></iframe>
            </div>
          </div>
          <div class="right_cen">
            <router-view class="router-view">
            </router-view>
          </div>
        </div>
    </div>
</template>

<script>
import Weather from '../components/Weather/index.vue'
import Nav from '../components/Nav/index.vue'
import TagRouter from '../components/TagRouter/index.vue'
// import {deleteA} from '../utils/utils.js'
import {toRefs,reactive,computed,ref} from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'Home',
  components: {
    Nav,
    TagRouter,
    Weather
  },
  setup(props,) {
    const store = useStore()
    let selectData  = (data)=>{
      data.forEach(item => {
        if(state.tags.indexOf(item)<0){
          state.tags.push(item)
        }
      });
      // state.tags = reactive(data)
      console.log(state.tags)
    }
    let color = ref('#ffffff')
    // let color =computed(()=>store.state.colorG)
    let state  =reactive({
      tags:[]
    })
    function colseTag(tag,index){
      state.tags.splice(index,1)
      
      // console.log(state.tags.splice(index,1))

    }
    function change(value){
      store.commit('upcolorG',value)
      console.log(store.state.colorG)
    }
    return {
      ...toRefs(state),
      selectData,
      colseTag,
      color,
      change
    } 
  },
  // methods: {
  //   selectData(data){
  //     console.log(data)
  //     // this.tags = data
  //     console.log(this.tags)
  //   }
  // },
}
</script>

<style lang="scss" scoped>
.home_wrapper{
  width: 100%;
  height: 100%;
  .nav_box{
    width: 200px;
    height:100%;
    float: left;
    position: relative;
  }
  .right_box{
    margin-left: 200px;
    height: 100%;
    background-color: white;
    position: relative;
    .right_top{
      width: 100%;
      height: 60px;
      // background-color: ;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      box-sizing: border-box;
      padding-top: 15px;
      padding-left: 15px;
      display: flex;
      justify-content: start;
      border-bottom: 1px solid gainsboro;
      .top_tag{
        margin-left: 10px;
      }
      .weather_box{
        position:absolute;
        top: 0;
        right: 0;
        width: 300px;
        height: 60px;
      }
    }
    .right_cen{
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin-top: 60px;
      // background-color: violet;
      .router-view{
        width: 100%;
        height: 100%;
      }
    }
  }
}
    .picker{
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
    }
</style>
