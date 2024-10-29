<script>
import { store } from '../store';

export default {
    name: 'Header',
    data() {
        return {
            store,
        };
    },
    methods: {
        goBack() {
            window.history.back();
        },
        countCart() {
            return store.Hcart.reduce((total, item) => total + (item.quantity || 1), 0);
        },
        countCartPrice(){
            return store.Hcart.reduce((total, item) => total + (parseFloat(item.price * item.quantity) || 0), 0).toFixed(2);
        },
        changeCartView(){
            store.isCartOpen = !store.isCartOpen;
            console.log(store.isCartOpen);
        }
    },
};
</script>


<template>
    <div class="container">
         <div class="logo">
             <a href="http://localhost:5174" ><img src="../../public/FULL_LOGO.svg" alt=""></a>
         </div>
         <div class="buttons">    
            <a href="http://127.0.0.1:8000/">Collabora con noi</a>
            <div class="cart-box">
                <div class="icon-box">
                    <i class="fa-solid fa-cart-shopping icon"></i>
                    <i @click="changeCartView" class="fa-solid fa-cart-shopping mobile-button"></i>
                    <div v-if="countCart() != 0" class="item-amount-dot">
                        <p>{{ countCart() }}</p>
                    </div>
                </div>
                <!-- DROPDOWN CARRELLo -->

                <div class="cart">
                    <div v-for="(item, i) in store.Hcart" :key="i" class="cart-item">
                        <div class="amount">{{ item.quantity }}</div>   
                        <div class="name">{{ item.name }}</div>         
                        <div class="price">{{ (item.price * item.quantity).toFixed(2) }}&euro;</div>      
                    </div>
                    <!-- Bottone pagamento -->
                    <!-- <div v-if="store.Hcart.length > 0" class="buy">
                        <RouterLink :to="{name: 'checkout'}" class="buy-button" >Vai al pagamento</RouterLink>
                        <div @click="store.clearCart" class="delete"><i class="fa-solid fa-trash-can"></i></div>
                        <div class="price">{{ countCartPrice() }}&euro;</div>
                    </div> -->
                </div>
                
                
            </div>


         </div>
     </div>
 </template>

<style lang="scss" scoped>
@use '../styles/general.scss' as *;
@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;

.container{
    @include no-select;
    background-color: $background_color;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    .logo{
        width: 200px;
    }

    .buttons{
        display: flex;
        justify-content: center;
        align-items: center;

        a{
            font-weight: 600;
            color: $yellow;
            padding-right: 10px;
            transition: 500ms;
            &:hover{
                font-weight: 700;
                color: $red;
            }
        }
        .cart-box{
            background-color: $background-color;
            position: relative;

            // box icona
            .icon-box{
                // icona carrello
                .icon,
                .mobile-button{
                font-size: 20px;
                padding: 1rem;
                color: $yellow; 
                transition: 500ms;
                }
                .mobile-button{
                    display: none;
                }

                // contatore icona
                .item-amount-dot{
                    position: absolute;
                    top: 50%;
                    right: 10%;
                    width: 15px;
                    height: 15px;
                    aspect-ratio: 1/1;
                    background-color: $red;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    font-size: 10px;
                }

            }

            // popup carrello
            .cart{
                overflow: hidden;
                height: 0;
                border-radius: 10px;
                border-top-right-radius: 0;
                position: absolute;
                width: 400px;
                background-color:  #F7F5E8;
                right: 0;
                transform: translate();
                z-index: 100;
                transition: 500ms;

                .buy{
                    height: 50px;
                    border-bottom: 3px solid $shadow;
                    transition: 500ms;
                    padding: 5px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    margin: 5px;
                    border-radius: 10px;
                    // flex
                    display: none;
                    justify-content: space-between;
                    align-items: center;

                    .delete{
                        padding: 10px 30px;
                        font-size: 20px;
                        background-color: $yellow;
                        border-radius: 10px;
                        transition: 500ms;
                        color: $text-color;
                        &:hover{
                            background-color:$red;
                            scale: 1.05;
                        }

                    }

                    .price{
                        width: 20%;
                        border-top-right-radius: 20px;
                        border-bottom-right-radius: 20px;
                        color: $red;
                        border-left: 3px solid rgba($color: #000000, $alpha: 0.02);
                    }
                    .buy-button{
                        padding: 10px 30px;
                        font-size: 20px;
                        background-color: $yellow;
                        border-radius: 10px;
                        transition: 500ms;
                        color: $text-color;
                        &:hover{
                            background-color:$red;
                            scale: 1.05;
                        }
                    }
                }


                .cart-item{
                    height: 50px;
                    border-bottom: 3px solid $shadow;
                    transition: 500ms;
                    padding: 5px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    margin: 5px;
                    border-radius: 10px;

                    // flex
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .amount{
                        width: 10%;
                        border-top-left-radius: 20px;
                        border-bottom-left-radius: 20px;
                        border-right: 3px solid $shadow;

                    }
                    .name{
                        width: 70%;
                        white-space: nowrap;
                        overflow: hidden;
                        padding-left: 10px;
                        text-overflow: ellipsis;

                    }
                    .price{
                        width: 20%;
                        border-top-right-radius: 20px;
                        border-bottom-right-radius: 20px;
                        color: $red;
                        border-left: 3px solid rgba($color: #000000, $alpha: 0.02);

                    }

                    &:hover{
                        background-color:  #F7F5E8;
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                        scale: 1.01;
                    }
                }
            }

            &:hover{
                background-color:  #F7F5E8;

            }

            &:hover>.cart{
                height: auto ;
                overflow: visible;
            
            }
            
            &:hover>.icon-box>i{
                    border-top-left-radius : 10px;
                    border-top-right-radius : 10px;
                    background-color:  #F7F5E8;
                    color: $red;
                    scale: 1.05;
            }
        }
        


    }
}

@media screen and (max-width: 1024px){
    .container{
        .buttons{
            display: flex;
            justify-content: center;
            align-items: center;

        }

    }
    
}

// MOBILE
@media screen and (max-width:  576px){
    .container{

        .buttons{

            .cart-box{
                .icon-box{
                    .icon{
                        display: none;
                    }
                    .mobile-button{
                        display: block;
                    }
                }

                .cart{
                    display: none
                }
            }

        }
    }
}


</style>