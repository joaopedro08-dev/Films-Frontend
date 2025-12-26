<script setup lang="ts">
import { ref, watch } from 'vue';
import postMovie from '../service/postMovie';
import { useValidations } from '../validation/validations';

const props = defineProps<{ isOpen: boolean }>();

watch(() => props.isOpen, (value) => {
  if (value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
});

const emit = defineEmits(['close']);

const formData = ref({
    name: '',
    img: '',
    year: '',
    notes: 0,
    description: '',
    director: '',
    gender: ''
});

const { errorMessage, validateFields } = useValidations();

const handleSubmit = async () => {
    if (!validateFields(formData.value)) {
        return;
    }

    try {
        const payload = {
            ...formData.value,
            gender: formData.value.gender.split(',').map(g => g.trim())
        };

        await postMovie(payload);

        alert("Filme salvo com sucesso!");
        emit('close');
        window.location.reload();
    } catch (err) {
        errorMessage.value = "Falha ao salvar no servidor. Verifique a API.";
    }
};
</script>

<template>
    <Transition name="fade-pop">
        <div v-if="isOpen" class="modal-overlay" @click.self="emit('close')">
            <div class="modal-content">
                <header class="modal-header">
                    <h2>Cadastrar Novo Filme</h2>
                    <button class="close-x" @click="emit('close')">&times;</button>
                </header>

                <p v-if="errorMessage" class="global-error">{{ errorMessage }}</p>

                <form @submit.prevent="handleSubmit" class="add-form">
                    <div class="input-group">
                        <label>Nome do Filme</label>
                        <input v-model="formData.name" type="text" placeholder="Ex: Jurassic Park" required>
                    </div>

                    <div class="input-row">
                        <div class="input-group">
                            <label>URL da Imagem</label>
                            <input v-model="formData.img" type="text" placeholder="https://..." required>
                        </div>
                        <div class="input-group">
                            <label>Ano</label>
                            <input v-model="formData.year" type="text" placeholder="1993" required>
                        </div>
                    </div>

                    <div class="input-row">
                        <div class="input-group">
                            <label>Nota (0-10)</label>
                            <input v-model="formData.notes" type="number" step="0.1" min="0" max="10" required>
                        </div>
                        <div class="input-group">
                            <label>Diretor</label>
                            <input v-model="formData.director" type="text" required>
                        </div>
                    </div>

                    <div class="input-group">
                        <label>Gêneros</label>
                        <input v-model="formData.gender" type="text" placeholder="Ex: Ação, Terror, Drama">
                        <small class="helper-text">Separe múltiplos gêneros por vírgula</small>
                    </div>

                    <div class="input-group">
                        <label>Descrição</label>
                        <textarea v-model="formData.description" rows="4"></textarea>
                    </div>

                    <button type="submit" class="btn-save">Salvar Filme</button>
                </form>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    border-bottom: 1px solid #333;
    padding-bottom: 10px;
}

.add-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.input-row {
    display: flex;
    flex-direction: row;
    gap: 15px;
    width: 100%;
}

.input-row .input-group {
    flex: 1;
}

.input-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.input-group label {
    font-size: 0.9rem;
    color: #888;
}

.btn-save {
    background: var(--netflix-red);
    color: white;
    border: none;
    padding: 12px;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 10px;
}

@media screen and (max-width: 768px) {
    .input-row {
        flex-direction: column;
    }
}
</style>