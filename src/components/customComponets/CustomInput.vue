
    <template>
        <div class="form-group mx-auto col-8 col-md-6 col-lg-4"> 
        <label class="form-label" :for='description'>{{label}}</label>
        <input @change="changeValue" class="form-control" 
        :name="description" type='text'
        :alt="description" 
        :placeholder='"Enter " + description'
        v-model="value"
        />
        </div>
    </template>
  
<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')

const emit = defineEmits(['changeValue'])

const changeValue = () => {
  emit('changeValue', value.value)
}

defineProps({
  label: {
    type: String,
    default: ''
  },
  description: {
    type: String
  },
})

</script>
