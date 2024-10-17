<script>
export default{
    name: 'Restaurant',
    components : {
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
        <div class="image">
            <img src="../../public/ristorante.jpg" alt="">
        </div>
        <div class="text">
            <h1>Trattoria Sapuri</h1>
            <h3>Viale Armando diaz 123</h3>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../styles/general.scss' as *;
@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;

.container{
    min-height: 300px;
    background-color: $yellow;
    padding: 20px;

    display: flex;
    justify-content: space-between;

    .image{
        max-height: 300px;
        width: 30%;
        background-color: red;
        overflow: hidden;
    }
    .text{
        width: 65%;
    }
}
</style>
