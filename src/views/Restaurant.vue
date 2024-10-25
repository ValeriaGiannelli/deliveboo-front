<script>
import axios from 'axios';
import { store } from '../store';
import DishCard from '../components/partials/DishCard.vue';
import CartDishCard from '../components/partials/CartDishCard.vue';
import DropIn from '../components/DropIn.vue';
import { RouterLink } from 'vue-router';
import Loader from '../components/partials/loader.vue';

export default {
    name: 'Restaurant',
    components: {
        DishCard,
        CartDishCard,
        DropIn,
        Loader,
    },
    data() {
        return {
            loading: true,
            restaurant: [],
            products: [],
            cartproduct: [],
            totalPrice: 0,
            showPopupDelete : false,
            showConflictPopup: false, // Aggiungi questa proprietà
        };
    },
    methods: {
        getRestaurant(slug) {
            axios.get(store.apiURL + 'restaurant/' + slug)
                .then(res => {
                    this.restaurant = res.data;
                })
                .catch(err => {
                    console.log('Errore nel recupero dei dati:', err);
                });
        },

        getProducts(slug) {
            axios.get(store.apiURL + 'restaurant/' + slug + '/products')
                .then(res => {
                    this.products = res.data;
                    this.loading = false;
                })
                .catch(err => {
                    console.log('Errore nel recupero dei dati:', err);
                });
        },

        deleteCart() {
            this.cartproduct = [];
            this.totalPrice = 0;
            this.products.forEach(product => product.quantity = 0);
            localStorage.removeItem('cart'); // Rimuove il carrello dal localStorage
            this.showPopupDelete= false;
            document.body.style.overflow = '';
        },

        deleteCartItem(product) {
            const cartItem = this.cartproduct.find(item => item.id === product.id);
            if (cartItem) {
                cartItem.quantity--; // Decrementa la quantità
                if (cartItem.quantity <= 0) {
                    const index = this.cartproduct.indexOf(cartItem);
                    this.cartproduct.splice(index, 1); // Rimuovi il prodotto se la quantità è zero
                }
            }

            // Aggiorna la quantità del prodotto originale
            product.quantity = cartItem ? cartItem.quantity : 0;

            this.totalPrice -= parseFloat(product.price);
            this.totalPrice = parseFloat(this.totalPrice.toFixed(2));
            this.saveCartToLocalStorage();
        },

        updateCart(product) {
            const existingProduct = this.cartproduct.find(item => item.id === product.id);
            
            // Controlla se il carrello contiene un ristorante diverso
            const currentRestaurantSlug = this.restaurant.slug; // Presupponendo che tu abbia uno slug unico per il ristorante
            const cartHasDifferentRestaurant = this.cartproduct.length > 0 && this.cartproduct[0].restaurantSlug !== currentRestaurantSlug;

            if (cartHasDifferentRestaurant) {
                this.showConflictPopup = true; // Mostra il popup di conflitto
            } else {
                if (existingProduct) {
                    existingProduct.quantity++;
                } else {
                    this.cartproduct.push({ ...product, quantity: 1, restaurantSlug: currentRestaurantSlug }); // Aggiungi lo slug del ristorante
                }

                product.quantity = existingProduct ? existingProduct.quantity : 1;
                this.totalPrice += parseFloat(product.price);
                this.totalPrice = parseFloat(this.totalPrice.toFixed(2));
                this.saveCartToLocalStorage();
            }
        },

        saveCartToLocalStorage() {
            const cartData = {
                cartproduct: this.cartproduct,
                totalPrice: this.totalPrice
            };
            localStorage.setItem('cart', JSON.stringify(cartData));
        },

        loadCartFromLocalStorage() {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                const cartData = JSON.parse(savedCart);
                this.cartproduct = cartData.cartproduct || [];
                this.totalPrice = cartData.totalPrice || 0;
                this.products.forEach(product => {
                    const cartItem = this.cartproduct.find(item => item.id === product.id);
                    product.quantity = cartItem ? cartItem.quantity : 0;
                });
            }
        },

        // POPUP
        openPopup(){
            if(this.cartproduct.length > 0){
                this.showPopupDelete= true;
                document.body.style.overflow = 'hidden';
            }
        },
        closePopup(){
            this.showPopupDelete= false;
            document.body.style.overflow = '';
        },
        closeConflictPopup() {
        this.showConflictPopup = false;
        },
        deleteCartAndAdd(product) {
        this.deleteCart(); // Svuota il carrello
        this.showConflictPopup = false; // Chiudi il popup
    },
    },
    mounted() {
        const slug = this.$route.params.slug;
        this.getRestaurant(slug);
        this.getProducts(slug);
        this.loadCartFromLocalStorage(); // Load cart data on mount
    },
    // beforeRouteLeave(to, from, next) {
    //     const excludedRoute = 'checkout';
    //     if (to.name === excludedRoute) {
    //     // Se si sta navigando verso la route esclusa, procedi senza svuotare il carrello
    //         next();
    //     } else {
    //         const confirmLeave = window.confirm('Sei sicuro di voler uscire? Il carrello verrà svuotato.');
    //         if (confirmLeave) {
    //             this.deleteCart(); // Clear the cart if leaving
    //             next(); // Proceed to the new route
    //         } else {
    //             next(false); // Stay on the current route
    //         }
    //     }
    // },

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
            <h3  v-for="(type, i) in restaurant.types" :key="i">{{type.name}}</h3>
        </div>
    </div>

    <!-- titolo menù -->
    <div class="menu-title">
        Menù:
    </div>

    <!-- visualizzazione piatti + carrello-->
     <div class="container food">

        <div class="food-list loading" v-if="loading">
            <!-- loading di attesa -->
            <div class="my-loader" >
                <Loader />
            </div>
        </div>
        
        <div class="food-list" v-else>

            <!-- card dei prodotti -->
            <DishCard :products="products" :cartProducts="cartproduct" @add-to-cart="updateCart" @delete-item="deleteCartItem" v-if="products.length > 0"/>
            
            <!-- avviso che non ci sono prodotti -->
            <div v-else class="no-products">Ci dispiace, non ci sono piatti in questo ristorante.<i class="fa-solid fa-heart-crack"></i></div>

        </div>

        <!-- carrello -->
        <div class="cart">

            <div class="top-cart">
                <h3>Il tuo ordine</h3>
                <a @click="openPopup" ><h3><i class="fa-solid fa-trash-can"></i></h3></a>
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
                        <div class="total-price">{{this.totalPrice.toFixed(2)}}€</div>
                    </div>
                </div>
            
                <div v-else class="empty-cart">
                    <img src="../../public/LOGO.svg" alt="">
                    <h2>Il carrello è vuoto</h2>
                </div>
            </div>

            <div class="buy">
                <RouterLink :to="{name: 'checkout'}" class="buy-button" >Vai al pagamento</RouterLink>
            </div>

            
            
        </div>
    </div>


    <!-- popup svuota carrello -->
     <div v-if="showPopupDelete" class="container-fs">
        <div class="popup">

            <div class="top-buttons">
                <button @click="closePopup"><i class="fa-solid fa-xmark"></i></button>
            </div>

            <div class="mid">
                <h2>Il carrello verrà svuotato e tutti i prodotti dovranno essere reinseriti. Procedere?</h2>
            </div>

            <div class="bottom-buttons">
                <button class="cancel" @click="closePopup" >annulla</button>
                <button class="delete" @click="deleteCart">svuota</button>
            </div>

        </div>
     </div>

    <!-- popup conflitto carrello -->
    <div v-if="showConflictPopup" class="container-fs">
        <div class="popup">
            <div class="top-buttons">
                <button @click="closeConflictPopup"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="mid">
                <h2>Hai già piatti di un altro ristorante nel carrello. Vuoi svuotarlo?</h2>
            </div>
            <div class="bottom-buttons">
                <button class="cancel" @click="closeConflictPopup">Annulla</button>
                <button class="delete" @click="deleteCartAndAdd(product)">Svuota</button>
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

    .food-list.loading{
        display: flex;
        justify-content: center;
        align-items: center;
    }

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

