<script>
import Jumbo from '../components/Jumbo.vue';
export default{
    name: 'Home',
    components : {
        Jumbo,
    },
    data(){
        return{

        }
    },
    methods:{

    }
}
</script>

<template>
    <Jumbo/>
    <h2>sono home</h2>
</template>

<style lang="scss" scoped>
@use '../styles/general.scss' as *;
@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;

</style>
