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
        <div class="bottoni">
            <label for="" v-for="type in types">
                <input type="checkbox" @change="filterRestaurant()" v-model="selectedTypes" :value="type.name">
                {{type.name}}
            </label>
            <!-- <button v-for="type in types" @click="filterRestaurant(type.name)" >{{type.name}}</button> -->
        </div>
        <div class="container-restaurants">
            <RestaurantCard :restaurants="restaurants" />
        </div>
  
    </div>

</template>

<style lang="scss" scoped>
@use '../styles/general.scss' as *;
@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;

.container-card{
    margin: 0 auto;
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
   
    .bottoni{
        padding: 1rem;
        display: flex;
        width: 50%;
        justify-content: space-between;

        button{
            font-size: 20px;
            padding: 7px 16px;
            color: $background_color;
            background-color: $yellow;
            border: none;
            border-radius: 15px;
            transition: 500ms;

                &:hover{
                    background-color:$red;
                    scale: 1.05;
                }
            }
    }

    .container-restaurants{
        width: 80%;
        justify-content: space-between;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
    }
}



</style>
