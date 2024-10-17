<script>
export default{
    name: 'DishCard',
}
</script>

<template>
    <div class="card">
        <h4>
            ciao sono la card
        </h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero consequatur eaque placeat. Suscipit, 
            esse sunt facilis amet quisquam sequi voluptatem illum quia eos in exercitationem nulla. 
            Impedit sequi nesciunt sint?
        </p>
    </div>
</template>

<style lang="scss" scoped>
@use '../../styles/general.scss' as *;
@use '../../styles/partials/variables' as *;
@use '../../styles/partials/mixins' as *;

.card{
    min-width: 250px;
    min-height: 100px;
    background-color: white;
    margin: 1rem;
}

</style>
