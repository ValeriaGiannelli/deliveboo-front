<script>
  import dropin from 'braintree-web-drop-in';
  import axios from 'axios';
  import Loader from './partials/loader.vue';
  
  export default {
    name: 'DropIn',
    components:{
      Loader,
    },
    data() {
      return {
        loading: false,
        instance: null,
        paid : false,
        full_name : '',
        email : '',
        address : '',
        phone_number : '',
        total_price : '',
        cart_product : [],
        initialize : false,
        failed : false,
        restaurant_name : '',
        errors : true,
        validName : null,
        validMail : null,
        validAddress : null,
        validNumber : null,
      };
    },
    mounted() {
      this.initializeBraintree();
      this.loadCartFromLocalStorage();
      const id = this.cart_product[0].restaurant_id;
      this.getRestaurantName(id);
    },

    watch: {
      //Watcher per i campi del form
      full_name() {
        this.checkName();
      },

      email() {
        this.checkEmail();
      },

      address(){
        this.checkAddress();
      },

      phone_number(){
        this.checkNumber();
      },
      
    },

    methods: {
      /**********************************************************/
      // VALIDAZIONI PER IL FORM
      /**********************************************************/
      // funzione che controlla tutti i check del form
      checkAllForm(){
        const isNameValid = this.validName;
        const isEmailValid = this.validMail;
        const isAddressValid = this.validAddress;
        const isNumberValid = this.validNumber;

        this.errors = !(isNameValid && isEmailValid && isAddressValid && isNumberValid);
        if(this.errors){
            alert('Compila il form');
          } else {
            this.submitPayment();
        }
      },

      checkName(){
        this.validName = false;
        if(this.full_name.length > 1){
          this.validName = true;
          return true;
        }

        return false;
      },

      checkEmail(){
        this.validMail = false;
        const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        this.email = this.email.toLowerCase();
        
        if (this.email && emailPattern.test(this.email)) {
            this.validMail = true;
            return true;
        }

        return false;
      },

      checkAddress(){
        this.validAddress = false;
        if(this.address.length > 3){
          this.validAddress = true;
          return true;
        }

        return false;
      },

      checkNumber(){
        this.validNumber = false;
    
        // Regex per controllare che il numero contenga solo cifre
        const numberPattern = /^[0-9]+$/;
        
        if (this.phone_number && numberPattern.test(this.phone_number) && this.phone_number.length <= 15) {
            this.validNumber = true;
            return true;
        }
        
        return false;
      },


      /**********************************************************/
      // FUNZIONI PER LOCAL STORAGE - BRAINTREE
      /**********************************************************/
          loadCartFromLocalStorage() {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                const cartData = JSON.parse(savedCart);
                this.cart_product = cartData.cartproduct || [];
                this.total_price = cartData.totalPrice || 0;

                

                //console.log('info prodotti', this.cart_product);
                //console.log('totale prezzo', this.total_price);
            }
          },
          sendForm(){
                let products = 'Riepilogo prodotti: ' + this.cart_product.map(product => {
                  return `Nome: ${product.name}, prezzo: ${product.price}, quantità: ${product.quantity}`;
                }).join("; ") + ".";
                //console.log('test array stringa', products);
            const data = {
                name: this.full_name,
                email: this.email,
                cart: this.cart_product,
                message: products,
            }

            //chiamo con axios api store
            axios.post('http://127.0.0.1:8000/api/send-email', data)
                .then(res=>{
                  //console.log(res.data);
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

          // prende nome del ristorante
          getRestaurantName(id){
            axios.get('http://127.0.0.1:8000/api/restaurant/' + id + '/name')
            .then(res=>{
              //console.log('IL NOME DEL RISTORANTE E',res.data.restaurant[0].restaurant_name);
              this.restaurant_name = res.data.restaurant[0].restaurant_name;

            })
            .catch( er =>{
              console.log(er); 
            })
          },

          // finestra del metodo di pagamento
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

          // funzione per far partire il pagamento
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
                this.loading = true;
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
                      this.loading = false;
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
                    this.loading = false;
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


<template>

  <div class="container-payment" v-if="cart_product.length > 0 && !paid && !initialize">


    <div v-show="!paid" class="container-text">

      <div class="info">
        <h2>Il totale del tuo ordine ammonta a: </h2> 
        <h1>{{ (total_price).toFixed(2) }}€</h1>
        <h3>Il tuo ordine da <h2>"{{ restaurant_name }}"</h2></h3>
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

        <!-- Nome e cognome -->
        <div class="form-item">
          <label for="full_name"></label>
          <input type="text" name="full_name" id="full_name" v-model="full_name" required placeholder="Nome e Cognome (*)">
          <small style="color:red" v-if="!this.validName && this.validName != null">Il nome è obbligatorio e deve avere almeno 2 caratteri</small>
        </div>

        <!-- Mail -->
        <div class="form-item">
          <label for="email"></label>
          <input type="email" name="email" id="email" v-model="email" required placeholder="Email (*)">
          <small style="color:red" v-if="!this.validMail && this.validMail != null">Inserisci un indirizzo mail valido</small>
        </div>

        <!-- indirizzo -->
        <div class="form-item">
          <label for="address"></label>
          <input type="text" name="address" id="address" v-model="address" required placeholder="Indirizzo di spedizione (*)">
          <small style="color:red" v-if="!this.validAddress && this.validAddress != null">L'indirizzo deve avere almeno 4 caratteri</small>          
        </div>

        <!-- numero di telefono -->
        <div class="form-item">
          <label for="phone_number"></label>
          <input type="text" name="phone_number" id="phone_number" v-model="phone_number" required placeholder="Numero di telefono (*)">
          <small style="color:red" v-if="!this.validNumber && this.validNumber != null">Inserisci un numero di telefono valido</small>
        </div>
      </div>

    </div>
    <div class="card">
      <div id="dropin-container" v-show="!paid"></div>
    </div>
    <div class="buttons">
      <p v-if="!paid"></p>
      <div v-show="!paid" @click="checkAllForm" >Effettua il pagamento</div>
    </div>

  </div>
  <div class="my-loader" v-else-if="cart_product.length === 0 && !paid && !initialize">
    <h1>Non hai ancora riempito il tuo carrello!</h1>
  </div>

  <div class="container-payment" v-else-if="initialize">
    <div class="my-loader" >
      <Loader />
    </div>
  </div>

  <div v-else-if="!initialize">
    <div class="completed-box" >
      <img src="../../public/text-hamburger.svg" alt="">
      <h1>Grazie per aver ordinato con DeliveBoo!</h1>
    </div>
    
  </div>


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
      h3{
        padding-top: 10px;
        h2{
          color: $red;
        }
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
      .form-item{
        width: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
        input{
          width: 100%;
          font-size: 17px;
          padding: 10px;
          margin: 10px 5px;
          border: 0;
          border-radius: 5px;
          outline: none;
        }
        small{
          width: 100%;
          margin: 10px 5px;
          transform: translate(0, 85%);
          padding: 10px;
          position: absolute;
        }
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
        color: white;
        scale: 1.1;
      }
    }
  }
}


.my-loader,
.completed-box{

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
}


.completed-box{
  position: relative;
  h1{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

@media screen and (max-width: 1024px){
  .container-payment{

    .container-text{
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;


      .info{
        text-align: center;
        width: 100%;

        table{
          margin: 0 auto;
        }
      }

      .form{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-around;
        h4{
          width: 100%;
        }
        .form-item{
          width: 48%;
        }
      }
    }
    .card{
      width: 100%;
    }
  }
}  


// MOBILE
@media screen and (max-width:  576px){
  .container-payment{

    .container-text{
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;


      .info{
        text-align: center;
        width: 100%;

        table{
          margin: 0 auto;
        }
      }

      .form{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-around;
        h4{
          width: 100%;
        }
        .form-item{
          width: 100%;
        }
      }
    }
    .card{
      width: 100%;
    }
    
    .buttons{
      margin-top: 10px;
      margin-left: 30%;
      width: 80%;
      div{
      }
    }
  }
}
</style>
  

  