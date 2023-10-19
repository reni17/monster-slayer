<template>
  <section class="mb-5" id="controls">
    
    
    <h2 v-if="resultMessage" class="result">{{ resultMessage }}</h2>
    
    <custom-button class="custom-btn" :hidden="isAttackHidden" @click="handleAttack" type="button" title="ATTACK" />
    <custom-button class="custom-btn" :disabled="isSpecialAttackHidden"  @click="handleSpecialAttack" title="SPECIAL ATTACK" type="button"/>
    <custom-button class="custom-btn" :hidden="isHealthHidden" @click="handleHeal" title="HEAL" type="button"/>
    <custom-button class="custom-btn" :hidden="isSurrenderHidden" @click="handleSurrender" title="SURRENDER" type="button"/>
    <custom-button class="custom-btn" :hidden="isRestartHidden" @click="handleRestart" title="RESTART" type="submit"></custom-button>

  </section>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import CustomButton from './customComponets/CustomButton.vue';
import {usePlayersStore} from '@/store/PlayersStore' 

const props = defineProps({
  messages: {
    type: Array
  },
})


const emit = defineEmits(['handleAttack', 'handleHeal','handleSpecialAttack', 'handleRestart'])
const store = usePlayersStore()


const playerPower = ref<number>(100)
const monsterPower = ref<number>(100)
const resultMessage = ref<string>('')
const isGameOver = ref<boolean>(false)

const isAttackHidden = ref<boolean>(false)
const isHealthHidden = ref<boolean>(false)
const isSpecialAttackHidden = ref<boolean>(false)
const isSurrenderHidden = ref<boolean>(false)
const isRestartHidden = ref<boolean>(false)

const damage = ref(0)
const attack = ref(false)

const hideButtons = () => {
  isAttackHidden.value = true
  isSpecialAttackHidden.value = true
  isHealthHidden.value = true
  isSurrenderHidden.value = true
}



const damageValue = () => {
  return Math.trunc(Math.random() * (11 - 5) + 5)
}


const increasePlayerPower = (increaseValue: number) => {
  playerPower.value += increaseValue
}

const decreasePlayerPower = (decreaseValue: number) => {
  playerPower.value -= decreaseValue
}

const decreaseMonsterPower = (decreaseValue: number) => {
  monsterPower.value -= decreaseValue
}

let round = 0 
let specialAttackround = 0

const handleAttack = () => {
round ++
attack.value = true

if(specialAttackround >= round ) {
  isSpecialAttackHidden.value = true
}
else {
  isSpecialAttackHidden.value = false
}

//Difficulty
if(store.getDifficulty == 'medium') {
  damage.value = damageValue() + 2
}else if(store.getDifficulty == 'hard') {
  damage.value = damageValue() + 4
}else {
  damage.value = damageValue()
}


decreasePlayerPower(damage.value)
props.messages!.push(`Monster hits you with ${damage.value}!`)
damage.value = damageValue()
decreaseMonsterPower(damage.value)
props.messages!.push(`You hit the monster with ${damage.value}!`)


//Results
  if (playerPower.value < 0 && monsterPower.value < 0) {
    playerPower.value  = 0
    monsterPower.value  = 0
    resultMessage.value ='Draw!'
    hideButtons()
    store.addToHistory({name: store.getUserName, result: resultMessage.value, difficulty: store.getDifficulty})
  }else if (playerPower.value <= 0) {
    playerPower.value  = 0
    resultMessage.value = 'Monster win!'
    hideButtons()
    store.addToHistory({name: store.getUserName, result: resultMessage.value, difficulty: store.getDifficulty})
  } else if (monsterPower.value <= 0) {
    monsterPower.value  = 0
    resultMessage.value ='You win!'
    hideButtons()
    store.addToHistory({name: store.getUserName, result: resultMessage.value, difficulty: store.getDifficulty})
  }
 emit('handleAttack', [playerPower.value, monsterPower.value, attack.value])
}




const handleSpecialAttack = () => {
  specialAttackround = round + 3
  let monsterCounter = 2

  while (monsterCounter >= 0) {
    damage.value = damageValue()
    decreaseMonsterPower(damage.value)
    monsterCounter--
  }
  isSpecialAttackHidden.value = true
  props.messages!.push(`You used special(triple) attack with ${damage.value}!`)
  isSpecialAttackHidden.value = true
  emit('handleSpecialAttack', monsterPower.value)
  
  
}



const handleHeal = () => {
  damage.value = damageValue()
  increasePlayerPower(damage.value)

  props.messages!.push(`You heal yourself with ${damage.value}!`)
  if (playerPower.value > 100) {
    playerPower.value = 100
  }
  isHealthHidden.value = true

  emit('handleHeal', playerPower.value)
}


const handleSurrender = () => {
  resultMessage.value =('Game Over!')
  props.messages!.push('You surrendered! :(')
  hideButtons()
  isGameOver.value = true
  store.addToHistory({name: store.getUserName, result: 'Surrendered!'})
}

const handleRestart = () => {
  isAttackHidden.value = false
  isSpecialAttackHidden.value = false
  isHealthHidden.value = false
  isSurrenderHidden.value = false
  resultMessage.value = ''
  playerPower.value = 100
  monsterPower.value = 100
  isGameOver.value = false
 emit('handleRestart', playerPower.value, monsterPower.value)
}
</script>
<style scoped>

.result{
  color: green;
  padding: 0 2px;
  margin: 5rem 0;
  border-radius: 2%;
  text-align: center;
}

.custom-btn {
  margin-right: 1rem  !important;
}


#controls {
  text-align: center;
}
</style>
