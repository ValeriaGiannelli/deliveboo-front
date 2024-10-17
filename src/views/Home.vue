<script>
import Jumbo from '../components/Jumbo.vue';
import RestaurantCard from '../components/partials/RestaurantCard.vue';
export default{
    name: 'Home',
    components : {
        Jumbo,
        RestaurantCard,
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
            <button>Giapponese</button>
            <button>Indiano</button>
            <button>Kebab</button>
        </div>
        <RestaurantCard/>
  
    </div>

</template>

<style lang="scss" scoped>
@use '../styles/general.scss' as *;
@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;

.container-card{
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    
   
    .bottoni{
        padding: 1rem;
        display: flex;
        width: 50%;
        justify-content: space-between;

        button{
            font-size: 20px;
            padding: 7px 16px;
            color: $background_color;
            background-color: $yellow;
            border: none;
            border-radius: 15px;
            transition: 500ms;

                &:hover{
                    background-color:$red;
                    scale: 1.05;
                }
            }
    }
}



</style>
