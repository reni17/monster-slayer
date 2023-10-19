<template>
    <div class="mt-2"> 
        <div class="d-flex flex-row justify-content-center ">
    <!-- <base-tab> -->
      <div class="" v-for="tab in tabs" :key="tab.name">
        <custom-button class="mb-4"
          @click="setSelectedTab(tab.data)"
          type="button"
          :title="tab.name"
        ></custom-button>
      </div>
    <!-- </base-tab> -->
    </div>
    <keep-alive>
      <component :is="selectedTab"></component>
    </keep-alive>
    </div>
  
</template>
<script setup lang="ts">
import { shallowRef } from 'vue'
import CustomButton from './CustomButton.vue'
import BaseTab from './BaseTab.vue'

const props = defineProps({
  tabs: {
    type: Object
  }
})
const firstTab = Object.values(props.tabs)[0]

const selectedTab = shallowRef(firstTab.data)

const setSelectedTab = (value) => {
  selectedTab.value = value
}
</script>
<style scoped>
.tabs {
  max-width: 400px;
  margin: 0 auto;
}

.tabs__header {
  margin-bottom: 10px;
  list-style: none;
  padding: 0;
  display: flex;

}

.tabs__header li {
  width: 80px;
  text-align: center;
  padding: 10px 20px;
  margin-right: 10px;
  background-color: #ddd;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.4s all ease-out;
}

.tabs__header li.selected {
  background-color: blue;
  color: white;
}
</style>
