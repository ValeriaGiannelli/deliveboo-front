<script>
export default {
    name: 'DishCard',
    props:{
        products:{
            type : Array,
            required : true,
        },
        cartProducts: {
        type: Array,
        required: true,
    }
    },
    emits: [
        'add-to-cart',
        'delete-item',
     ],
    methods:{
        increaseQuantity(product) {
           this.$emit('add-to-cart', product);
        },
        decreaseQuantity(product) {
        if (product.quantity > 0) {
            this.$emit('delete-item', product);
        }
    },
        initializeQuantity() {
            this.products.forEach(product => {
                if (typeof product.quantity !== 'number') {
                    // Inizializzo quantity
                    product.quantity = 0; 
                }
            });
            this.products.forEach(product => {
                const cartItem = this.cartProducts.find(item => item.id === product.id);
                product.quantity = cartItem ? cartItem.quantity : 0; // Imposta la quantità basata sul carrello
            });
            
        },
    },
    mounted(){
        // Inizializza la quantità dei prodotti al montaggio del componente
        this.initializeQuantity();

        // log perpetuo di products
        /* this.interval= setInterval(() => {
            console.log(this.products);
        }, 2000); */
    },
    watch: {
        // Osserva eventuali cambiamenti nei dati dei prodotti
        products: {
            handler(newProducts) {
                // Reinzializza se l'array products cambia
                this.initializeQuantity(); 
            },
             // Osserva i cambiamenti a livello di proprietà annidate
            deep: true,
        }
    }
}
</script>

<template>
        <div class="card" v-for="(product, i) in products" :key="i" >
            <div class="card-image">
                <img v-if="product.img !== 'http://127.0.0.1:8000/storage/0'" :src="product.img" :alt="product.name"/>
                <img v-else src="../../../public/ristorante.jpg" :alt="product.name"/>
            </div>
            <div class="card-content">
                <div class="title-add">
                    <h2 class="card-title">Tagliatelle Fresche con Funghi Porcini e Crema al Parmigiano Reggiano</h2>
                    <p class="card-description">{{product.ingredients_descriptions}}</p>
                   
                </div>
                <div class="desc-price">
                    <!-- aggiunta rimozione modifica quantità prodotto  -->
                    <div class="icone-incr-decr">

                        <div class="quantity-counter">
                            <a @click="decreaseQuantity(product)">
                            <i class="fa-solid fa-circle-minus"></i>
                            </a>
                            <div class="quantity-box">{{ product.quantity + 'x' }}</div>
                            <a @click="increaseQuantity(product)">
                                <i class="fa-solid fa-circle-plus"></i>
                            </a>
                            
                        </div>
                        
                        <!-- prezzo del prodotto -->
                        <span class="card-price">{{product.price}}€</span>
                    </div>
                    <!-- prezzo del prodotto -->
                    <!-- <span class="card-price">{{product.price}}€</span> -->
                </div>
            </div>
        </div>
</template>

<style lang="scss" scoped>
@use '../../styles/general.scss' as *;
@use '../../styles/partials/variables' as *;
@use '../../styles/partials/mixins' as *;


.card {
    background:  #F7F5E8;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    overflow: hidden;
    height: 150px;
    margin-bottom: 15px;
    //flex
    display: flex;
    justify-content: space-between;


    &:hover>div>img{
        scale: 1.05;
        filter: brightness(80%);
    }

    .card-image{
        height: 100%;
        aspect-ratio: 1/1;
        overflow: hidden;
        img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: 500ms;
        overflow: hidden;
        }
    }




    .card-content {
        width: calc(100% - 150px);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0 5px 0;
        position: relative;

        .title-add{
            width: calc(100% - 100px);
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 10px;
            margin-right:  100px;

            

            .card-title {
                font-size: 1.3em;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                max-width: 1200px;
                width: 100%;
            }

            
            .card-description {
                width: 100%;
                transition: 800ms;
                font-size: 1em;
                color: #555;
            }
        }

        .icone-incr-decr{
            position: absolute;
            height: calc(100% - 20px);
            width: 100px;
            background-color: #F7F5E8;
            top: 10px;
            right: 0;
            margin: auto;
            display: flex;
            align-items: center;
            justify-content: space-around;
            flex-direction: column;
            gap: 0.1rem;
            overflow: hidden;

            .quantity-counter{
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex-direction: row;
                .quantity-box {
                    color: $red;
                    display: inline-block;
                    width: 20%;
                    aspect-ratio: 1/1;
                    font-weight: 700;
                    margin: 0px;
                    font-size: 23px;
                    margin: 0 10px;

                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                i{
                    font-size: 20px;
                    color: $yellow;
                    transition: 500ms;
                    &:hover{
                        color: $red;
                        scale: 1.1;
                    }
                }
            }
            
        }

        .desc-price{
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 1rem;
            gap: 0.5rem;

            .card-price {
                font-size: 20px;
                color: $red;
                font-weight: 700;
            }
        }
    }
}

// CUSTOM
@media screen and (max-width:  800px){
    .card{
        .card-image{
            display: none;
        }

        .card-content {
            width: 100%;

            .title-add{
                .card-title,
                .card-description {
                    padding-left: 10px;
                }
            }
        }
    }   
}

// MOBILE
@media screen and (max-width:  576px){
    .card{
        .card-image{
            display: none;
        }

        .card-content {
            width: 100%;

            .title-add{
                .card-title,
                .card-description {
                    padding-left: 10px;
                }
            }
        }
    }   
}
</style>