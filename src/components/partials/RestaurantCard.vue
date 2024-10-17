<script>
export default {
    name: 'RestaurantCard'
}
</script>
<template>
    <div class="restaurant-card">
        <div class="image-container">
            <img src="../../../public/ristorante.jpg" alt="Restaurant Image" class="restaurant-image" />
            <div class="band">
                <h2 class="band-text">Trattoria dei Sapori Visibile</h2>
                <p class="addres-restaurant">Viale Armando diaz 123</p>
                <p class="description-restaurant">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit quas sint natus non, beatae pariatur! </p>
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
    
    .image-container {
        position: relative;

        .restaurant-image {
            width: 100%;
            height: 100%;
            transition: filter 1s;
            border-radius: 10px;
        }

        .band {
            position: absolute;
            top: 80%; /* posizione iniziale */
            left: 1%;
            right: 1%;
            transition: top 1s, opacity 1s;
            

            .addres-restaurant, .description-restaurant {
                display: none; /* inizialmente nascosto */
            }
        }

        &:hover {
            .restaurant-image {
                filter: brightness(0.5); /* sbiadisce l'immagine */
            }

            .band {
                top: 5%; 
                opacity: 1; 
                
                .addres-restaurant, .description-restaurant {
                    display: block; /*l'indirizzo */
                }
            }
        }
    }
    h2,p {
            color: black; 
            background-color: rgba(255, 255, 255, 0.66); 
    }
}
</style>