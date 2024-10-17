<script>
import { store } from './store';
import Home from './views/Home.vue';

export default{
  name : 'App',
  components : {
    Home,
  },
  data(){
    return{
      store,
    }
  },
  methods:{

  }
}
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss" scoped>
</style>
