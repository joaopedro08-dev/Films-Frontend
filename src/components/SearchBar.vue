<script setup lang="ts">
defineProps<{
  modelValue: string
}>();

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div class="search-container">
    <i class="fa-solid fa-magnifying-glass search-icon"></i>
    <input type="text" :value="modelValue" @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      placeholder="Títulos, diretores, gêneros..." class="search-input" />
    <button v-if="modelValue" class="clear-btn" @click="emit('update:modelValue', '')">
      &times;
    </button>
  </div>
</template>

<style scoped>
.search-container {
  position: relative;
  display: flex;
  align-items: center;
  max-width: 400px;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 12px;
  color: #888;
  font-size: 0.9rem;
}

.search-input {
  width: 100%;
  background: var(--netflix-black);
  border: 1px solid var(--netflix-grey);
  color: var(--netflix-white);
  padding: 10px 35px 10px 35px;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--netflix-white);
  background: var(--netflix-black);
  box-shadow: 0 0 5px #ffffff33;
}

.clear-btn {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  color: #888;
  font-size: 1.5rem;
  cursor: pointer;
  line-height: 1;
}

.clear-btn:hover {
  color: var(--netflix-white);
}
</style>