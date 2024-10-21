
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
        <div class="logo"><a href="/"><img src="../../public/FULL_LOGO.svg" alt=""></a></div>
        <div class="buttons">    
            <a href="http://127.0.0.1:8000/">Collabora con noi</a>
            <a href=""><i class="fa-solid fa-cart-shopping icon" title="Carrello"></i></a>
        </div>
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
    padding: 10px 20px;
    .logo{
        width: 200px;
    }

    .buttons{

        a{
            font-weight: 600;
            color: $yellow;
            padding-right: 10px;
            transition: 500ms;
            &:hover{
                font-weight: 700;
                color: $red;
            }
        }
        a>.icon{
            font-size: 20px;
            padding: 1rem;
            color: $yellow; 
            transition: 500ms;
                &:hover{
                    color: $red;
                    scale: 1.1;
                }
        }

    }
}


</style>
