<template>
    <el-tag v-for="(tag,index) in ruoterData" :key="tag.name" closable class="top_tag" :disable-transitions="true" @close="colseTag(tag,index)" @click="clickTag(tag)">
      {{ tag.name }}
    </el-tag>
</template>

<script setup>
import { reactive,computed} from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
    const router = useRouter()
    const store = useStore()
    let ruoterData = computed(() => {
       return store.state.ruoterData.data
    })
    function colseTag(tag,index){
    //   ruoterData.splice(index,1)
      store.state.ruoterData.data.splice(index,1)
      store.commit('upDateRuoterData',store.state.ruoterData.data)
      // console.log(state.tags.splice(index,1))
    }
    function clickTag(tag){
      store.commit('upDateRuoterData2',tag.url)
      router.push(tag.url)
    }
</script>

<style lang="scss" scoped>
.top_tag{
    margin-right: 10px;
    cursor: pointer;
    transition: all .5s;
    &:hover{
      background-color: #409eff;
      color: white;
    }
}
</style>