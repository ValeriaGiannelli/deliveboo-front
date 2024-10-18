<script>
export default {
    name: 'DishCard',
    props:{
        products:{
            type : Array,
            required : true,
        }
    }
}
</script>

<template>
        <div class="card" v-for="(product, i) in products" :key="i" >
            <img :src="product.img" alt="Spaghetti Carbonara" class="card-image" />
            <div class="card-content">
                <div class="title-add">
                    <h2 class="card-title">{{product.name}}</h2>
                    <a href=""><i class="fa-solid fa-circle-plus"></i></a>
                </div>
                <p class="card-description">{{product.ingredients_descriptions}}</p>
                <span class="card-price">{{product.price}}€</span>
            </div>
        </div>
</template>

<style lang="scss" scoped>
@use '../../styles/general.scss' as *;
@use '../../styles/partials/variables' as *;
@use '../../styles/partials/mixins' as *;


.card {
    background:  #F7F5E8;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 20%;
    margin: 20px;
    overflow: hidden;

    

    .card-image {
        width: 100%;
        height: auto;
    }

    .card-content {
        padding: 0 10px 10px;

        .title-add{
            display: flex;
            align-items: center;
            .card-title {
                font-size: 1.5em;
                margin: 10px 0;
            }

            i{
                font-size: 30px;
                color: $yellow;
                transition: 500ms;
                &:hover{
                    color: $red;
                    scale: 1.1;
                }
            }
        }


        .card-description {
            transition: 800ms;
            font-size: 1em;
            margin: 10px 0;
            color: #555;
        }

        .card-price {
            font-size: 1.2em;
            color: $red;
            margin: 10px 0;
            font-weight: 700;
        }
    }
}
</style>