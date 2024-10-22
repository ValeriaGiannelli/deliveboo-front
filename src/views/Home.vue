<script>
import axios from 'axios';
import { store } from '../store';
import Jumbo from '../components/Jumbo.vue';
import RestaurantCard from '../components/partials/RestaurantCard.vue';
export default{
    name: 'Home',
    components : {
        Jumbo,
        RestaurantCard,
    },
    data(){
        return{
            types :[],
            restaurants :[],
            selectedTypes : [],
            typesFilter : []
            
        }
    },
    methods:{
        getRestaurantTypes(){
        axios.get(store.apiURL + 'types') // URL API
            .then(res => {
                this.types = res.data; // A BUON FINE
                // console.log('TYPES DATA:', res.data);
                // console.log('types',this.types);
                this.types.forEach(type => {
                    this.typesFilter.push({
                        'name' : type.name.toLowerCase() + ',',
                        'active' : false,
                    })
                });
                console.log('filtro nomi dei tipi', this.typesFilter);
            })
            .catch(err => {
                console.log('Errore nel recupero dei dati:', err); // LOG ERRORE
            });
        },
        getRestaurants(){
        axios.get(store.apiURL + 'restaurants') // URL API
            .then(res => {
                this.restaurants = res.data; // A BUON FINE
                console.log('RESTAURANTS DATA:', res.data); // LOG
                console.log('restaurants',this.restaurants);
            })
            .catch(err => {
                console.log('Errore nel recupero dei dati:', err); // LOG ERRORE
            });
        },

        filterRestaurant(){
            
            const query = this.selectedTypes.join(',');

            axios.get(store.apiURL + 'restaurants?types=' + query)
                .then(res => {
                    this.restaurants = res.data;
                })
                .catch(error => {
                    console.error("Errore durante la chiamata API:", error);
                });
        }

    },
    mounted(){
        this.getRestaurantTypes();
        this.getRestaurants();
    },
}
</script>

<template>
    <Jumbo/>
    <div class="container-card">
        <h2>Cosa ti va di mangiare?</h2>
        <div class="container-types">
            <div class="checkbox-btn" v-for="type in types">
                    <input type="checkbox" @change="filterRestaurant()" v-model="selectedTypes" :value="type.name" :id="type.name">
                    <label :for="type.name">{{ type.name }}</label>
            </div>
        </div>
        <div class="container-restaurants">
            <RestaurantCard :restaurants="restaurants" v-if="restaurants.length > 0"/>
            <div v-else class="no-restaurants">Ci dispiace, non sono disponibili ristoranti con queste categorie.<i class="fa-solid fa-heart-crack"></i></div>
        </div>
  
    </div>

</template>

<style lang="scss" scoped>
@use '../styles/general.scss' as *;
@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;

.container-card{
    margin: 20px auto;
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    .container-types{
        display: flex;
        margin:10px 0 20px;

        .checkbox-btn{
            padding: 1rem;
            display: inline-block;
            width: 50%;
    
            input[type="checkbox"]{
                display:none;

                &:checked + label {
                    background-color: $yellow;
                    color: $text-color;
                    transform: scale(1.1);
                }
            }

            label{
                display: inline-block;
                padding: 10px 20px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                font-weight: bold;
                // background-color: white;
                color: $text-color;
                border-radius: 10px;
                cursor: pointer;
                transition: all 0.3s ease;

                &:hover{
                    background-color: #f7c5488f;
                    transform: scale(1.1);
                }
            }
        }
    }

    

    .container-restaurants{
        width: 80%;
        justify-content: space-between;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;

        .no-restaurants{
            width: 100%;
            aspect-ratio: 1 / 0.25;
            display: flex;
            justify-content: center;
            align-items: center;
            
            font-size: 25px;


            i{
                padding-left: 10px;
            }
        }
    }
}



</style>
