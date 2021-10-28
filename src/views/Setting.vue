<template>
    <div class="setting_wrapper">
        设置
    </div>
</template>

<script setup>
import {toRefs,reactive, onMounted} from 'vue'
import { useStore } from 'vuex'

</script>

<style lang="scss" scoped>
.setting_wrapper{
    width: 100%;
    height: 100%;
    .Mychart{
        width: 500px;
        height: 500px;
    }
}
</style>
