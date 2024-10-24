<script>
export default{
    name: 'Loading',
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

        <div>
            <h1 class="loading-text">Caricamento<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></h1>
            <img src="../../public/LOGO.svg" alt="">
        </div>

    </div>
</template>

<style lang="scss" scoped>
@use '../styles/general.scss' as *;
@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;

.container{
    height: 100vh;
    width: 100%;
    background-color: $background_color;

    // flex
    display: flex;
    justify-content: center;
    align-items: center;

    div{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 50px;
        h1{
            font-size: 50px;
            color: $yellow;
            display: inline;
            .dot{
                color: $yellow;
                opacity: 0;
                animation: dot-blink 1.5s infinite;

                &:nth-child(1){
                    animation-delay: 0ms;
                }
                &:nth-child(2){
                    animation-delay: 500ms;
                }
                &:nth-child(3){
                    animation-delay: 1000ms;
                }
            }

            @keyframes dot-blink {
            0% { opacity: 0; }
            33% { opacity: 1; }
            66% { opacity: 1; }
            100% { opacity: 0; }
}

        }
        img{
            animation: spin 3s linear infinite;
        }

    }

    @keyframes spin {
    0% {
        transform: rotate(0deg);
        }
    100% {
        transform: rotate(360deg);
        }
    }
}
</style>
