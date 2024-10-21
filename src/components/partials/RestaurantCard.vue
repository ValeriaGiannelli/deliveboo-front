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
        <h2 class="band-text">{{restaurant.restaurant_name}}</h2> 
        <div class="image-container">
            <img v-if="restaurant.img !== 'http://127.0.0.1:8000/storage/0'" :src="restaurant.img" :alt="restaurant.restaurant_name" class="restaurant-image" />
            <img v-else src="../../../public/ristorante.jpg" :alt="restaurant.restaurant_name" class="restaurant-image" />
            <div class="band">
                <div class="flex-element">
                    <!-- Tipologia di ristorante -->
                    <div>
                        <span class="tag_type" v-for="(type, i) in restaurant.types" :key="i">{{type.name}}</span>
                    </div>
                </div>
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
    height: 250px;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
  
    
    .image-container {
        position: relative;
        width: 100%;
        height: 100%;

        .restaurant-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: filter 1s;
            border-radius: 0 0 10px;
        }

        /* posizione iniziale della banda con i testi */
        .band {
            position: absolute;
            top: 65%; 
            left: 0%;
            right: 0%;
            transition: top 1s, opacity 1s;
            border-radius: 0 0 10px;

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
            //Testo e tag dei ristoranti 
            .flex-element{
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;

                h2,span{
                    display: inline-block;
                }
                //tag type of restaurant 
                .tag_type{
                    background-color: $yellow;
                    border-radius: 15px;
                    padding: 0.3rem 0.5rem;
                    margin: 0.15rem;
                    font-size: 10px;
                    justify-content: flex-end;
                }
            } 
        .band-text{
            font-weight: 400;
            padding: 0.5rem;
        }
   
}
</style>