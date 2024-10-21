<script>
export default {
    name: 'DishCard',
    props:{
        products:{
            type : Array,
            required : true,
        }
    },
    data(){
        return{
        }
    },
    emits: ['add-to-cart'],
    methods:{
        addCart(product){
            this.$emit('add-to-cart',product);
        }
    }
}
</script>

<template>
        <div class="card" v-for="(product, i) in products" :key="i" >
            <img v-if="product.img !== 'http://127.0.0.1:8000/storage/0'" :src="product.img" :alt="product.name" class="card-image" />
            <img v-else src="../../../public/ristorante.jpg" :alt="product.name" class="card-image" />
            <div class="card-content">
                <div class="title-add">
                    <h2 class="card-title">{{product.name}}</h2>
                    <!-- <a @click="addCart(product)" ><i class="fa-solid fa-circle-plus"></i></a> -->
                    <a><i class="fa-solid fa-circle-plus"></i></a>
                </div>
                <div class="desc-price">
                    <p class="card-description">{{product.ingredients_descriptions}}</p>
                    <span class="card-price">{{product.price}}€</span>
                </div>
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
    width: 23%;
    margin: 0 auto;
    overflow: hidden;
    height: 350px;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

    

    .card-image {
        width: 100%;
        height: 45%;
        object-fit: cover;
    }

    .card-content {
        width: 100%;
        height: 55%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0 5px 0;

        .title-add{
            min-height: 50%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 5px;

            .card-title {
                font-size: 1.3em;
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

        .desc-price{
            height: 50%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .card-description {
                transition: 800ms;
                font-size: 1em;
                color: #555;
            }

            .card-price {
                font-size: 20px;
                color: $red;
                font-weight: 700;
            }
        }
    }
}
</style>