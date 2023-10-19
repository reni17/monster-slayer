<template>
  <div v-if="statusMessages?.length">
    <ul v-for="message in statusMessages.slice(-3)" :key="message">
      <li class="battle-log__item">{{ message }}</li>
    </ul>
  </div>
  <div v-else>No messages yet</div>
</template>

<script setup lang="ts">
import {  inject } from 'vue'

const statusMessages = inject('messages')

</script>
<style scoped>

@keyframes moveInLeft {
    0% {
      opacity: 0;
      transform: translateX(-10rem);
    }
    80% {
      transform: translate(1rem);
    }
    100% {
      opacity: 1;
      transform: translate(0);
    }
  }

  .battle-log__item {
    display: block;
    font-size: 1rem;
    font-weight: 20;
    color: white;
    animation-name: moveInLeft;
    animation-duration: 1s;
    animation-timing-function: ease-out;
  }
  
</style>