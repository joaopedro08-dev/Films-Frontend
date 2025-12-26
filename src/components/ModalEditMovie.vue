<script setup lang="ts">
import { ref, watch } from 'vue';
import updateMovie from '../service/updateMovie';
import { useValidations } from '../validation/validations';

const props = defineProps<{
    isOpen: boolean,
    movie: any
}>();

const emit = defineEmits(['close', 'updated', 'openDelete']);

const handleDeleteClick = () => {
    emit('openDelete'); 
};

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

watch(() => props.isOpen, (val) => {
    if (val && props.movie) {
        formData.value = {
            ...props.movie,
            gender: Array.isArray(props.movie.gender) ? props.movie.gender.join(', ') : props.movie.gender
        };
    }
});

const handleSubmit = async () => {
    if (!validateFields(formData.value)) return;

    try {
        const payload = {
            ...formData.value,
            gender: typeof formData.value.gender === 'string'
                ? formData.value.gender.split(',').map(g => g.trim())
                : formData.value.gender
        };

        const id = props.movie._id || props.movie.id;
        await updateMovie(id, payload);

        alert("Filme atualizado com sucesso!");
        emit('updated');
        emit('close');
    } catch (err) {
        errorMessage.value = "Falha ao atualizar no servidor.";
    }
};
</script>

<template>
    <Transition name="fade-pop">
        <div v-if="isOpen" class="modal-overlay" @click.self="emit('close')">
            <div class="modal-content">
                <header class="modal-header">
                    <h2>Editar Filme</h2>
                    <button class="close-x" @click="emit('close')">&times;</button>
                </header>

                <p v-if="errorMessage" class="global-error">{{ errorMessage }}</p>

                <form @submit.prevent="handleSubmit" class="add-form">
                    <div class="input-group">
                        <label>Nome do Filme</label>
                        <input v-model="formData.name" type="text" required>
                    </div>

                    <div class="input-row">
                        <div class="input-group">
                            <label>URL da Imagem</label>
                            <input v-model="formData.img" type="text" required>
                        </div>
                        <div class="input-group">
                            <label>Ano</label>
                            <input v-model="formData.year" type="text" required>
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

                    <div class="actions-row">
                        <button type="button" class="btn-delete" @click="handleDeleteClick">
                            <i class="fa-solid fa-trash"></i> Excluir Filme
                        </button>
                        <button type="submit" class="btn-save">Salvar Alterações</button>
                    </div>
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
    margin-bottom: 1.5rem;
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

.actions-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    gap: 10px;
}

.btn-delete {
    background: transparent;
    color: #ff4d4d;
    border: 1px solid #ff4d4d;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: 0.3s;
}

.btn-delete:hover {
    background: #ff4d4d;
    color: white;
}

.btn-save {
    flex: 1; 
    background: #e50914;
    color: white;
    border: none;
    padding: 12px;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
}

@media screen and (max-width: 768px) {
    .input-row {
        flex-direction: column;
    }
}
</style>