.container-fs{
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 100;
    overflow: hidden;

    // flex
    display: flex;
    justify-content: center;
    align-items: center;

    .popup{
        height: calc(100% / 2.5);
        aspect-ratio: 35/22;
        border-radius: 10px;
        overflow: hidden;

        // flex
        display: flex;
        flex-direction: column;

        .top-buttons,
        .mid,
        .bottom-buttons{
            padding: 10px 15px;
            background-color: $background_color;
            overflow: hidden;

            button{
                border: 0;
            }
        }

        .top-buttons{
            width: 100%;
            height: 15%;

            // flex
            display: flex;
            align-items: center;
            justify-content: flex-end;

            button{
                font-size: 20px;
                display: block;
                color: $red;
                background-color: $background_color;
                i{
                    transition: 500ms;

                    &:hover{
                        color: $yellow;
                        scale: 1.2;
                    }

                }
            }
        }

        .mid{
            width: 100%;
            height: 70%;
            
            // flex
            display: flex;
        }

        .bottom-buttons{
            width: 100%;
            height: 15%;

            // flex
            display: flex;
            align-items: center;
            justify-content: flex-end;

            button{
                padding: 7px 12px;
                margin-left: 15px;
                border-radius: 10px;
                font-size: 18px;
                background-color: $background_color;
            }

            .cancel{
                font-weight: 300;
                transition: 500ms; 
                &:hover{
                        background-color: $yellow;
                        scale: 1.05;
                    }
            }

            .delete{
                color: $red;
                font-weight: 700;
                transition: 500ms;

                &:hover{
                        background-color: $red;
                        color: $text_color;
                        scale: 1.05;
                    }
            }
        }
    }
}
</style>
