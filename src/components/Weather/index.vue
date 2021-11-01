<template>
    <div class="view_Weather">
        <!-- {{weatherData.wea}}/{{weatherData.win}} -->
        <div class="weather_box" id="weather_box"></div>
    </div>
</template>

<script setup>
// import axios from "axios"; // 引入axios
import '@/lib/pixi.min.js'
import {getWeather} from "@/api/index.js"
import {toRefs,reactive,onMounted} from 'vue'
    let state ={
        pixiApp:null,
        container:null,
        weather_box:null
    }
    // 初始化
    function initW(){
        state.weather_box = document.querySelector('#weather_box')
        let width = state.weather_box.offsetWidth
        let height = state.weather_box.offsetHeight
        state.pixiApp = new PIXI.Application({
                     width: width,
                     height: height,
                     // transparent: true,
                     resolution: window.devicePixelRatio || 1,
                     backgroundColor:0xbcac75,
                     resizeTo: document.querySelector('body')
        });
        state.container = new PIXI.Container();
        img_sources()
    }
    // 资源的加载
    function img_sources(){

        let imgs = [
            { name: 'sun', url: import.meta.glob('../../assets/img/sun.png') },
        ]
        state.pixiApp.loader.add(imgs)
        app_loader()
        // console.log(this.$refs)
    }
    // 加载完
    function app_loader(){
        state.pixiApp.loader.load((data) => {
            let texturesData ={
                sun: PIXI.Texture.from('sun')
            }
            let spritesData ={
                sun:new PIXI.Sprite(texturesData.sun),
            }
            console.log(spritesData.sun)
            spritesData.sun.width = 481
            spritesData.sun.width = 496
            spritesData.sun.x = 10
            spritesData.sun.y = 10
            state.container.addChild(spritesData.sun)
            w_load()
        })
    }
    // 渲染
    function w_load(){
        state.pixiApp.stage.addChild(state.container)
        state.weather_box.appendChild(state.pixiApp.view)
    }
    function weather(cityName){
        getWeather({unescape:'1',version:'v6',city:cityName,appid:'54149728',appsecret:'u4DdBMhI'}).then(data =>{
            // weatherData.wea = data.wea
            // weatherData.win = data.win
        })
    }
    weather("广州")
    onMounted(() => {
        initW()
    })
</script>

<style lang="scss" scoped>
.view_Weather{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    // background-color: aqua;
    // opacity: .6;
    z-index: 4;
    .weather_box{
        width: 100%;
        height: 100%;
    }
}
</style>