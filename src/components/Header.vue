<template>
     <section class="header">
        <h2 class="header__title">{{title}} Health</h2>
        <div class="header__value">{{ healthValue }}</div>
        <div class="healthbar">
          <div :style="{ backgroundColor: healthValue<20 ? 'red' : '#00a876', height: '100%', width: healthValue + '%'}"></div>
        </div>
      </section>
</template>
<script setup lang="ts">

const props = defineProps({
    title: {
      type: String,
      required: true
    },
    healthValue: {
      type: Number,
      required: true,
      default: 100
    },
})


</script>

<style scoped>



/* section {
  width: 100%;
  max-width: 50rem;
} */

.healthbar {
  width: 100%;
  height: 30px;
  border: 1px solid #575757;
  margin: 1rem 0;
  background: #fde5e5;
}


.header {
  text-align: center;
  padding: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
}
.header__title{
  color: white;
  letter-spacing: 4px;
}
.header__value {
  color: white;
  font-size: large;
  padding-right: 5px
}

</style>
