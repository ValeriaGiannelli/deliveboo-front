<script>
import { store } from './store';
import Home from './views/Home.vue';
import Header from './components/Header.vue';

export default{
  name : 'App',
  components : {
    Home,
    Header,
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
  <router-view></router-view>
</template>

<style lang="scss" scoped>
@use './styles/general.scss' as *;
@use './styles/partials/variables' as *;
@use './styles/partials/mixins' as *;
</style>
