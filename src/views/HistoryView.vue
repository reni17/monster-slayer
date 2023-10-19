<template>
     <ul class="list-group text-center">
                <li class=list-group-item v-for="(item, indx) in history" :key="indx">
                 {{ item.name ? item.name : 'Unknown'}} - {{ item.result }}
                </li>
            </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePlayersStore } from '@/store/PlayersStore'

const store = usePlayersStore()
const history = computed(() => store.getHistory)



</script>