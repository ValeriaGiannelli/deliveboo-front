<template>
    <h4 v-show="failed">Errore durante la transazione, riprova</h4>
    <div v-if="cart_product.length > 0 && !paid && !initialize">
      <div v-show="!paid" class="container">
        <h2>Il totale del tuo ordine ammonta a {{ total_price }}&euro;</h2>

        <h3>Inserisci le informazioni e procedi al pagamento</h3>

        
        <input type="text" name="full_name" v-model="full_name" placeholder="Inserisci il tuo nome e cognome">
        <input type="email" name="email" v-model="email" placeholder="Inserisci la tua mail">
        <input type="text" name="address" v-model="address" placeholder="Inserisci il tuo indirizzo">
        <input type="text" name="phone_number" v-model="phone_number" placeholder="Inserisci il tuo numero di telefono">
      </div>

      <div id="dropin-container" v-show="!paid"></div>
      <p v-if="!paid">Effettua il pagamento</p>
      <button v-show="!paid" @click="submitPayment" >Paga</button>
    </div>

    <p v-else-if="cart_product.length === 0 && !paid && !initialize">Non hai ancora riempito il tuo carrello!</p>

    <p v-else-if="initialize">Pagamento in corso</p>

    <p v-else-if="!initialize">Pagamento effettuato con successo</p>

    
  </template>
  
  <script>
  import dropin from 'braintree-web-drop-in';
  import axios from 'axios';
  
  export default {
    data() {
      return {
        instance: null,
        paid : false,
        full_name : '',
        email : '',
        address : '',
        phone_number : '',
        total_price : '',
        cart_product : [],
        initialize : false,
        failed : false
      };
    },
    mounted() {
      this.initializeBraintree();
      this.loadCartFromLocalStorage();
    },
    methods: {
      loadCartFromLocalStorage() {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                const cartData = JSON.parse(savedCart);
                this.cart_product = cartData.cartproduct || [];
                this.total_price = cartData.totalPrice || 0;

                

                console.log('info prodotti', this.cart_product);
                console.log('totale prezzo', this.total_price);
            }
          },
          sendForm(){
                const data = {
                    name: this.full_name,
                    email: this.email,
                    message:'Ordine inviato correttamente',
                }

                //chiamo con axios api store
                axios.post('http://127.0.0.1:8000/api/send-email', data)
                    .then(res=>{
                      //console.log(res.data);
                      if(!res.data.success){
                            this.errors = res.data.errors;
                        }else{
                            this.errors = {
                                name:[],
                                email:[],
                                message:[],
                            }
                        }
                    })
                    .catch( er => {
                      console.log(er.message);
                      this.sent = false;
                      
                    })
              
            },
        async initializeBraintree() {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/orders/generate"); // Cambia con l'URL corretto del tuo backend
    const data = await response.json(); // Decodifica la risposta JSON
    const clientToken = data.token; // Accedi al token corretto
    // console.log("Client Token:", clientToken); // Verifica che sia la stringa corretta

    dropin.create({
            authorization: clientToken, // Usa solo la stringa del token
            container: '#dropin-container',
        }, (err, instance) => {
        if (err) {
        console.error("Errore nella creazione del Drop-in:", err);
        return;
        }
        this.instance = instance;
            });
        } catch (error) {
    console.error("Errore nell'inizializzazione di Braintree:", error);
    }
    },
      submitPayment() {
        if (!this.instance) {
          console.error("Il widget di Braintree non è stato inizializzato.");
          return;
        }
  
        this.instance.requestPaymentMethod((err, payload) => {
          if (err) {
            console.error("Errore nella richiesta del metodo di pagamento:", err);
            return;
          } else {
            this.initialize = true;
            // Invia il `payload.nonce` al server per processare il pagamento
            fetch("http://127.0.0.1:8000/api/orders/make/payment", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                paymentMethodNonce: payload.nonce,
                amount : this.total_price,
              }),
            })
            .then(response => response.json())
            .then(data => {
              console.log("Risultato del pagamento:", data);
              if(data.success){
                this.paid = true;
                this.failed = false;
              }
              console.log('paid', this.paid);
                

              // se paid è true
              if(this.paid){
                this.sendForm();
                fetch("http://127.0.0.1:8000/api/order/create", {
                  method: 'POST',
                  headers: {
                    'Content-Type' : 'application/json',
                  },
                  body: JSON.stringify({
                    "full_name": this.full_name,
                    "email": this.email,
                    "address": this.address,
                    "total_price": this.total_price,
                    "phone_number": this.phone_number,
                    "products" : this.cart_product
                  }),
                })
                .then(response => response.json())
                .then(data => {
                  console.log("Ordine andato a buon fine", data);
                  localStorage.clear();
                  this.cart_product = [];
                  console.log(this.cart_product);
                  this.initialize = false;
                  
                })
                .catch(error => {
                  console.error("Errore durante la registrazione dell'ordine", error);
                        
                })
                //******************************************************* */
                //Invio dati per la mail
                /* fetch("http://127.0.0.1:8000/api/send-email",{
                  method: 'POST',
                  headers: {
                    'Content-Type' : 'application/json',
                  },
                  body: JSON.stringify({
                    "name": this.full_name,
                    "email": this.email,
                    "message": "Il tuo ordine è stato ricevuto",
                  }),
                }) */
                /* .then(response => response.json())
                .then(data => {
                  console.log("Mail inviata", data);
                })
                .catch(error => {
                  console.error("Errore durante invio mail", error);
                }) */

              // PAID FALSE 
              } else {
                this.failed = true;
                this.initialize = false;
              }

            })
            .catch(error => {
              console.error("Errore durante la transazione:", error);
              this.paid = false;
            });

          }
        });
      },
    },
  };
  </script>
  