<template>
    <!-- <div class="tab-content" v-show="title==selectedTitle"> -->
        <div class="">
        <slot/>
    </div>
</template>
<script setup lang="ts">

</script>
<style scoped>

.tab-content {
    min-height: 300px;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 3px 5px 5px rgba(0, 0, 0, 0.05);
}

</style>