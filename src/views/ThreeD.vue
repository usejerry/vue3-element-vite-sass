<template>
    <div class="threeD_wrapper">
        <unity
                src="/unity/Build/009/009.json"
                width="1000"
                id="002"
                height="600"
                style="margin-top: 10px;padding-top: 10px"
                unityLoader="/unity/UnityLoader.js"
                ref="unityvue2"
        >
        </unity>
    </div>
</template>

<script>
import Unity from "vue-unity-webgl";
import {toRefs,reactive, onMounted,nextTick} from 'vue'
export default {
  name: 'ThreeD',
  components: {
Unity
  },
  setup(props) {
//     onMounted(() => {
//         nextTick(()=>{
//             this.$refs.unityvue2.message("JsTalker", "SetToken", 'localStorage.token');
//         })
//   })
  }
}
</script>

<style lang="scss" scoped>
.threeD_wrapper{
    width: 100%;
    height: 100%;
    .Mychart{
        width: 500px;
        height: 500px;
    }
}
</style>
