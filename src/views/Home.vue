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
    <div class="container-card">
xzxfzfzfz
    </div>

</template>

<style lang="scss" scoped>
@use '../styles/general.scss' as *;
@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;

.container-card{
    margin: 1rem auto;
    width: 80%;
    background-color: $yellow;
}

</style>
