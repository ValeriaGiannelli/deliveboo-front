
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
                    <li> 
                        <RouterLink :to="{name: 'about'}" class="buy-button" >Chi siamo</RouterLink>
                    </li>
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
            <div class="payments">
                
                <img src="https://www.justeat.it/CmsAssets/media/Images/Common/Footer/Verified-Card-Provider-Images/je-payment-logos-visa.svg?bid=2df7c2453404461ebef56573640edeb1" alt="">
                <img src="https://www.justeat.it/CmsAssets/media/Images/Common/Footer/Verified-Card-Provider-Images/paypal.svg?bid=43072f3b76c1416fb8d9261f53961f3c" alt="">
                <img src="https://www.justeat.it/CmsAssets/media/Images/Common/Footer/Verified-Card-Provider-Images/je-payment-logos-mastercard.svg?bid=67e82ee2da254d178c3e7635b5000aef" alt="">
            
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
    @include no-select;
    background-color: $background_color;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 30px;
    align-items: center;
    padding-top: 150px;
    .box-container{
        width: 60%;
        justify-content: center;

        display: flex;
        gap: 30px;

        .box{
            background-color: $yellow;
            width: calc(100% / 4 - 20px);
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
        min-height: 50px;
        width: 60%;
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .socials{
            width: 30%;
            a>i{
                color: $yellow;
            font-size: 30px;
            padding-right: 20px;

            }
        }

        .payments{
            width: 40%;
            display: flex;
            height: 50px;
            justify-content: center;
            align-items: center;
            gap: 10px;
            img{
                max-height: 50%;
            }
        }
        
        .copyright{
            text-align: right;
            width: 30%;
            span{
            color: $yellow;
            }
        }
    }
}

// TABLET
@media screen and (max-width: 1024px){
    .container{
        .box-container{
            width: 90%;
            flex-wrap: wrap;
            .box{
                width: calc(100% / 2 - 20px);
            }
        }
        .box-social{
            padding: 0 10px;
            width: 90%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}

// MOBILE
@media screen and (max-width:  576px){
    .container{
        .box-container{
            width: 100%;
            .box{
                width: calc(100% - 20px);
            }
        }
        .box-social{
            width: 100%;
            flex-direction: column;

            .socials,
            .payments,
            .copyright{
                text-align: center;
                width: 100%;
                margin-top: 20px;
            }
        }
    }
}

</style>
