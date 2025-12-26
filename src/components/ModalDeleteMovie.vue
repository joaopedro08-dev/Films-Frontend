<script setup lang="ts">
import { watch } from 'vue';

const props = defineProps<{
    isOpen: boolean;
    movieName: string;
    loading: boolean;
}>();

const emit = defineEmits(['close', 'confirm']);

watch(() => props.isOpen, (val) => {
    document.body.style.overflow = val ? 'hidden' : 'auto';
});
</script>

<template>
    <Transition name="fade-pop">
        <div v-if="isOpen" class="confirm-overlay" @click.self="emit('close')">
            <div class="confirm-content">
                <div class="icon-warning">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                </div>
                
                <h3>Remover Filme</h3>
                <p>Você tem certeza que deseja excluir <strong>{{ movieName }}</strong>?</p>
                <p class="warning-subtext">Esta ação não pode ser desfeita.</p>

                <div class="confirm-actions">
                    <button class="btn-cancel" @click="emit('close')" :disabled="loading">
                        Cancelar
                    </button>
                    <button class="btn-delete-confirm" @click="emit('confirm')" :disabled="loading">
                        <span v-if="loading">Excluindo...</span>
                        <span v-else>Sim, remover</span>
                    </button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.confirm-overlay {
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    background: rgba(0, 0, 0, 0.85);
    display: flex; justify-content: center; align-items: center;
    z-index: 11000; 
}

.confirm-content {
    background: #1f1f1f;
    padding: 2rem;
    border-radius: 12px;
    width: 90%;
    max-width: 500px;
    text-align: center;
    color: white;
    border: 1px solid #333;
}

.icon-warning {
    font-size: 3rem;
    color: #e50914;
    margin-bottom: 1rem;
}

h3 { margin-bottom: 10px; font-size: 1.5rem; }

p { color: #ccc; margin-bottom: 5px; }

.warning-subtext {
    font-size: 0.85rem;
    color: #888;
    margin-bottom: 1.5rem;
}

.confirm-actions {
    display: flex;
    gap: 15px;
    justify-content: center;
}

button {
    padding: 10px 20px;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.2s;
}

.btn-cancel { background: #444; color: white; }
.btn-cancel:hover { background: #555; }

.btn-delete-confirm { background: #e50914; color: white; }
.btn-delete-confirm:hover { background: #b20710; }

button:disabled { opacity: 0.5; cursor: not-allowed; }
</style>