<script>
import Loader from './partials/loader.vue';
import loader from './partials/loader.vue';
export default{
    name: 'Loading',
    components : {
        Loader,
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
    <div class="container">
        <loader/>
    </div>
</template>

<style lang="scss" scoped>
@use '../styles/general.scss' as *;
@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;

.container{
    height: 100vh;
    width: 100%;
    background-color: $background_color;

    // flex
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
