<script>
import axios from 'axios';
import { store } from '../store';
import DishCard from '../components/partials/DishCard.vue';
import CartDishCard from '../components/partials/CartDishCard.vue';
import DropIn from '../components/DropIn.vue';
import { RouterLink } from 'vue-router';
import Loader from '../components/partials/loader.vue';

export default {
    name: 'About',
    // components: {
    //     DishCard,
    //     CartDishCard,
    //     DropIn,
    //     Loader,
    // },
    data() {
        return {
            teamMembers: [
                {
                    name: "Elona",
                    alias: "Vigilante del web",
                    description: "Elona, conosciuta come 'Vigilante del web', ha un talento straordinario nel navigare tra le pagine web, scovando difetti di layout e problemi di funzionalità come un falco. La sua attenzione ai dettagli rende ogni sito impeccabile."
                },
                {
                    name: "Francesco",
                    alias: "Speedster",
                    description: "Francesco, conosciuto come 'Speedster', è famoso per la sua incredibile velocità nella realizzazione di componenti. Con il suo motto 'raga è facile, lo faccio in un secondo', trasforma idee in realtà in un batter d'occhio."
                },
                {
                    name: "Michele",
                    alias: "Tech Scout",
                    description: "Michele, noto come 'Tech Scout', è sempre il primo a mettersi in gioco per esplorare e implementare le ultime tecnologie. Con la sua curiosità insaziabile, guida il team verso innovazioni all'avanguardia, anticipando le tendenze del settore e trasformandole in opportunità concrete."
                },
                {
                    name: "Samuele",
                    alias: "Validator",
                    description: "Samuele, soprannominato 'Validator', possiede un occhio infallibile per la validazione dei form. Nessun errore passa inosservato, garantendo che ogni input sia corretto e sicuro; la sua precisione è essenziale per mantenere la qualità e l’affidabilità dei nostri progetti."
                },
                {
                    name: "Valeria",
                    alias: "Error Hunter",
                    description: "Valeria, soprannominata 'Error Hunter', è un’abile cacciatrice di errori di battitura e bug nel codice. La sua capacità non solo di scovare il più piccolo refuso, ma anche di individuare rapidamente i punti critici dove intervenire per il debug, la rende un elemento fondamentale per la qualità del progetto."
                }

            ]
        };
    },

}
</script>

<template>
    <!-- introduzione -->
    <div class="team-intro">
        <h1>Il nostro team di sviluppo</h1>
        <p>
            Il nostro team è composto da professionisti con abilità uniche, ciascuno specializzato in un'area chiave dello sviluppo: dalla ricerca e innovazione tecnologica, alla precisione nei dettagli e alla velocità di esecuzione. Grazie alla nostra esperienza e passione, garantiamo qualità, efficienza e soluzioni all'avanguardia in ogni progetto.
        </p>
    </div>

    <!-- presentazione membri -->
    <div class="card-container">
        <div class="team-member" v-for="(member, i) in teamMembers" :key="i" >
            <h2>{{ member.name }} - {{ member.alias }}</h2>
            <p>{{ member.description }}</p>
        </div>

    </div>
        
</template>

<style lang="scss" scoped>
@use '../styles/general.scss' as *;
@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;

.team-intro {
  text-align: center;
  margin-bottom: 20px;
  padding: 20px;
}

.team-intro h1 {
  font-size: 2em;
  color: #333;
  margin-bottom: 10px;
}

.team-intro p {
  font-size: 1.1em;
  color: #555;
  line-height: 1.6;
  max-width: 800px; /* Limite massimo di larghezza per una buona leggibilità */
  margin: 0 auto; /* Centratura del paragrafo */
}

.card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 20px;
  .team-member {
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 80%; /* Imposta la larghezza della card */
    max-width: 800px; /* Limite massimo di larghezza */
    padding: 20px;
    transition: transform 0.2s ease-in-out;
    text-align: left; /* Testo allineato a sinistra */
  }
  
  .team-member:hover {
    transform: translateY(-5px); /* Leggero sollevamento al passaggio del mouse */
  }
  
  .team-member h2 {
    font-size: 1.4em;
    color: #333;
    margin-bottom: 10px;
  }
  
  .team-member p {
    font-size: 1em;
    color: #666;
    line-height: 1.6;
  }
}


</style>