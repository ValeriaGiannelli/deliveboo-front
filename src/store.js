import { reactive, watch } from 'vue';

function loadCartFromLocalStorage() {
    const cartData = localStorage.getItem('HEcart');
    if (!cartData || cartData === "undefined") {
        return []; // Ritorna un array vuoto se cartData è null o "undefined"
    }

    try {
        return JSON.parse(cartData);
    } catch (error) {
        console.error("Errore nel parsing dei dati del carrello:", error);
        return []; // Ritorna un array vuoto se il JSON è invalido
    }
}


export const store = reactive({
    apiURL: 'http://127.0.0.1:8000/api/',
    isCartOpen: false,
    Hcart: loadCartFromLocalStorage(), // Carica il carrello usando la funzione di controllo

    /* addToCart(product) {
        this.Hcart.push(product);
        this.saveCart();
    },

    removeFromCart(productId) {
        this.Hcart = this.Hcart.filter(item => item.id !== productId);
        this.saveCart();
    },*/

    clearCart() {
        this.Hcart = [];
        this.saveCart();
    },

    saveCart() {
        localStorage.setItem('HEcart', JSON.stringify(this.Hcart));
    }
});

// Usa un watcher per monitorare le modifiche e salvare automaticamente
watch(
    () => store.Hcart,
    () => store.saveCart(),
    { deep: true }
);
