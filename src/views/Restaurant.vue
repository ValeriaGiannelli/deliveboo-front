<script>
import axios from 'axios';
import { store } from '../store';
import DishCard from '../components/partials/DishCard.vue';
import CartDishCard from '../components/partials/CartDishCard.vue';
export default{
    name: 'Restaurant',
    components : {
        DishCard,
        CartDishCard,
    },
    data(){
        return{
            restaurant :[],
            products :[],
        }
    },
    methods:{
        getRestaurant(id){
        axios.get(store.apiURL + 'restaurant/' + id ) // URL API
            .then(res => {
                this.restaurant = res.data; // A BUON FINE
                console.log('RESTAURANT DATA:', res.data); // LOG
                console.log('restaurant',this.restaurant);
            })
            .catch(err => {
                console.log('Errore nel recupero dei dati:', err); // LOG ERRORE
            });
        },

        getProducts(id){
        axios.get(store.apiURL + 'restaurants/' + id + '/products') // URL API
            .then(res => {
                this.products = res.data; // A BUON FINE
                console.log('PRODUCTS DATA:', res.data); // LOG
                console.log('products',this.products);
            })
            .catch(err => {
                console.log('Errore nel recupero dei dati:', err); // LOG ERRORE
            });
        },

    },
    mounted(){
        const id= this.$route.params.id;
        console.log(id);
        this.getProducts(id);
        this.getRestaurant(id);
    },
}
</script>

<template>
    <!-- jumbo ristorante -->
    <div class="container top">
        <div class="image">
            <img src="../../public/ristorante.jpg" alt="">
        </div>
        <div class="text">
            <h1>{{restaurant.restaurant_name}}</h1>
            <h3><i class="fa-solid fa-location-dot"></i>  {{restaurant.address}}</h3>
        </div>
    </div>
    <!-- titolo menù -->
    <div class="menu-title">
        Menù:
    </div>
    <!-- visualizzazione piatti + carrello-->
     <div class="container food">
        <div class="food-list">
            <DishCard :products="products"/>
        </div>

        <!-- carrello -->
        <div class="cart">

            <div class="top-cart">
                <h3>Il tuo ordine</h3>
                <a href=""><h3><i class="fa-solid fa-trash-can"></i></h3></a>
            </div>

            <div class="products">

                <div class="full-cart">
                    <CartDishCard/>

                    <div class="price-bar">
                        <div class="spacer">
                            <img src="../../public/LOGO.svg" alt="">
                        </div>
                        <div class="text">Totale:</div>
                        <div class="total-price">3456$</div>
                    </div>
                </div>
            
                <!-- <div class="empty-cart">
                    <img src="../../public/LOGO.svg" alt="">
                    <h2>Il carrello è vuoto</h2>
                </div> -->
            </div>

            <div class="buy">
                <div class="buy-button">Vai al pagamento</div>
            </div>
            
        </div>
     </div>
</template>

<style lang="scss" scoped>
@use '../styles/general.scss' as *;
@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;

.container.top{
    @include no-select;
    background-color: $yellow;
    padding: 20px;

    display: flex;
    justify-content: space-between;

    .image{
        max-height: 300px;
        width: 30%;
        overflow: hidden;
    }
    .text{
        width: 65%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 10px;

        h1{
            font-size: 50px;
        }
        h3{
            padding-left: 10px;
        }
    }
}
.menu-title{
    font-size: 30px;
    font-weight: 700;
    padding: 20px 0 0;
    padding-left: 50px;
    @include no-select;
}

.container.food{
    width: 100%;
    margin: 0 auto;

    flex-wrap: wrap;
    display: flex;
    @include no-select;

    .food-list{
        width: 70%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        padding-bottom: 100px;
    }
    .cart{
        width: 30%;
        height: 100vh;
        position: sticky;
        top:0;
        padding: 0 20px;

        .top-cart{
            color:  $yellow;
            height: 10%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;

            a>h3>i{
                color: $text_color;
                transition: 500ms;
                &:hover{
                    color: $red;
                    scale: 1.05;
                }
            }
        }

        .products{
            height: 75%;
            display: flex;
            background-color: $shadow;
            border-radius: 25px;

            .full-cart {
                height: 100%;
                width: 100%;
                position: relative;
                overflow-y: auto;
                
                /* Nascondere la barra di scorrimento */
                ::-webkit-scrollbar {
                    display: none;
                }
                -ms-overflow-style: none;
                scrollbar-width: none;

                .price-bar{
                    height: 100px;
                    width: 100%;
                    background-color: $background_color;
                    position: sticky;
                    bottom: 0;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .spacer{
                        width: 10%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 30px;
                    }

                    .text{
                        padding-left: 10px;
                        width: 75%;
                        font-size: 20px;
                        font-weight: 700;
                    }
                    .total-price{
                        font-weight: 700;
                        width: 15%;
                        font-size: 20px;
                        color: $red;
                    }

                }
            }

            .empty-cart{
                height: 100%;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                gap: 20px;
                img{
                    height: 70px
                }
            }
        }

        .buy{
            height: 10%;
            display: flex;
            justify-content: center;
            align-items: center;

            .buy-button{
                padding: 10px 30px;
                font-size: 20px;
                background-color: $yellow;
                border-radius: 10px;
                transition: 500ms;
                &:hover{
                    background-color:$red;
                    scale: 1.05;
                }
            }
        }

    }



}
</style>
