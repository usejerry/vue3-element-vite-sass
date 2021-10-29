<template>
<el-menu
        active-text-color="#ffd04b"
        :background-color="color"
        class="el-menu-vertical-demo home_nav"
        :default-active="active_nav.text"
        text-color="#fff"
        @select="navSelect"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item v-for="item in navData" :index="item.value" :route="item.router" :disabled="item.type=='disabled'">
          <i :class="item.icon"></i>
          <span>{{item.name}}</span>
        </el-menu-item>
      </el-menu>
</template>

<script>
import { defineComponent ,toRefs,computed,watch, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import {checkData} from "../../utils/util.js"
export default defineComponent({
    name:'Nav',
  setup(props,{ emit }) {
    
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    let state={
        navData:[
          {
            icon:"el-icon-menu",
            value:"dashboard",
            name:"首页",
            router:{name:"首页",url:"/dashboard"},
             type:'show'
          },
          {
            icon:"el-icon-menu",
            value:"setting",
            name:"设置",
            router:{name:"设置",url:"/setting"},
            type:'show'
          },
          {
            icon:"el-icon-menu",
            value:"approval",
            name:"审批",
            router:{name:"审批",url:"/approval"},
            type:'disabled'
          }
        ],
    }
    let color =computed(()=>store.state.colorG)
    let active_nav =reactive({text:"dashboard"})
    initMenut()

    let nowRouter = computed(()=>{
      return store.state.ruoterData.path
    })
    function initMenut(){
      state.navData.forEach(item => {
        if(route.path.indexOf(item.router.url)>=0){
          store.commit('upDateRuoterData',[item.router])
          active_nav.text = route.path.substr(1)
        }
      })
    }
    // 选择菜单
    function navSelect(index,indexPath,item){
      selectData =  store.state.ruoterData.data
      if(item.route&&checkData(selectData,'name',item.route.name)){
          selectData.push(item.route)
          store.commit('upDateRuoterData',selectData)
      }
      router.push(item.route.url)
    }
    let selectData =  store.state.ruoterData.data
    

    watch(()=>route.path,(path,prevpath)=>{
      active_nav.text = path.substr(1)
    })

    return {
      ...toRefs(state),
      navSelect,
      active_nav,
      selectData
    }
  },
})
</script>
<style lang="scss" scoped>
.home_nav{
    height: 100%;
}
</style>