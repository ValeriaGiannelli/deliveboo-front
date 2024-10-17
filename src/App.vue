<script>
import { store } from './store';
import Home from './views/Home.vue';
import Header from './components/Header.vue';
import Jumbo from './components/Jumbo.vue';

export default{
  name : 'App',
  components : {
    Home,
    Header,
    Jumbo,
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
  <Header/>
  <Jumbo/>
  <router-view></router-view>
</template>

<style lang="scss" scoped>
@use './styles/general.scss' as *;
@use './styles/partials/variables' as *;
@use './styles/partials/mixins' as *;
</style>
