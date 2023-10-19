<script setup lang="ts">
import Header from '../components/Header.vue'
import ControlButtons from '../components/ControlButtons.vue'
import BattleLog from '../components/BattleLog.vue'

import { usePlayersStore } from '@/store/PlayersStore'

import { computed, provide, ref } from 'vue'

const currentPlayerPower = ref(100)
const currentMonsterPower = ref(100)
const statusMessages = ref<string[]>([])
const monsterFire = ref(false)

provide('messages', statusMessages)



const store = usePlayersStore()
const userName = computed(() => store.getUserName)



const attack = (event) => {
  currentPlayerPower.value = event[0]
  currentMonsterPower.value = event[1]
  monsterFire.value  = event[2]
  setTimeout(() => monsterFire.value = !monsterFire.value, 1000)
}

const specialAttack = (event) => {
  currentMonsterPower.value = event
}

const heal = (event) => {
  currentPlayerPower.value = event
}

const restart = (player, monster) => {
  currentPlayerPower.value = player
  currentMonsterPower.value = monster
  statusMessages.value = []
}

</script>

<template>
  <main class="">
    <div class="container h-100">
      <div class="row">
        <div class="col">
          <Header title="Monster" :health-value="currentMonsterPower"></Header>
        </div>
        <div class="col">
          <Header :title="userName ? userName : 'Your'" :health-value="currentPlayerPower"></Header>
        </div>
      </div>
      
      <div class="row">
        
          <div class="col" style="height: 320px;">
            <battle-log :messages="statusMessages" />
        </div>
          
        
      </div>

      <div class="row">
        <div class="col">
          <control-buttons
            @handleAttack="attack"
            @handleSpecialAttack="specialAttack"
            @handleHeal="heal"
            @handleRestart="restart"
            :messages="statusMessages"
          />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col text-center">
        <img
          src="https://www.freepnglogos.com/uploads/halo-png/halo-4-png-5.png"
          style="width: 270px; height: auto"
          alt="Responsive image"
        />
        <img v-show="monsterFire" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Mario_Fireball.png/1152px-Mario_Fireball.png?20230214200341"
          style="width: 40px; height: auto" class="monster_fireball rounded float-left" alt="fireball">
      </div>
      <div class="col text-center">
        <img v-show="monsterFire" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Mario_Fireball.png/1152px-Mario_Fireball.png?20230214200341"
          style="width: 40px; height: auto -webkit-transform: scaleX(-1); transform: scaleX(-1)" class="player_fireball rounded float-left" alt="fireball">
        <img
          :src="store.getHero"
          style="width: 300px; height: auto; -webkit-transform: scaleX(-1); transform: scaleX(-1)"
          alt="Responsive image"
        />
      </div>
    </div>
  </main>
</template>
<style scoped>
.header {
  display: flex;
  align-content: center;
}


@keyframes moveInLeft {
    0% {
      opacity: 1;
      transform: translateX(0);
    }
    100% {
      opacity: 0.3;
      transform: translate(500px);
    }
  }

  @keyframes moveRight {
    0% {
      opacity: 1;
      transform: translateX(200px);
    }
    100% {
      opacity: 0.3;
      transform: translate(-400px);
    }
  }

  .monster_fireball{
    /* position: absolute; */
    
    /* background-size: cover; */
    animation-name: moveInLeft;
    animation-duration: 1s;
    animation-timing-function: ease-out;

}

.player_fireball{
    /* position: absolute; */
    
    /* background-size: cover; */
    animation-name: moveRight;
    animation-duration: 1s;
    animation-timing-function: ease-out;

}
</style>
