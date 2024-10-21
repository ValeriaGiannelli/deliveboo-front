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
        <div class="amount">1x</div>
        <div class="name">{{product.name}}</div>
        <div class="price">{{product.price}}</div>
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

    &>div{
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background:  #F7F5E8;
        font-weight: 600;
    }

    .amount{
        width: 10%;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        border-right: 3px solid $shadow;

    }
    .name{
        width: 75%;
        justify-content: flex-start;
        align-items: center;
        padding-left: 10px;

    }
    .price{
        width: 15%;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        color: $red;
        border-left: 3px solid rgba($color: #000000, $alpha: 0.02);

    }
}

</style>