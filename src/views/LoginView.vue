<template>
  <div class="mx-auto col-10 col-md-8 col-lg-6 text-center">
    <form class="shadow p-3 mb-5 bg-light rounded" v-if="!isFormHidden">
      <custom-input
        class="mb-2"
        @changeValue="handleFormValue"
        label="Username:"
        description="username"
      />

      <div class="col-4 m-auto">
        <select
          @change="handleDifficultyOptions"
          v-model="selectedDifficulty"
          class="form-select"
          aria-label="Default select example"
        >
          <option :value="null" selected disabled>Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
     
      <div>
        <p class="text-danger" v-for="error in v$.userName.$errors" :key="error.$uid">
          {{ error.$message }}
        </p>
      </div>
    </form>

    <!-- SWIPER -->
    <custom-button class="mb-2" @click="slideToIndex()" title="Choose a hero" type="button"/>
    <Swiper @swiper="onSwiper" v-model="swiperInstance">
    <SwiperSlide  v-for="(url, i) in images" :key="i">
      <img
            class="d-block m-auto"
            style="width: 200px; height: auto;"
            :src="url"
            alt="First slide"
          />
    </SwiperSlide>
  </Swiper>
 
  <div> 
      <custom-button class="" @click="toggleForm" type="button">

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-arrow-90deg-right"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M14.854 4.854a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 4H3.5A2.5 2.5 0 0 0 1 6.5v8a.5.5 0 0 0 1 0v-8A1.5 1.5 0 0 1 3.5 5h9.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4z"
          />
        </svg>
        Start to play
      </custom-button>
  </div>

  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, minLength, helpers } from '@vuelidate/validators'
import { usePlayersStore } from '@/store/PlayersStore'
import { useRouter } from 'vue-router'

import CustomInput from '@/components/customComponets/CustomInput.vue'
import CustomButton from '@/components/customComponets/CustomButton.vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules';

// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
const swiperInstance = ref()

function onSwiper(swiper) {
  swiperInstance.value = swiper
  console.log(swiperInstance.value);
  
}

const images = ref([
  "https://www.freepnglogos.com/uploads/halo-png/transparent-jorge-halo-nation-character-22.png",
  "https://www.freepnglogos.com/uploads/mortal-kombat-png/image-reptile-the-mortal-kombat-wiki-28.png",
])

const firstImage = ref(0)

const changeIndex = <T>(list: T[], value: number) => {
  const length = list.length
  const nexyActionIndex = (value + 1) % length;
  console.log(nexyActionIndex);
  return nexyActionIndex
};

const slideToIndex = () =>{
  firstImage.value = changeIndex(images.value, firstImage.value)
  swiperInstance.value.slideTo(firstImage.value)
  }


const store = usePlayersStore()
const router = useRouter()

const isFormHidden = ref(false)
const selectedDifficulty = ref<string | null>(null)



const handleDifficultyOptions = () => {
  store.setDifficulty(selectedDifficulty.value)
}


const rules = computed(() => {
  const rule = {
    minLength: helpers.withMessage('User name should be at least 2 characters long!', minLength(2))
    // required: helpers.withMessage('Username is required', required)
  }

  return {
    userName: rule
  }
})

const v$ = useVuelidate(rules, { userName: store.getUserName })

const handleFormValue = (inputValue: string) => {
  store.setUserName(inputValue)
}

const toggleForm = async () => {
  const result = await v$.value.$validate()

  if (!result) {
    store.setUserName('')
    return
  }
  isFormHidden.value = !isFormHidden.value
  store.setHero(images.value[firstImage.value])
  console.log(store.getHero);
  
  router.push({ path: '/home' })
}
</script>
