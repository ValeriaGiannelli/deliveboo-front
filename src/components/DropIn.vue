<template>
    <div>
      <div id="dropin-container"></div> <!-- Container del widget Braintree -->
      <button @click="submitPayment">Paga</button>
    </div>
  </template>
  
  <script>
  import dropin from 'braintree-web-drop-in';
  
  export default {
    data() {
      return {
        instance: null,
        paid : false
      };
    },
    mounted() {
      this.initializeBraintree();
    },
    methods: {
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
          }
  
          // Invia il `payload.nonce` al server per processare il pagamento
          fetch("http://127.0.0.1:8000/api/orders/make/payment", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              paymentMethodNonce: payload.nonce,
              amount : '15.00',
            }),
          })
            .then(response => response.json())
            .then(data => {
              console.log("Risultato del pagamento:", data);
                this.paid = true;
                console.log('paid', this.paid);
                

                // se paid è true
                if(this.paid){
                    fetch("http://127.0.0.1:8000/api/order/create", {
                        method: 'POST',
                        headers: {
                            'Content-Type' : 'application/json',
                        },
                        body: JSON.stringify({
                            "full_name": "Pino dei Pini",
                            "email": "pino@deipini.com",
                            "address": "via dei pini 11",
                            "total_price": "11.50",
                            "phone_number": "3440032234",
                        }),
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log("Ordine andato a buon fine", data);
                    })
                    .catch(error => {
                        console.error("Errore durante la registrazione dell'ordine", error);
                        
                    })
                }

            })
            .catch(error => {
              console.error("Errore durante la transazione:", error);
              this.paid = false;
            });

            
        });
      },
    },
  };
  </script>
  