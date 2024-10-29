<script>
export default {
    name: 'CartDishCard',
    data(){
        return{
        }
    },
    props:{
        cartproduct:{
            type : Array,
            required : true,
        }
    }
}
</script>

<template>
    <div v-for="(product, i) in cartproduct" :key="i" class="container">
        <div class="amount">{{product.quantity}}x</div>
        <div class="name">{{product.name}}</div>
        <div class="price">{{(product.quantity * product.price).toFixed(2)}}€</div>
    </div>
</template>

<style lang="scss" scoped>
@use '../../styles/general.scss' as *;
@use '../../styles/partials/variables' as *;
@use '../../styles/partials/mixins' as *;

.container{
    display: flex;
    width: 100%;
    height: 80px;
    align-items: center;
    padding: 5px;

    .amount,
    .price{
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background:  #F7F5E8;
        font-weight: 600;
        overflow: hidden;
    }

    .amount{
        width: 10%;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        border-right: 3px solid $shadow;

    }
    .name{
        background:  #F7F5E8;
        font-weight: 600;
        width: 75%;
        padding-left: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: block;
        line-height: 70px;

    }
    .price{
        width: 15%;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        color: $red;
        border-left: 3px solid rgba($color: #000000, $alpha: 0.02);

    }
}

// TABLET
@media screen and (max-width: 1024px){ 
}

// MOBILE
@media screen and (max-width:  576px){
}


</style>