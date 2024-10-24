<script>
import DropIn from '../components/DropIn.vue';


    export default {
        name: 'Checkout',
        components: {
            DropIn
        },
        methods: {
            loadCartFromLocalStorage() {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                const cartData = JSON.parse(savedCart);
                const cartproduct = cartData.cartproduct || [];
                const totalPrice = cartData.totalPrice || 0;

                // console.log('info prodotti', cartproduct);
                // console.log('totale prezzo', totalPrice);

            }
          },
        },
        mounted(){
            this.loadCartFromLocalStorage();
        }
    }

</script>

<template>

    <div>
        <Drop-in />
    </div>

</template>

<style lang="scss" scoped></style>