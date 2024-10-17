<script>
import { store } from './store';
import Home from './views/Home.vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default{
  name : 'App',
  components : {
    Home,
    Header,
    Footer,
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
  <Footer/>
</template>

<style lang="scss" scoped>
@use './styles/general.scss' as *;
@use './styles/partials/variables' as *;
@use './styles/partials/mixins' as *;
</style>
