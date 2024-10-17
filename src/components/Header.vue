
<script>
export default{
    name: 'Header',
    components : {
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
   <div class="container">
        <div class="logo"><img src="../../public/FULL_LOGO.svg" alt=""></div>
        <i class="fa-solid fa-cart-shopping icona" title="Carrello"></i>
    </div>
   
</template>

<style lang="scss" scoped>
@use '../styles/general.scss' as *;
@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;

.container{
    background-color: $background_color;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo{
        width: 200px;
            img{
                width: 100%;
            }
         
    }

    .icona{
        font-size: 20px;
        padding: 1rem;
        color: $red;  
    }
}


</style>
