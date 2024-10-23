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

        <router-link :to="{name: 'restaurant', params: {slug: restaurant.slug}} " class="restaurant-card">
         <!-- :href="'/restaurant/' + restaurant.id" class="restaurant-card"> -->

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
        
        </router-link>





    </div>
</template>
  
<style lang="scss" scoped>
@use '../../styles/general.scss' as *;
@use '../../styles/partials/variables' as *;
@use '../../styles/partials/mixins' as *;

div{
    // dimensione di 1/ X del container - il gap moltiplicato per X-1 (se X!=1 no gap) / X (container per riga)
    width: calc((100% / 3) - 40px / 3);
    .restaurant-card{
        display: block;
        background:  #F7F5E8;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        overflow: hidden;

        .image-container{
            width: 100%;
            aspect-ratio: 35/22;
            position: relative;
            overflow: hidden;

            img{
                height: 100%;
                width: 100%;
                object-fit: cover;
                transition: 500ms;
            }

            .type-box{
                width: 100%;
                gap: 10px;
                display: flex;
                justify-content: end;
                position: absolute;
                right: 0.5rem;
                bottom: 0.7rem;

                .type-tag{
                    font-weight: 700;
                    font-size: 11px;
                    background-color: $yellow;
                    border-radius: 10px;
                    padding: 0.3rem 0.5rem;
                    transition: 500ms;
                }
            }


        }

        h2{
            font-size: 22px;
            padding: 10px;
            font-weight: 500;
        }

        &:hover>div>img{
            scale: 1.05;
            filter: brightness(70%);
        }
        &:hover>div>div>.type-tag{
            scale: 1.05;
        }
    }

}

// TABLET
@media screen and (max-width: 1024px){

    div{
    // dimensione di 100%/ X del container - il gap moltiplicato per X-1 (se X!=1 no gap) / X (container per riga)
    width: calc((100% / 2) - 20px / 2);
        .restaurant-card{

            .image-container{

                img{
                }

                .type-box{
                    .type-tag{
                    }
                }


            }

            h2{
            }
        }

    }
}

// MOBILE
@media screen and (max-width:  576px){

    div{
    // dimensione di 100%/ X del container - il gap moltiplicato per X-1 (se X!=1 no gap) / X (container per riga)
    width: 100%;
        .restaurant-card{

            .image-container{

                img{
                }

                .type-box{
                    .type-tag{
                    }
                }


            }

            h2{
            }
        }

    }
}

</style>