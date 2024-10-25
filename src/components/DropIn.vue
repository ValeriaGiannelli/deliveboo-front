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
                    cart: this.cart_product,
                    message:'Ordine inviato correttamente',
                }

                //chiamo con axios api store
                axios.post('http://127.0.0.1:8000/api/send-email', data)
                    .then(res=>{
                      console.log(res.data);
                      // if(!res.data.success){
                      //       this.errors = res.data.errors;
                      //   }else{
                      //       this.errors = {
                      //           name:[],
                      //           email:[],
                      //           message:[],
                      //       }
                      //   }
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
              this.paid = true;
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


<template>

  <div class="container-payment" v-if="cart_product.length > 0 && !paid && !initialize">
    <div v-show="!paid" class="container-text">

      <div class="info">
        <h2>Il totale del tuo ordine ammonta a: </h2> 
        <h1>{{ (total_price).toFixed(2) }}€</h1>
        <h3>Il tuo ordine da "NOME RISTORANTE":</h3>
        <table>
          
          <tr v-for="product in cart_product">
            <td>{{ product.quantity + 'x' }}</td>
            <td>{{ product.name }}</td>
            <td>{{ (product.price * product.quantity).toFixed(2) }}€</td>
          </tr>

        </table>
      </div>

      <div class="form">
        <h4>Inserisci le informazioni e procedi al pagamento</h4>
        <input type="text" name="full_name" v-model="full_name" placeholder="Inserisci il tuo nome e cognome">
        <input type="email" name="email" v-model="email" placeholder="Inserisci la tua mail">
        <input type="text" name="address" v-model="address" placeholder="Inserisci il tuo indirizzo">
        <input type="text" name="phone_number" v-model="phone_number" placeholder="Inserisci il tuo numero di telefono">
      </div>


    </div>
    <div class="card">
      <div id="dropin-container" v-show="!paid"></div>
    </div>
    <div class="buttons">
      <p v-if="!paid"></p>
      <div v-show="!paid" @click="submitPayment" >Effettua il pagamento</div>
    </div>

  </div>

  <p v-else-if="cart_product.length === 0 && !paid && !initialize">Non hai ancora riempito il tuo carrello!</p>

  <p v-else-if="initialize">Pagamento in corso</p>

  <p v-else-if="!initialize">Pagamento effettuato con successo</p>


</template>
<style lang="scss" scoped>
@use '../styles/general.scss' as *;
@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;
.container-payment{

  margin: 0 auto;

  // flex
  display: flex; 
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  background-color: $yellow;
  width: 80%;
  padding: 30px;

  border-radius: 10px;

  .container-text{
    width: 55%;
    display: flex;
    gap: 20px;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    @include no-select;

    .info{
      margin:0 5px;
      h2{
        display: inline;
      }
      h1{
        display: inline
      }

      table{
        margin-top: 10px;
        text-align: left;

        tr{
          font-weight: 300;
          
          td{
            padding: 0 10px;
            text-align: center;

            &:first-child {
              text-align: left;
            }

            &:last-child {
              text-align: right;
            }
          }

          
        }
      }
    }

    .form{
      h4{
        margin: 10px 5px;
        font-weight: 500;

      }
      input{
        width: calc((100% / 2) - 10px);
        font-size: 17px;
        padding: 10px;
        margin: 10px 5px;
        border: 0;
        border-radius: 5px;
        outline: none;
      }
    }
  }

  .card{
    width: 35%;
    aspect-ratio: 5/2;
  }

  .buttons{
    margin-left: 60%;
    width: 35%;
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 10px;
    @include no-select;

    div{
      padding: 5px 20px;
      border-radius: 10px;
      transition: 500ms;
      border:none;
      color: $red;
      font-weight: 600;
      font-size: 19px;
      background-color: white;

      &:hover{
        background-color: $red;
        color: $text-color ;
        scale: 1.1;
      }
    }



  }

}

</style>
  

  