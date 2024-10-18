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
    <div class="restaurant-card" v-for="(restaurant, i) in restaurants" :key="i">
        <div class="image-container">
            <img :src="restaurant.img" :alt="restaurant.restaurant_name" class="restaurant-image" />
            <div class="band">
                <h2 class="band-text">{{restaurant.restaurant_name}}</h2>
                <p class="addres-restaurant"><strong>{{restaurant.address}}</strong></p>
                <p class="description-restaurant">{{ restaurant.description }} </p>
                <br>
                <br>
                <button class="bottoni"><a :href="'/restaurant/' + restaurant.id">Vai al ristorante</a></button>
            </div>
        </div>
    </div>
</template>
  
<style lang="scss" scoped>
@use '../../styles/general.scss' as *;
@use '../../styles/partials/variables' as *;
@use '../../styles/partials/mixins' as *;

.restaurant-card {
    position: relative;
    width: 350px;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
    
    .image-container {
        position: relative;

        .restaurant-image {
            width: 100%;
            height: 100%;
            transition: filter 1s;
            border-radius: 10px;
        }

        /* posizione iniziale della banda con i testi */
        .band {
            position: absolute;
            top: 78%; 
            left: 0%;
            right: 0%;
            transition: top 1s, opacity 1s;
            border-radius: 10px;

            /*l'indirizzo e descrizione inizialmente nascosti */
            .addres-restaurant, .description-restaurant, button {
                display: none; 
            }
        }

        /* cambiamenti all'hover sull'immagine */
        &:hover {
            /* sbiadimento dell'immagine */
            .restaurant-image {
                filter: brightness(0.5); 
            }

            .band {
                top: 0%; 
                opacity: 1; 
                height:100%; 
                border-radius: 10px;

                /*l'indirizzo e descrizione visibile*/
                .addres-restaurant, .description-restaurant, button {
                    display: block; 
                }
            }
        }
    }

    .band{
            color: black; 
            background-color: rgba(255, 255, 255, 0.66);
            padding: 0.5rem;
    }
    button{
        align-content: center;
        font-size: 15px;
        padding: 7px 16px;
        color: $background_color;
        background-color: $yellow;
        border: none;
        border-radius: 15px;
        transition: background-color 500ms;
        display: block;
        margin: auto;


            .bottoni{
                padding: 1rem;
                display: flex;
                width: 50%;
                justify-content: space-between;               
            }
                &:hover{
                    background-color:$red;
                    scale: 1.05;
                }
            }
       
  
}
</style>