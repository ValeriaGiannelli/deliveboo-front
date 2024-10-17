<script>
export default{
    name: 'Jumbo',
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
        <img class="burger" src="../../public/burgir_svg.png" alt="">

        <!-- animazione -->
         <img class="slider" src="../../public/slider_deliveboo.svg" alt="">
         <img class="slider" src="../../public/slider_deliveboo.svg" alt="">
         <img class="slider" src="../../public/slider_deliveboo.svg" alt="">
    </div>
</template>

<style lang="scss" scoped>
@use '../styles/general.scss' as *;
@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;

.container{
    background-color: $yellow;
    min-height: 100px;
    position: relative;

    display: flex;
    justify-content: center;

    img.burger{
        padding: 30px 0;
        z-index: 2;
    }
    img.slider{
        position: absolute;
        animation: slide 7s linear infinite;
        color: white;

        @keyframes slide {
            0% {
                transform: translateX(200%);
            }
            50% {
                transform: translateX(0);
            }
            100% {
                transform: translateX(-200%);
            }
        }
    }
}

</style>
