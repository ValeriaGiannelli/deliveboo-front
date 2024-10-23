<template>
    <div>
      <div id="dropin-container"></div> <!-- Container del widget Braintree -->
      <button @click="submitPayment">Paga</button> Bottone per pagare
    </div>
  </template>
  
  <script>
  import dropin from 'braintree-web-drop-in';
  
  export default {
    data() {
      return {
        instance: null,
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
    console.log("Client Token:", clientToken); // Verifica che sia la stringa corretta

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
              amount : '10.00',
            }),
          })
            .then(response => response.json())
            .then(data => {
              console.log("Risultato del pagamento:", data);
            })
            .catch(error => {
              console.error("Errore durante la transazione:", error);
            });
        });
      },
    },
  };
  </script>
  