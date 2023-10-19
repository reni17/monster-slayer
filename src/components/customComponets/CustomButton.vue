<template>
      <button class="btn btn-info text-white" :type='type'>  
        <slot>{{ title }}</slot>
    </button>
</template>
<script setup lang="ts">
defineProps({
    type: {
        type: String,
        required: true
    },
    title: {
        type: String,
    }
})
</script>
<style scoped>


</style>