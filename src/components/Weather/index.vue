<template>
    <div class="view_Weather">
        <!-- {{weatherData.wea}}/{{weatherData.win}} -->
        <div class="weather_box" id="weather_box"></div>
    </div>
</template>

<script setup>
// import axios from "axios"; // 引入axios
import sun_cen from './imgs/sun_cen.png'
import sun_light from './imgs/sun_light.png'
import cloud from './imgs/cloud.png'

import * as PIXI from 'pixi.js'
import {getWeather} from "@/api/index.js"
import {toRefs,reactive,onMounted} from 'vue'
    let state ={
        pixiApp:null,
        container:null,
        weather_box:null,
        spritesData:{},
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
            { name: 'sun_cen', url: sun_cen},
            { name: 'sun_light', url: sun_light},
            { name: 'cloud', url: cloud},
        ]
        state.pixiApp.loader.add(imgs)
        app_loader()
        // console.log(this.$refs)
    }
    // 加载完
    function app_loader(){
        state.pixiApp.loader.load((data) => {
            let texturesData ={
                sun_cen: PIXI.Texture.from('sun_cen'),
                sun_light: PIXI.Texture.from('sun_light'),
                cloud: PIXI.Texture.from('cloud')

            }
            state.spritesData = {
                sun_cen:new PIXI.Sprite(texturesData.sun_cen),
                sun_light:new PIXI.Sprite(texturesData.sun_light),
                cloud:new PIXI.Sprite(texturesData.cloud),

            }
            state.spritesData.sun_cen.width = 481
            state.spritesData.sun_cen.height = 496
            state.spritesData.sun_cen.x = state.weather_box.offsetWidth-481/2
            state.spritesData.sun_cen.y = 496/2
            state.spritesData.sun_cen.anchor.set(0.5, 0.5)
            state.container.addChild(state.spritesData.sun_cen)
            state.spritesData.sun_light.width = 481
            state.spritesData.sun_light.height = 496
            state.spritesData.sun_light.x = state.weather_box.offsetWidth-481/2
            state.spritesData.sun_light.y = 496/2
            state.spritesData.sun_light.anchor.set(0.5, 0.5)
            state.container.addChild(state.spritesData.sun_light)

            state.spritesData.cloud.width = 495
            state.spritesData.cloud.height = 302
            state.spritesData.cloud.x = state.weather_box.offsetWidth-495/2
            state.spritesData.cloud.y = 345
            state.spritesData.cloud.anchor.set(0.5, 0.5)
            state.container.addChild(state.spritesData.cloud)            
            w_load()
        })
    }
    // 渲染
    function w_load(){
        state.pixiApp.stage.addChild(state.container)
        state.weather_box.appendChild(state.pixiApp.view)
        goPlay()
    }
    function goPlay(){
        state.pixiApp.ticker.add((delta) => {
            // console.log(delta)
            state.spritesData.sun_light.rotation += 0.005 * delta
        })
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