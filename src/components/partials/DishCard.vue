<script>
export default {
    name: 'DishCard',
}
</script>

<template>
        <div class="card">
            <img src="../../../public/ristorante.jpg" alt="Spaghetti Carbonara" class="card-image" />
            <div class="card-content">
                <h2 class="card-title">Spaghetti Carbonara</h2>
                <p class="card-description">Deliziosi spaghetti con pancetta, uova e pecorino.</p>
                <span class="card-price">12€</span>
            </div>
        </div>
</template>

<style lang="scss" scoped>
@use '../../styles/general.scss' as *;
@use '../../styles/partials/variables' as *;
@use '../../styles/partials/mixins' as *;


.card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 300px;
    margin: 20px;
    overflow: hidden;

    .card-image {
        width: 100%;
        height: auto;
    }

    .card-content {
        padding: 10px;

        .card-title {
            font-size: 1.5em;
            margin: 10px 0;
        }

        .card-description {
            font-size: 1em;
            margin: 10px 0;
            color: #555;
        }

        .card-price {
            font-size: 1.2em;
            color: #e74c3c;
            margin: 10px 0;
        }
    }
}
</style>