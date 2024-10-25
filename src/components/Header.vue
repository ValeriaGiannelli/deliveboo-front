<script>
import CartDishCard from './partials/CartDishCard.vue';
export default {
    name: 'Header',
    components:{
        CartDishCard,
    },
    data(){
        return{

        }
    },
    methods: {
        goBack() {
            window.history.back(); // Torna alla pagina precedente
        }
    }
}
</script>

<template>
    <div class="container">
         <div class="logo">
             <a href="#" @click.prevent="goBack"><img src="../../public/FULL_LOGO.svg" alt=""></a>
         </div>
         <div class="buttons">    
            <a href="http://127.0.0.1:8000/">Collabora con noi</a>
            <div class="cart-box">
                <div class="icon-box">
                    <i class="fa-solid fa-cart-shopping icon"></i>
                    <div class="item-amount-dot">
                        <p>3</p>
                    </div>
                </div>
                <div class="cart">

                    <!-- elementi all'interno del carrello -->
                    <div class="cart-item">
                        <div class="amount">1x</div>
                        <div class="name">Pasta x con cose x e pomodori x con cose y e olio x evo prodotto da x</div>
                        <div class="price">12.00€</div>
                    </div>
                    <div class="cart-item">
                        <div class="amount">1x</div>
                        <div class="name">mario mario mario </div>
                        <div class="price">12.00€</div>
                    </div>
                    <div class="cart-item">
                        <div class="amount">1x</div>
                        <div class="name">mario mario mario mario mario mario mario mario mario mario mario mario</div>
                        <div class="price">12.00€</div>
                    </div>


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
                .icon{
                font-size: 20px;
                padding: 1rem;
                color: $yellow; 
                transition: 500ms;
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
}


</style>
