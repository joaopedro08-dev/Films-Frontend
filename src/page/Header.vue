<script setup lang="ts">
import { ref } from 'vue';
import ModalAddMovie from '../components/ModalAddMovie.vue';

const isModalAddOpen = ref(false);

const openAddModal = () => {
    isModalAddOpen.value = true;
};

const closeAddModal = () => {
    isModalAddOpen.value = false;
};
</script>

<template>
    <header class="header">
        <a class="logo" href="/">
            <h1 class="netflix-text">Catálogo de Filmes</h1>
        </a>

        <button class="btn-add" type="button" @click="openAddModal">
            Adicionar <i class="fa-solid fa-plus"></i>
        </button>
    </header>

    <ModalAddMovie 
      :isOpen="isModalAddOpen" 
      @close="closeAddModal" 
    />
</template>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, transparent 100%);
    width: 100%;
}

.netflix-text {
    color: var(--netflix-red);
    font-size: 1.8rem;
    letter-spacing: -1px;
}

.btn-add {
    background-color: var(--netflix-red);
    color: var(--netflix-white);
    text-align: center;
    padding: 10px 18px;
    border-radius: 12px;
    cursor: pointer;
}
</style>