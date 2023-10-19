<template>
  <section class="text-center">
    <h2 class="text-white">Battle Log</h2>
    <div class="text-white">
        <TabWrapper :tabs='tabs'/>
      </div>
  
  
    </section>
  </template>
  <script setup lang="ts">
  import TabWrapper from './customComponets/TabWrapper.vue';
  import AllMessages from './TabContent/AllMessages.vue';
  import LastMessages from './TabContent/LastMessages.vue';
  

  const tabs = [
    {name: 'Last Messages', data: LastMessages},
    {name: 'All Messages', data: AllMessages},
]
  

  
  </script>
  <style scoped>

  
  </style>
  