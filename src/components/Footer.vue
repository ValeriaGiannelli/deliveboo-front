
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
                <ul>
                    <li><h4>Scopri Deliveboo</h4></li>
                    <li>Investitori</li>
                    <li>Chi siamo</li>
                    <li>Ristoranti</li>
                    <li>Altro</li>
                    <li>Pressroom</li>
                    <li>Programmazione</li>
                    <li>Design</li>
                    <li>Lavora con noi</li>
                    <li>Diventa nostro partner</li>
                </ul>
            </div>
            <div class="box">
                <ul>
                    <li><h4>Scopri Deliveboo</h4></li>
                    <li>Investitori</li>
                    <li>Chi siamo</li>
                    <li>Ristoranti</li>
                    <li>Altro</li>
                    <li>Pressroom</li>
                    <li>Programmazione</li>
                    <li>Design</li>
                    <li>Lavora con noi</li>
                    <li>Diventa nostro partner</li>
                </ul>
            </div>
            <div class="box">
                <ul>
                    <li><h4>Scopri Deliveboo</h4></li>
                    <li>Investitori</li>
                    <li>Chi siamo</li>
                    <li>Ristoranti</li>
                    <li>Altro</li>
                    <li>Pressroom</li>
                    <li>Programmazione</li>
                    <li>Design</li>
                    <li>Lavora con noi</li>
                    <li>Diventa nostro partner</li>
                </ul>
            </div>
            <div class="box">
                <ul>
                    <li><h4>Sviluppato da</h4></li>
                    <li>Valeria Giannelli</li>
                    <li>Samuele Cozzubbo</li>
                    <li>Elona Hoxhaj</li>
                    <li>Michele Lafronza</li>
                    <li>Francesco Cuboni</li>
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
