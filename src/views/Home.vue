<script>
import Jumbo from '../components/Jumbo.vue';
import DishCard from '../components/partials/DishCard.vue'
export default{
    name: 'Home',
    components : {
        Jumbo,
        DishCard,
    },
    data(){
        return{

        }
    },
    methods:{

    }
}
</script>

<template>
    <Jumbo/>
    <div class="container-card">
        <div class="bottoni">
            <button>Italiano</button>
            <button>Cinese</button>
            <button>Japponese</button>
            <button>Indiano</button>
        </div>
        <DishCard/>
    </div>

</template>

<style lang="scss" scoped>
@use '../styles/general.scss' as *;
@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;

.container-card{
    margin: 1rem auto;
    width: 80%;
    background-color: $yellow;
   
}
.bottoni{
    padding: 1rem;
    display: flex;
    justify-content: space-around;
        button{
        min-width: 100px;
        min-height: 30px;
        color: white ;
        background-color: #f0a8a2;
        border-radius: 5%;
        border: none;
            &:hover{
                background-color:$red; 
            }
    }
}


</style>
