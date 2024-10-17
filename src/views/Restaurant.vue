<script>
import DishCard from '../components/partials/DishCard.vue';
export default{
    name: 'Restaurant',
    components : {
        DishCard,
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
    <!-- jumbo ristorante -->
    <div class="container top">
        <div class="image">
            <img src="../../public/ristorante.jpg" alt="">
        </div>
        <div class="text">
            <h1>Trattoria Sapuri</h1>
            <h3><i class="fa-solid fa-location-dot"></i>  Viale Armando diaz 123</h3>
        </div>
    </div>
    <!-- visualizzazione piatti -->
     <div class="container food">
     </div>
</template>

<style lang="scss" scoped>
@use '../styles/general.scss' as *;
@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;

.container.top{
    @include no-select;
    min-height: 300px;
    background-color: $yellow;
    padding: 20px;

    display: flex;
    justify-content: space-between;

    .image{
        max-height: 300px;
        width: 30%;
        overflow: hidden;
    }
    .text{
        width: 65%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 10px;

        h1{
            font-size: 50px;
        }
        h3{
            padding-left: 10px;
        }
    }
}

.container.food{
    background-color: red;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
</style>
