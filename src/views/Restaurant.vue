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
            cartproduct : [],
            totalPrice : 0,
        }
    },
    methods:{

        // prende il ristorante per slug
        getRestaurant(slug){
        axios.get(store.apiURL + 'restaurant/' + slug ) // URL API
            .then(res => {
                this.restaurant = res.data; // A BUON FINE
                // console.log('RESTAURANT DATA:', res.data); // LOG
                // console.log('restaurant',this.restaurant);
            })
            .catch(err => {
                console.log('Errore nel recupero dei dati:', err); // LOG ERRORE
            });
        },

        // prende tutti i prodotti del ristorante selezionato
        getProducts(slug){
        axios.get(store.apiURL + 'restaurant/' + slug + '/products') // URL API
            .then(res => {
                this.products = res.data; // A BUON FINE
                // console.log('PRODUCTS DATA:', res.data); // LOG
                // console.log('products',this.products);
            })
            .catch(err => {
                console.log('Errore nel recupero dei dati:', err); // LOG ERRORE
            });
        },

        deleteCart() {
            this.cartproduct = []; // Svuota il carrello
            this.totalPrice = 0;   // Reset del totale
        },

        deleteCartItem(product){
            //AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
            //Se ci sono più cose e clicco meno le toglie tutte
            this.cartproduct.splice(product);
            this.totalPrice -= parseFloat(product.price);
            this.totalPrice = parseFloat(this.totalPrice.toFixed(2));
        },

        updateCart(product) {
            this.cartproduct.push(product); // Aggiungi il prodotto al carrello
            this.totalPrice += parseFloat(product.price);
            this.totalPrice = parseFloat(this.totalPrice.toFixed(2)); // Aggiungi il prezzo del nuovo prodotto al totale
        },
    }, 

    mounted(){
        const slug= this.$route.params.slug;
        // console.log(id);
        this.getRestaurant(slug);
        this.getProducts(slug);
    },
}
</script>

<template>
    <!-- jumbo ristorante -->
    <div class="container top">
        <div class="image">
            <img v-if="restaurant.img !== 'http://127.0.0.1:8000/storage/0'" :src="restaurant.img" :alt="restaurant.restaurant_name" />
            <img v-else src="../../../public/ristorante.jpg" :alt="restaurant.restaurant_name" />
        </div>
        <div class="text">
            <h1>{{restaurant.restaurant_name}}</h1>
            <h3><i class="fa-solid fa-location-dot"></i> {{restaurant.address}}</h3>
            <p>{{ restaurant.description }}</p>
        </div>
        <div class="tags">
            <h3 >Italiano</h3>
        </div>
    </div>
    <!-- titolo menù -->
    <div class="menu-title">
        Menù:
    </div>
    <!-- visualizzazione piatti + carrello-->
     <div class="container food">
        <div class="food-list">
            <DishCard :products="products" @add-to-cart="updateCart" @delete-item="deleteCartItem" v-if="products.length > 0"/>
            <div v-else class="no-products">Ci dispiace, non ci sono piatti in queste ristorante.<i class="fa-solid fa-heart-crack"></i></div>

        </div>

        <!-- carrello -->
        <div class="cart">

            <div class="top-cart">
                <h3>Il tuo ordine</h3>
                <a @click="deleteCart()"><h3><i class="fa-solid fa-trash-can"></i></h3></a>
            </div>

            <div class="products">

                <div v-if="cartproduct.length > 0" class="full-cart">
                    <CartDishCard :cartproduct="cartproduct"/>
                    <div class="spacer-cart"></div>

                    <div class="price-bar">
                        <div class="spacer">
                            <img src="../../public/LOGO.svg" alt="">
                        </div>
                        <div class="text">Totale:</div>
                        <div class="total-price">{{this.totalPrice}}€</div>
                    </div>
                </div>
            
                <div v-else class="empty-cart">
                    <img src="../../public/LOGO.svg" alt="">
                    <h2>Il carrello è vuoto</h2>
                </div>
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
        overflow: hidden;
        width: 30%;
        
        img{
            border-radius: 25px
        }
    }
    .text{
        width: 55%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 10px;

        h1{
            font-size: 50px;
        }
    }

    .tags{
        width: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        h3{
            border: 2px solid $text_color;
            padding: 5px 20px;
            border-radius: 25px;
            margin-bottom: 10px;
            transition: 500ms;

            &:hover{
                scale: 1.1;
            }
        }
    }
}
.menu-title{
    font-size: 30px;
    font-weight: 700;
    padding: 20px;
    @include no-select;
}

.container.food{
    width: 100%;
    margin: 0 auto;
    flex-wrap: wrap;
    display: flex;
    @include no-select;

    .food-list{
        margin: auto;
        width:66%;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        gap: 10px;
        padding:0 20px;

        .no-products{
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
    .cart{
        width: calc(100% / 3);
        height: 100vh;
        position: sticky;
        top:0;

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
            position: relative;

            .full-cart {
                height: 100%;
                width: 100%;
                overflow-y: auto;
                
                // nascondere barra scorrimento
                ::-webkit-scrollbar {
                    display: none;
                }
                -ms-overflow-style: none;
                scrollbar-width: none;

                .spacer-cart{
                    height: 120px;
                }

                .price-bar{
                    height: 100px;
                    width: 100%;
                    background-color: $background_color;
                    position: absolute;
                    bottom:0;
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
