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
         <img class="slider s1" src="../../public/slider_deliveboo.svg" alt="">
         <img class="slider s3" src="../../public/slider_deliveboo.svg" alt="">
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
    overflow: hidden;

    display: flex;
    justify-content: center;
    @include no-select;

    img.burger{
        padding: 30px 0;
        z-index: 2;
    }
    img.slider.s1{
        position: absolute;
        transform: translate(-50%, -50%);
        top: 10%;
        animation: slide 15s linear infinite;
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
    img.slider.s3{
        position: absolute;
        transform: translate(-50%, -50%);
        bottom: 10%;
        animation: slideback 15s linear infinite;
        color: white;

        @keyframes slideback {
            0% {
                transform: translateX(-200%);
            }
            50% {
                transform: translateX(0);
            }
            100% {
                transform: translateX(200%);
            }
        }
    }
}

</style>
