
<script>
export default{
    name: 'Footer',
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
        <div class="box-container">
            <div class="box">
                <h3>DeliveBoo</h3>
                <p>Il tuo cibo preferito consegnato a casa tua in pochi minuti. Scopri i migliori ristoranti della tua città con DeliveBoo.</p>
            </div>
            <div class="box">
                <h3>Link Utili</h3>
                <ul>
                    <li><a href="#">
                        Chi siamo</a></li>
                    <li><a href="#">
                        Termini e condizioni</a></li>
                    <li><a href="#">
                        Politica sulla privacy</a></li>
                </ul>
            </div>
            <div class="box">
                <h3>Contatti</h3>
                <ul>
                    <li><a href="#">
                        Assistenza</a></li>
                    <li><a href="#">
                        Lavora con noi</a></li>
                    <li><a href="#">
                        Contattaci</a></li>
                </ul>
            </div>
            <div class="box us">
                <h3>Sviluppato da</h3>
                <ul>
                    <li><a href="https://github.com/ValeriaGiannelli">
                        <i class="fa-brands fa-github"></i>
                        Valeria Giannelli</a></li>
                    <li><a href="https://github.com/MicheleLafronza">
                        <i class="fa-brands fa-github"></i>
                        Michele Lafronza</a></li>
                    <li><a href="https://github.com/samuelecozzubbo">
                        <i class="fa-brands fa-github"></i>
                        Samuele Cozzubbo</a></li>
                    <li><a href="https://github.com/ElonaHoxhaj96">
                        <i class="fa-brands fa-github"></i>
                        Elona Hoxhaj</a></li>
                    <li><a href="https://github.com/FraCuboni">
                        <i class="fa-brands fa-github"></i>
                        Francesco Cuboni</a></li>
                </ul>
            </div>
        </div>
        <div class="box-social">
            <div class="socials">
                <a href="#">
                    <i class="fa-brands fa-facebook"></i>
                </a>
                <a href="#">
                    <i class="fa-brands fa-instagram"></i>
                </a>
                <a href="#">
                    <i class="fa-brands fa-x-twitter"></i>
                </a>
            </div>
            <div class="copyright">
                <span>© #128-T2 DeliveBoo</span>
            </div>
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
    justify-content: center;
    flex-direction: column;
    padding: 30px;
    align-items: center;
    padding-top: 150px;
    .box-container{
        width: 100%;
        justify-content: center;

        display: flex;
        gap: 30px;

        .box{
            background-color: $yellow;
            width: calc(60% / 4 - 20px);
            padding: 20px 15px 30px;
            border-radius: 5px;
            flex-grow: 0 1;
            li, p{
                font-weight: 300;
                padding-top: 8px;
            }

        }
    }
    .box-social{
        min-height: 20px;
        width: 60%;
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .socials{
            a>i{
                color: $yellow;
            font-size: 30px;
            padding-right: 20px;

            }
        }
        
        .copyright>span{
            color: $yellow;
        }
    }
}


</style>
