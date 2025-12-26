<script setup lang="ts">
import { watch } from 'vue';

const props = defineProps<{
    movie: any | null;
    isOpen: boolean;
    loading: boolean;
}>();

watch(() => props.isOpen, (value) => {
  if (value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
});
const emit = defineEmits(['close']);
</script>

<template>
    <Transition name="fade-pop">
        <div v-if="isOpen" class="modal-overlay" @click.self="emit('close')">
            <div class="modal-content animate-pop">
                <button class="close-btn" @click="emit('close')">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div v-if="loading" class="status-container">
                    <p>Carregando dados da API...</p>
                </div>

                <div v-else-if="movie" class="data-display">
                    <div class="header-section">
                        <img :src="movie.img" :alt="movie.name" class="movie-banner" />
                        <div class="title-block">
                            <h1>{{ movie.name }}</h1>
                            <div class="quick-meta">
                                <span>Ano: {{ movie.year }}</span>
                                <span>Avaliação: ⭐ {{ movie.notes }}/10</span>
                            </div>
                            <section class="description-section">
                                <h3>Descrição do Filme</h3>
                                <p>{{ movie.description }}</p>
                            </section>
                        </div>
                    </div>

                    <div class="details-body">
                        <aside class="technical-info">
                            <h3>Informações Técnicas</h3>
                            <ul>
                                <li><strong>Diretor:</strong> {{ movie.director }}</li>
                                <li><strong>Gêneros:</strong> {{ movie.gender?.join(', ') }}</li>
                            </ul>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>

.header-section {
    display: flex;
    gap: 30px;
}

.movie-banner {
    width: 200px;
    height: 300px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
}

.title-block h1 {
    font-size: 2.5rem;
    margin-bottom: 15px;
}

.quick-meta {
    display: flex;
    gap: 20px;
    font-size: 1.1rem;
    color: #46d369;
}

.details-body {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 50px;
    margin-top: 0.8rem;
}

.description-section h3,
.technical-info h3 {
    border-bottom: 1px solid #333;
    padding-bottom: 10px;
    margin-bottom: 15px;
    color: #888;
}

.description-section p {
    line-height: 1.8;
    font-size: 1.1rem;
}

.description-section {
    margin-top: 0.4rem;
}

.technical-info ul {
    list-style: none;
    padding: 0;
}

.technical-info li {
    margin-bottom: 12px;
    font-size: 0.95rem;
}

.technical-info li strong {
    color: #fff;
}

.close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: white;
    padding: 8px;
    border-radius: 50%;
    cursor: pointer;
    z-index: 10;
    transition: background 0.2s;
}

.close-btn:hover {
    background: rgba(255, 255, 255, 0.2);
}

.status-container {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
}

.animate-pop {
    animation: pop 0.3s ease-out;
}

@keyframes pop {
    from {
        transform: scale(0.95);
        opacity: 0;
    }

    to {
        transform: scale(1);
        opacity: 1;
    }
}

@media (max-width: 768px) {
    .header-section {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .details-body {
        grid-template-columns: 1fr;
    }

    .quick-meta{
        justify-content: center;
    }

    .close-btn{
        top: 10px;
        right: 10px;
    }
}
</style>