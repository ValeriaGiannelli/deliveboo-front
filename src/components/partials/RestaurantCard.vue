<script>
export default {
    name: 'RestaurantCard',
    props:{
        restaurants:{
            type : Array,
            required : true,
        }
    }
}
</script>
<template>
    <div v-for="(restaurant, i) in restaurants" :key="i">





        <a :href="'/restaurant/' + restaurant.id" class="restaurant-card">

            <!-- body della card -->
            <div class="image-container">
                <img v-if="restaurant.img !== 'http://127.0.0.1:8000/storage/0'" :src="restaurant.img" :alt="restaurant.restaurant_name" class="restaurant-image" />
                <img v-else src="../../../public/ristorante.jpg" :alt="restaurant.restaurant_name" class="restaurant-image" />
                
                <!-- tipologia -->
                <div class="type-box">
                    <span class="type-tag" v-for="(type, i) in restaurant.types" :key="i">{{type.name}}</span>
                </div>
            </div>

        <!-- nome ristorante -->
            <h2>
                {{restaurant.restaurant_name}}
            </h2>
        
        </a>





    </div>
</template>
  
<style lang="scss" scoped>
@use '../../styles/general.scss' as *;
@use '../../styles/partials/variables' as *;
@use '../../styles/partials/mixins' as *;

a.restaurant-card{
    margin-bottom: 50px;
    display: block;

    .image-container{
        height: 220px;
        width: 350px;
        border-radius: 10px;
        position: relative;
        overflow: hidden;

        &:hover>img{
            scale: 1.05;
        }

        img{
            height: 100%;
            width: 100%;
            object-fit: cover;
            transition: 500ms;
        }

        .type-box{
            position: absolute;
            bottom: 10px;
            right: 0px;

            .type-tag{
                font-weight: 700;
                font-size: 11px;
                background-color: $yellow;;
                border-radius: 10px;
                padding: 0.3rem 0.5rem;
                margin-right: 10px;
            }
        }


    }

    h2{
        font-size: 22px;
        padding: 10px 0 0;
        font-weight: 500;
    }
}

</style>