<template>
<el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
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
export default defineComponent({
    name:'Nav',
  setup(props,{ emit }) {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath)
    }
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath)
    }
    let nowRouter = computed(()=>{
      console.log(store.state.ruoterData.path,2222)
      return store.state.ruoterData.path
    })
    
    function navSelect(index,indexPath,item){
      selectData =  store.state.ruoterData.data
      if(item.route&&selectData.indexOf(item.route)<0){
          selectData.push(item.route)
          store.commit('upDateRuoterData',selectData)
      }
      router.push(item.route.url)
    }
    let selectData =  store.state.ruoterData.data
    let active_nav =reactive({text:"dashboard"})
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
    watch(()=>route.path,(path,prevpath)=>{
      console.log(path.substr(1))
      active_nav.text = path.substr(1)
    })
    return {
      ...toRefs(state),
      handleOpen,
      handleClose,
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