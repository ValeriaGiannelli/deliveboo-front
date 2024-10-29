<script>
import axios from 'axios';
import { store } from '../store';
import Jumbo from '../components/Jumbo.vue';
import RestaurantCard from '../components/partials/RestaurantCard.vue';
import Loader from '../components/partials/loader.vue';
export default{
    name: 'Home',
    components : {
        Jumbo,
        RestaurantCard,
        Loader,
    },
    data(){
        return{
            loading: true,
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
                //console.log('filtro nomi dei tipi', this.typesFilter);
            })
            .catch(err => {
                //console.log('Errore nel recupero dei dati:', err); // LOG ERRORE
            });
        },
        getRestaurants(){
        axios.get(store.apiURL + 'restaurants') // URL API
            .then(res => {
                this.restaurants = res.data; // A BUON FINE
                // ferma il loading
                this.loading = false;
                //console.log('RESTAURANTS DATA:', res.data); // LOG
                //console.log('restaurants',this.restaurants);
            })
            .catch(err => {
                console.log('Errore nel recupero dei dati:', err); // LOG ERRORE
            });
        },

        filterRestaurant(){
            this.loading = true;
            const query = this.selectedTypes.join(',');

            axios.get(store.apiURL + 'restaurants?types=' + query)
                .then(res => {
                    this.restaurants = res.data;
                    this.loading = false;
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

        <div class="container-restaurants loading" v-if="loading">
            <!-- loading di attesa -->
            <div class="my-loader" >
                <Loader />
            </div>
        </div>

        <div class="container-restaurants" v-else>
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
        width: 80%;
        margin:10px 0 20px;

        .checkbox-btn{
            padding: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: calc(100% / 5);
    
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

    .container-restaurants.loading{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .container-restaurants{
        width: 80%;
        display: flex;
        justify-content: start;
        align-items: start;
        flex-wrap: wrap;
        gap: 20px;

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


// TABLET
@media screen and (max-width: 1024px){

.container-card{
    .container-types{
        width: 90%;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;

        .checkbox-btn{
            width: calc(100% / 5);
        }
    }  
    .container-restaurants{
        width: 90%;

        .no-restaurants{
            padding: 0 40px;
            display: inline;
        }
    }
}
}

@media screen and (max-width: 700px){
.container-card{
    .container-types{
        width: 90%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;

        .checkbox-btn{
            width: calc(100% / 3);
        }
    }  
}
}


// MOBILE
@media screen and (max-width: 576px){

    .container-card{
        .container-types{
            width: 100%;

            .checkbox-btn{
                width: calc(100% / 3);
            }
        }
        .container-restaurants{
            width: 100%;
        }
    }
}

@media screen and (max-width: 400px){

    .container-card{
        .container-types{
            width: 100%;

            .checkbox-btn{
                width: calc(100% / 2);
            }
        }
        .container-restaurants{
            width: 100%;
        }
    }
}



</style>
